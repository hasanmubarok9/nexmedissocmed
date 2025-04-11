import Post from "@/components/Post";
import Tiptap from "@/components/Tiptap";
import Image from "next/image";


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-sm mx-auto flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex items-center gap-3">
          <Image
            src="https://pagedone.io/asset/uploads/1704092147.png"
            alt="Hailey Garza"
            className="w-12 h-12"
            width={48}
            height={48}
          />
          <Tiptap />
        </div>
        <Post
          image="https://pagedone.io/asset/uploads/1704092147.png"
          name="Hailey Garza"
          description="added new tags to Ease Design System"
          time="Friday, 10:03 AM"
        />
        <Post
          image="https://pagedone.io/asset/uploads/1704092147.png"
          name="Hailey Garza"
          description="added new tags to Ease Design System"
          time="Friday, 10:03 AM"
        />
        <Post
          image="https://pagedone.io/asset/uploads/1704092147.png"
          name="Hailey Garza"
          description="added new tags to Ease Design System"
          time="Friday, 10:03 AM"
        />
      </main>
    </div>
  );
}
