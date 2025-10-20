"use server";
import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { imageSchema, productSchema, validateWithZodSchema } from './schema';
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";


const getAuthUser=async ()=>{
    const user = await currentUser()
    if(!user) redirect("/")
    return user
}

const getAdminUser = async()=>{
    const user = await getAuthUser()
    if(user.id !== process.env.ADMIN_USER_ID) redirect("/")
    return user
}

function renderError(error:unknown):{message:string}{
    console.log(error);
    return {message: error instanceof Error ? error.message: "an error occurred"}
    
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
    const user = await getAuthUser()
    try {
        const rawData = Object.fromEntries(formData)
        const file = formData.get("image")
        const validatedFields = validateWithZodSchema(productSchema, rawData)
        const validatedField = validateWithZodSchema(imageSchema, {image:file}) 
        const fullPath = await uploadImage(validatedField.image)

        await db.product.create({
            data: {
                ...validatedFields,
                image: fullPath,
                clerkId: user.id
            },
        })
    } catch (error) {
        return renderError(error)
    }
    redirect("/admin/products")
};

export const fetchAdminProducts = async()=>{
    await getAdminUser()
    const products = await db.product.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
    return products
}

export const deleteProductAction = async (prevState:{productId:string})=>{
    const {productId} = prevState
    await getAuthUser()
    try {
        const product = await db.product.delete({
            where: {
                id: productId
            }
        })
        deleteImage(product.image)
        revalidatePath("/admin/products")
        return {message: "product deleted"}
    } catch (error) {
        return renderError(error)
    }
}

export const fetchAdminProductDetail = async (productId:string)=>{
    const product = await db.product.findUnique({
        where: {
            id: productId
        }
    })
    if(!product) redirect("/admin/products")
    return product
}

export const updateProductAction = async (prevState:any, formData: FormData)=>{
    await getAdminUser()
    try {
      const productId = formData.get('id') as string
      const rawData = Object.fromEntries(formData)
      const validatedFields = validateWithZodSchema(productSchema, rawData)
      await db.product.update({
        where: {
          id: productId
        },
        data: {
          ...validatedFields
        }
      })
      revalidatePath(`/admin/products/${productId}/edit`)
      return {message: 'product updated'}
    } catch (error) {
      return renderError(error)
    }
}

export const updateProductImageAction = async (prevState:any, formData: FormData)=>{
    await getAuthUser()
    try {
      const image =formData.get("image") as File
      const productId = formData.get("id") as string
      const oldImageUrl = formData.get("url") as string
      const validatedField = validateWithZodSchema(imageSchema, {image})
      const fullPath = await uploadImage(validatedField.image)
      await deleteImage(oldImageUrl)
      await db.product.update({
        where: {
          id: productId
        },
        data: {
          image: fullPath
        }
      })
      revalidatePath(`/admin/products/${productId}/edit`)
      return  {message: "product image updated successfully"}
    } catch (error) {
      return renderError(error)
    }
}

export const fetchFavoriteId = async({productId}:{productId:string})=>{
  const user = await getAuthUser()
  const favorite = await db.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id
    },
    select: {
      id: true
    }
  })
  return favorite?.id || null
}

export const toggleFavoriteAction = async(prevState:{
  productId:string,
  favoriteId: string | null, 
  pathName: string
})=>{
  const user = await getAuthUser()
  const {productId, favoriteId, pathName}= prevState
  try {
    if(favoriteId){
      await db.favorite.delete({
        where: {
          id: favoriteId
        }
      })
    }else{
      await db.favorite.create({
        data: {
          productId,
          clerkId: user.id
        }
      })
    }
    revalidatePath(pathName)
    return {message: favoriteId?"removed from faves":"added to faves"}
  } catch (error) {
    return renderError(error)
  }
}

export const fetchUserFavorites = async ()=>{
  const user = await getAuthUser()
  const favorites = await db.favorite.findMany({
    where: {
      clerkId: user.id 
    },
    include: {
      product: true
    }
  })
  return favorites
}