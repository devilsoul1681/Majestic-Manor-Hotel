import supabase, { supabase2 } from "./superbase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase2.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avator: "",
      },
    },
  });
  if (error) throw new Error("Error login in user");
  return data;
}

export async function loginUser(loginInfo) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: loginInfo.email,
    password: loginInfo.password,
  });
  if (error) throw new Error("Error login in user");
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new error(error.message);
  return data.user;
}

export async function userLogout() {
  const { data, error } = await supabase.auth.signOut();
  if (error) throw new error(error.message);
  console.log(data);
  return data;
}

export async function updateUser({ password, fullName, avatar }) {
  // 1.update data
  let dataupdate;
  if (password) dataupdate = { password };
  if (fullName) dataupdate = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(dataupdate);
  if (error) throw new error(error.message);
  if (!avatar) return data;

  //2. Upload avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: bucketError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (bucketError) throw new error(bucketError.message);

  //3.update avatar in the user
  const { data: data2, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `https://rmrtpisltzpdkxlhylmm.supabase.co/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new error(error2.message);
  return data2;
}
