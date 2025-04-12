"use client";
import Post from "@/components/Post";
import Tiptap from "@/components/Tiptap";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import Tooltip from "@/components/Tooltip";
import { useGetPosts } from "@/hooks/posts";
import { formatDistanceToNow, subMonths } from "date-fns";

export default function Home() {
  const { data: postsData } = useGetPosts();
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="pt-20 items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
        <main className="w-xl mx-auto flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="w-full flex flex-col gap-4 sticky top-0 bg-white p-4">
            <div className="flex items-center justify-between w-full">
              <h1>Hi {session.user?.name}</h1>
              <Tooltip text="Sign Out">
                <button
                  className="bg-gray-100 p-1 cursor-pointer rounded-md"
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
              <Tiptap />
            </div>
          </div>
          {postsData?.map((post) => (
            <Post
              key={post.id}
              image={post.imageUrl}
              name={post.user.name}
              content={post.content}
              time={(() => {
                const postDate = new Date(post.createdAt);
                const oneMonthAgo = subMonths(new Date(), 1);
                
                if (postDate >= oneMonthAgo) {
                  return formatDistanceToNow(postDate, {
                    addSuffix: true,
                  });
                } else {
                  return postDate.toLocaleString("en-US", {
                    weekday: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  });
                }
              })()}
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
