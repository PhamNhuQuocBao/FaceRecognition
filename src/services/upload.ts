import { BASE_API } from ".";

export const uploadFiles = async (files: FileList) => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }
  const { data } = await BASE_API.post("/upload", formData);

  return data;
};
