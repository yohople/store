"use server";
import db from "@/utils/db";
import { currentUser, auth, getAuth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  imageSchema,
  productSchema,
  reviewSchema,
  validateWithZodSchema,
} from "./schema";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";
import { Cart } from "@prisma/client";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
};

const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");
  return user;
};

function renderError(error: unknown): { message: string } {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "an error occurred",
  };
}

export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
};

export const fetchAllProducts = async ({ search = "" }: { search: string }) => {
  const products = await db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};

export const fetchSingleProduct = async (productId: string) => {
  const products = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!products) redirect("/products");
  return products;
};

export const createProduct = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image");
    const validatedFields = validateWithZodSchema(productSchema, rawData);
    const validatedField = validateWithZodSchema(imageSchema, { image: file });
    const fullPath = await uploadImage(validatedField.image);

    await db.product.create({
      data: {
        ...validatedFields,
        image: fullPath,
        clerkId: user.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin/products");
};

export const fetchAdminProducts = async () => {
  await getAdminUser();
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};

export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState;
  await getAuthUser();
  try {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
    });
    deleteImage(product.image);
    revalidatePath("/admin/products");
    return { message: "product deleted" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAdminProductDetail = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) redirect("/admin/products");
  return product;
};

export const updateProductAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAdminUser();
  try {
    const productId = formData.get("id") as string;
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(productSchema, rawData);
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ...validatedFields,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "product updated" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProductImageAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAuthUser();
  try {
    const image = formData.get("image") as File;
    const productId = formData.get("id") as string;
    const oldImageUrl = formData.get("url") as string;
    const validatedField = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedField.image);
    await deleteImage(oldImageUrl);
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        image: fullPath,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "product image updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  productId: string;
  favoriteId: string | null;
  pathName: string;
}) => {
  const user = await getAuthUser();
  const { productId, favoriteId, pathName } = prevState;
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      });
    }
    revalidatePath(pathName);
    return { message: favoriteId ? "removed from faves" : "added to faves" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchUserFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });
  return favorites;
};

export const createReviewAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(reviewSchema, rawData);
    await db.review.create({
      data: {
        ...validatedFields,
        clerkId: user.id,
      },
    });
    revalidatePath(`/products/${validatedFields.productId}`);
    return { message: "review created successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchProductReviews = async ({
  productId,
}: {
  productId: string;
}) => {
  const reviews = await db.review.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews;
};

export const fetchProductReviewsByUser = async () => {
  const user = await getAuthUser();
  const reviews = await db.review.findMany({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      product: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
  return reviews;
};

export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState;
  const user = await getAuthUser();
  try {
    await db.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id,
      },
    });
    revalidatePath("/reviews");
    return { message: "review deleted successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const findExistingReview = async ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) => {
  return await db.review.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  });
};

export const fetchProductRating = async ({
  productId,
}: {
  productId: string;
}) => {
  const result = await db.review.groupBy({
    by: ["productId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      productId,
    },
  });
  return {
    rating: result?.[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result?.[0]?._count.rating ?? 0,
  };
};

export const fetchCartItems = async () => {
  const { userId } = auth();
  const cart = await db.cart.findFirst({
    where: {
      clerkId: userId ?? "",
    },
  });
  return cart?.numItemsInCart || 0;
};

const fetchProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) throw new Error("product not found");
  return product;
};

const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
};

export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: includeProductClause,
  });
  if (!cart && errorOnFailure) {
    throw new Error("cart not found");
  }
  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: userId,
      },
      include: includeProductClause,
    });
  }
  return cart;
};

const updateOrCreateCartItem = async ({
  productId,
  amount,
  cartId,
}: {
  productId: string;
  amount: number;
  cartId: string;
}) => {
  const cartItem = await db.cartItem.findFirst({
    where: {
      productId,
      cartId
    }
  })
  if(cartItem){
    await db.cartItem.update({
      where: {
        id: cartItem.id
      },
      data: {
        amount: cartItem.amount + amount
      }
    })
  }else{
    await db.cartItem.create({
      data: {
        amount, 
        cartId,
        productId
      }
    })
  }
};

export const updateCart = async (cart:Cart) => {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id
    },
    include: {
      product: true
    },
    orderBy: {
      createdAt: "asc"
    }
  })
  let numItemsInCart = 0
  let cartTotal = 0
  for(const item of cartItems){
    numItemsInCart += item.amount
    cartTotal += item.product.price * item.amount
  }
  const tax = cart.taxRate * cartTotal
  const shipping = cartTotal? cart.shipping:0
  const orderTotal = tax+shipping+cartTotal

  const currentCart = await db.cart.update({
    where: {
      id: cart.id
    },
    data: {
      numItemsInCart, cartTotal, tax, orderTotal
    },
    include: includeProductClause
  })
  return {currentCart, cartItems}

};

export const addToCartAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser()
  try {
    const productId = formData.get("productId") as string
    const amount = Number(formData.get("amount"))
    await fetchProduct(productId)
    const cart = await fetchOrCreateCart({userId: user.id})
    await updateOrCreateCartItem({productId, amount, cartId:cart.id})
    await updateCart(cart)
  } catch (error) {
    return renderError(error)
  }
  redirect("/cart")
};

export const removeCartItemAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await getAuthUser()
    const cartItemId = formData.get("id") as string
    const cart = await fetchOrCreateCart({userId:user.id, errorOnFailure:true})
    await db.cartItem.delete({
      where: {
        cartId: cart.id,
        id: cartItemId
      }
    })
    await updateCart(cart)
    revalidatePath("/cart")
    return { message: 'Item removed from cart' };
  } catch (error) {
    return renderError(error)
  }
};

export const updateCartItemAction = async ({amount, cartItemId}:{amount:number,cartItemId:string}) => {
  const user = await getAuthUser()
  try {
    const cart = await fetchOrCreateCart({userId: user.id})
    await db.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id
      },
      data: {
        amount
      }
    })
    await updateCart(cart)
    revalidatePath("/cart")
    return  {message: "cart updated successfully"}
  } catch (error) {
    return renderError(error)
  }
};

export const createOrderAction = async (prevState:any, formData:FormData)=> {
  const user = await getAuthUser()
  try {
    const cart = await fetchOrCreateCart({userId: user.id, errorOnFailure:true})
    const order = await db.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user.emailAddresses[0].emailAddress,
        isPaid: true
      }
    })
    await db.cart.delete({
      where: {
        id: cart.id
      }
    })
  } catch (error) {
    return renderError(error)
  }
  redirect("/orders")
}

export const fetchUserOrders = async()=>{
  const user = await getAuthUser()
  const orders = await db.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  return orders
}

export const fetchAdminOrders =async()=>{
  const user = await getAdminUser()
  const orders = await db.order.findMany({
    where: {
      isPaid: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  return orders
}

