import { useMutation } from "@tanstack/react-query";
import { fetchData } from "@/utils/api";

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };  
};

export const usePostComment = () => {
  return useMutation({
    mutationKey: ["comments/postComment"],
    mutationFn: (comment: {
      content: string;
      postId: number;
      userId: number;
    }) =>
      fetchData({
        method: "POST",
        url: `/comments`,
        data: comment,
      })
  });
};
