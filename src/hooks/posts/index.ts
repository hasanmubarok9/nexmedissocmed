import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchData } from "@/utils/api";
import { Like } from "@/hooks/likes";
import { Comment } from "@/hooks/comments";

type Post = {
  id: number;
  imageUrl: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: {
    id: number;
    name: string;
  };
  comments: Comment[];
  likes: Like[];
};

export const useGetPosts = () => {
  return useQuery<Post[]>({
    queryKey: ["posts/getPosts"],
    queryFn: () => fetchData({ url: "/posts" }),
  });
};

export const usePostPost = () => {
  return useMutation({
    mutationKey: ["posts/postPost"],
    mutationFn: (post: {
      content: string;
      imageUrl: string;
      userId: number;
    }) => fetchData({ url: "/posts", method: "POST", data: post }),
  });
};

