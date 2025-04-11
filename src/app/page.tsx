"use client";
import Post from "@/components/Post";
import Tiptap from "@/components/Tiptap";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import Tooltip from "@/components/Tooltip";
import { useGetPosts } from "@/hooks/posts";

export default function Home() {
  const { data: postsData } = useGetPosts();
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="w-lg mx-auto flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
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
          <div className="w-full flex  items-start gap-3">
            <Image
              src="https://pagedone.io/asset/uploads/1704092147.png"
              alt="Hailey Garza"
              className="w-12 h-12"
              width={48}
              height={48}
            />
            <Tiptap />
          </div>
          {postsData?.map((post) => (
            <Post
              key={post.id}
              image={post.imageUrl}
              name={post.user.name}
              content={post.content}
              time={new Date(post.createdAt).toLocaleString('en-US', {
                weekday: 'long',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
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
