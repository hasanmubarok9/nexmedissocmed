import { useMutation } from "@tanstack/react-query";
import { fetchData } from "@/utils/api";

export const useSignin = () => {
  return useMutation({
    mutationKey: ["auth/signin"],
    mutationFn: (data: { email: string; password: string }) =>
      fetchData<{ accessToken: string }>({ url: "/auth/signin", method: "POST", data }),
  });
};

export const useSignup = () => {
  return useMutation({
    mutationKey: ["auth/signup"],
    mutationFn: (data: { name: string; email: string; password: string }) =>
      fetchData({ url: "/auth/signup", method: "POST", data }),
  });
};
