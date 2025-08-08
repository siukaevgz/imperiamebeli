import { axiosInstance } from "./axiosInstance";

export const getToken = async (id: string) => {
  const { data } = await axiosInstance.get<String>(
    "/tokenCtreate/?userId=" + id
  );
  return data;
};
