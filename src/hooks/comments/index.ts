import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "@/utils/api";

export const usePostComment = () => {
  const queryClient = useQueryClient();
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
