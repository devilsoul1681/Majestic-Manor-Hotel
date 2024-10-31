import supabase, { supabaseUrl } from "./superbase";

export async function getCabin() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error("Not available to fetch cabins");
  return cabins;
}

export async function deleteCabinApi(cabinId) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", cabinId);
  if (error) throw new Error("cabin can't be deleted");
  return data;
}

export async function createCabin(cabinData) {
  const hasImage = cabinData.image.startsWith?.(supabaseUrl);
  // 1.  Create Cabin
  const imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //https://rmrtpisltzpdkxlhylmm.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabinData, image: hasImage ? cabinData.image : imagePath }])
    .select();
  if (error) throw new Error("Cabin can't be created");

  // 2.Upload image to bucket
  if (!hasImage) {
    const { error: imageUploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabinData.image);

    if (imageUploadError) {
      await supabase.from("cabins").delete().eq("id", cabinData.id);
      console.log(imageUploadError);
      throw new Error("Cabin can't be created");
    }
  }

  return data;
}

export async function updateCabin(updatedData, id) {
  console.log(updatedData, id);
  const hasImagePath = updatedData?.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${updatedData.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? updateCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...updatedData, image: imagePath })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error("Cabin can't be updated");

  if (!hasImagePath) {
    const { error: imageUploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, updatedData.image);

    if (imageUploadError) {
      await supabase.from("cabins").delete().eq("id", id);
      console.log(imageUploadError);
      throw new Error("Cabin can't be created");
    }
  }

  return data;
}
