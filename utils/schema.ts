import {z} from "zod"
import { ZodSchema } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters.',
    })
    .max(100, {
      message: 'name must be less than 100 characters.',
    }),
  company: z.string(),
  featured: z.coerce.boolean(),
  price: z.coerce.number().int().min(0, {
    message: 'price must be a positive number.',
  }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(' ').length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: 'description must be between 10 and 1000 words.',
    }
  ),
});

export function validateWithZodSchema<T>(schema:ZodSchema<T>, data:unknown):T{
    const result = schema.safeParse(data)
    if(!result.success){
        const errors = result.error.issues.map((error)=>error.message)
        throw new Error(errors.join(", "))
       }
    return result.data;
}

export const imageSchema = z.object({
    image: validatedImage()
})

function validatedImage(){
    const maxUpload = 1024*1024
    const acceptedFileTypes = ["image/"]
    return z.instanceof(File).refine((file)=>{
        return !file || file.size <= maxUpload
    }, "file size must be less than or equal to 1MB")
    .refine((file)=>{
        return !file || acceptedFileTypes.some((type)=>file.type.startsWith(type))
    }, "file must be an image")
}