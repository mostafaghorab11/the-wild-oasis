import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data: cabins, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return cabins;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }
}

export async function createAndEditCabin(newCabin, id) {
  // check if cabin has image path
  let hasImagePath;
  if (typeof newCabin.image === 'string') {
    hasImagePath = newCabin.image.startsWith(supabaseUrl);
  } else {
    hasImagePath = false;
  }

  // create a image name
  const imageName = `${Date.now()}-${newCabin.image.name}`.replaceAll('/', '');
  const imagePath = hasImagePath
    ? `${newCabin.image}`
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // create the cabin
  let query = supabase.from('cabins');

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  }

  const { data, error } = await query.select().single();

  // if there is an error creating the cabin
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  // if there is image path, don't upload the image to supabase storage again
  if (hasImagePath) return data;

  // upload image to supabase storage
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // delete the cabin if there was an error uploading the image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created'
    );
  }
  return data;
}
