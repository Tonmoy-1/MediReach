import axios from "axios";

// upoload image and return image url
const imageUpload = async (image) => {
  const formdata = new FormData();
  formdata.append("image", image);

  // send image data to imgbb
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formdata
  );
  const image_url = data.data.display_url;
  return image_url;
};

export { imageUpload };

export const saveUserInformation = async (user) => {
  axios.post(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
    name: user?.displayName,
    image: user?.photoURL,
    email: user?.email,
  });
};
