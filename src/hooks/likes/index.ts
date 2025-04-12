import { useMutation } from "@tanstack/react-query";
import { fetchData } from "@/utils/api";

export type Like = {
  id: number;
  postId: number;
  userId: number;
};

export const usePostLike = () => {
  return useMutation({
    mutationKey: ["likes/postLike"],
    mutationFn: (like: {
      postId: number;
      userId: number;
    }) =>
      fetchData({
        method: "POST",
        url: `/likes`,
        data: like,
      })
  });
};
