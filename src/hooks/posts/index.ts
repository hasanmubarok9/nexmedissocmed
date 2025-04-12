import { useQuery } from "@tanstack/react-query";
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
};

export const useGetPosts = () => {
  return useQuery<Post[]>({
    queryKey: ["posts/getPosts"],
    queryFn: () => fetchData({ url: "/posts" }),
  });
};

