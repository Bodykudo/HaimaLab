import { PAGE_SIZE } from '../utils/constants';
import supabase, { supabaseUrl } from './supabase';

export async function getDevices({ filter, sortBy, page }) {
  let query = supabase.from('devices').select('*', { count: 'exact' });

  if (filter) query = query[filter.method || 'eq'](filter.field, filter.value);

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error('Devices could not be loaded.');
  }

  return { data, count };
}

export async function getAllDevices() {
  const { data, error } = await supabase.from('devices').select('*');

  if (error) {
    console.log(error);
    throw new Error('Devices could not be loaded.');
  }

  return data;
}

export async function createEditDevice(newDevice, id) {
  const hasImagePath = newDevice.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newDevice.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newDevice.image
    : `${supabaseUrl}/storage/v1/object/public/device-images/${imageName}`;

  // 1. Create/edit Device
  let query = supabase.from('devices');

  // CREATE
  if (!id) {
    query = query.insert([{ ...newDevice, image: imagePath }]);
  }

  // EDIT
  if (id) {
    query = query.update({ ...newDevice, image: imagePath }).eq('id', id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error(
      `${
        !id ? 'New device could not be created.' : 'Device could not be edited.'
      }`
    );
  }

  // 2. Upload Image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('device-images')
    .upload(imageName, newDevice.image);

  // 3. Delete the device if there was an error uploading the image
  if (storageError) {
    await supabase.from('devices').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error(
      `Device image could not be uploaded, and the device was not ${
        !id ? 'created' : 'edited'
      }.`
    );
  }

  return data;
}

export async function deleteDevice(id) {
  const { data, error } = await supabase.from('devices').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('Device could not be deleted.');
  }

  return data;
}
