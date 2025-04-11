import axiosInstance from "@/libs/axios";
import { AxiosRequestConfig } from "axios";

export const fetchData = async <T>({
  url,
  method = "GET",
  params = {},
}: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await axiosInstance.request({
      url,
      method,
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
