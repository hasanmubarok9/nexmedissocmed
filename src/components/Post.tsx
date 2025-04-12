import { useRef } from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";
import PostDetail from "./PostDetail";
import { Comment } from "@/hooks/posts";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";

export default function Post({
  image,
  name,
  time,
  content,
  comments,
  postId,
}: {
  image: string;
  name: string;
  time: string;
  content: string;
  comments: Comment[];
  postId: number;
}) {
  const postDetailRef = useRef<any>(null);

  return (
    <div className="flex flex-col gap-2 px-4">
      <div className="flex items-center gap-3">
        <Image
          src="https://pagedone.io/asset/uploads/1704092147.png"
          alt="profile picture"
          className="w-12 h-12"
          width={48}
          height={48}
        />
        <div>
          <h2 className="text-gray-900 text-sm font-semibold leading-snug pb-0.5">
            {name}
          </h2>
          <h3 className="text-gray-500 text-xs font-normal leading-4">
            {time}
          </h3>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <img src={image} alt={name} />
        <div className="flex items-center gap-2">
          <HeartIcon className="w-6 h-6" />
          <button
            onClick={() => postDetailRef.current.openModal()}
            className="cursor-pointer inline-flex items-center justify-center h-10 gap-2 text-sm font-medium tracking-wide transition duration-300 rounded whitespace-nowrap focus-visible:outline-none disabled:cursor-not-allowed disabled:shadow-none"
          >
            <ChatBubbleOvalLeftIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div>
        <p className="text-gray-900 text-sm font-normal leading-snug pb-0.5">
          {content}
        </p>
      </div>
      <div>
        <button
          onClick={() => postDetailRef.current.openModal()}
          className="cursor-pointer text-gray-500 text-sm font-normal leading-snug pb-0.5"
        >
          View {comments.length} comments
        </button>
      </div>
      <PostDetail
        postId={postId}
        image={image}
        content={content}
        name={name}
        time={time}
        comments={comments}
        ref={postDetailRef}
      />
    </div>
  );
}
