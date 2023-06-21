import { PAGE_SIZE } from '../utils/constants';
import supabase, { supabaseUrl } from './supabase';
// import supabase from './supabase';

export async function getUsers({ filter, sortBy, page, userRole }) {
  let query = supabase.from('users').select('*', { count: 'exact' });

  query = query.eq('userRole', userRole);
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

  if (error) throw new Error('Users could not be loaded.');

  return { data, page, count };
}

export async function getAllUsers() {
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    console.log(error);
    throw new Error('Users could not be loaded.');
  }

  return data;
}

export async function getUserByUserId(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('userId', userId)
    .single();

  if (error) throw new Error('User could not be loaded');

  return data;
}

export async function getUserById(id) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error('User not found');
  }

  return data;
}

export async function createEditUser(newUser, id) {
  const hasImagePath = newUser.avatar?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newUser.avatar.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newUser.avatar
    : `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`;

  // 1. Create/edit user
  let query = supabase.from('users');

  // CREATE
  if (!id) {
    query = query.insert([{ ...newUser, avatar: imagePath }]);
    // query = query.insert([{ ...newUser }]);
  }

  // EDIT
  if (id) {
    query = query.update({ ...newUser, avatar: imagePath }).eq('id', id);
    // query = query.update({ ...newUser }).eq('id', id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error(
      `${!id ? 'New user could not be created.' : 'User could not be edited.'}`
    );
  }

  // 2. Upload Image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(imageName, newUser.avatar);

  // 3. Delete the user if there was an error uploading the image
  if (storageError) {
    await supabase.from('users').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error(
      `User avatar could not be uploaded, and the user was not ${
        !id ? 'created' : 'edited'
      }.`
    );
  }

  return data;
}

export async function deleteUser(id) {
  const { data, error } = await supabase.from('users').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('User could not be deleted.');
  }

  return data;
}
