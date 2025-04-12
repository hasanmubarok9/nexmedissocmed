"use client";
import { useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useGetPosts, usePostPost } from "@/hooks/posts";
import { formatTime } from "@/utils/time";
import Post from "@/components/Post";
import Tooltip from "@/components/Tooltip";
import Tiptap from "@/components/Tiptap";

export default function Home() {
  const { data: postsData } = useGetPosts();
  const { data: session } = useSession();
  const { mutate: postPost } = usePostPost();
  const queryClient = useQueryClient();
  const tiptapRef = useRef<any>(null);
  if (session) {
    return (
      <div className="pt-20 items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
        <main className="w-xl mx-auto flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="w-full flex flex-col gap-4 sticky top-0 bg-white p-4">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-gray-900 text-md font-medium leading-snug pb-0.5">
                Hi {session.user?.name}
              </h1>
              <Tooltip text="Sign Out">
                <button
                  className="p-1 cursor-pointer rounded-md"
                  onClick={() => signOut()}
                >
                  <ArrowRightEndOnRectangleIcon className="w-6 h-6" />
                </button>
              </Tooltip>
            </div>
            <div className="w-full flex items-start gap-3">
              <Image
                src="https://pagedone.io/asset/uploads/1704092147.png"
                alt="Hailey Garza"
                className="w-12 h-12"
                width={48}
                height={48}
              />
              <Tiptap
                ref={tiptapRef}
                onSubmit={(content) => {
                  postPost(
                    { content, imageUrl: "", userId: 1 },
                    {
                      onSuccess: () => {
                        tiptapRef.current.clearContent();
                        queryClient.invalidateQueries({
                          queryKey: ["posts/getPosts"],
                        });
                      },
                    }
                  )
                }}
              />
            </div>
          </div>
          {postsData?.map((post) => (
            <Post
              key={post.id}
              postId={post.id}
              image={post.imageUrl}
              name={post.user.name}
              content={post.content}
              comments={post.comments}
              likes={post.likes}
              time={formatTime(post.createdAt)}
            />
          ))}
        </main>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center h-screen">
        <button
          className="bg-gray-100 p-2 cursor-pointer rounded-md"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      </div>
    );
  }
}
