import supabase, { supabaseUrl } from './supabase';

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data.user;
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  // Update the current user with the new data (password, name)
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  // upload avatar to Supabase Storage
  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  // update user avatar in Supabase
  const avatarName = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;
  const { data: updatedUser, error: avatarError } =
    await supabase.auth.updateUser({
      data: { avatar: avatarName },
    });
  if (avatarError) throw new Error(avatarError.message);

  return updatedUser;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
