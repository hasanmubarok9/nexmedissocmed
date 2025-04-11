import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/utils/api";

type Post = {
  id: string;
  imageUrl: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
  };
};

export const useGetPosts = () => {
  return useQuery<Post[]>({
    queryKey: ["posts/getPosts"],
    queryFn: () => fetchData({ url: "/posts" }),
  });
};

