import { createClient } from "@supabase/supabase-js";

const bucket = "main-bucket";
export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);
export const uploadImage = async (image: File) => {
  const timeStamp = Date.now();
  const newName = `${timeStamp}-${image.name}`;
  const { data } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: "3600" });
  if (!data) throw new Error("image upload failed");
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
export const deleteImage = (url:string)=>{
    const imageName = url.split("/").pop()
    if(!imageName) throw new Error("Invalid url")
    return supabase.storage.from(bucket).remove([imageName])
}