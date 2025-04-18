"use client";

import { useImperativeHandle, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Paragraph from "@tiptap/extension-paragraph";
import Image from "@tiptap/extension-image";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { PhotoIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useGetPresignedUrl, useGetPresignedUrlForView } from "@/hooks/uploads";
import Tooltip from "./Tooltip";

const limit = 100;

// const uploadImage = async (file: File): Promise<string> => {
//   // Replace with real upload logic (e.g., to S3, Cloudinary)
//   // await new Promise((r) => setTimeout(r, 1000));
//   // return URL.createObjectURL(file); // Mock: just local blob

//   const { mutate: getPresignedUrl } = useGetPresignedUrl();
//   const data = getPresignedUrl({
//     fileExtension: file.type.split("/")[1],
//     contentType: file.type,
//   });

//   console.log("nilai data: ", data);
  
//   return "";
// };

export default function Tiptap({
  placeholder,
  isUploadImage = true,
  onSubmit,
  ref,
}: {
  placeholder?: string;
  isUploadImage?: boolean;
  onSubmit?: (content: string) => void;
  ref?: any;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    clearContent: () => editor?.commands.clearContent(),
  }));

  const { mutate: getPresignedUrl } = useGetPresignedUrl();

  const editor = useEditor({
    extensions: [
      Paragraph,
      Text,
      Image,
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder || "Write something...",
      }),
      CharacterCount.configure({
        limit,
      }),
    ],
  });

  const percentage = editor
    ? Math.round((100 / limit) * editor.storage.characterCount.characters())
    : 0;

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !editor) return;

    const fileExtension = file.type.split("/")[1];
    const contentType = file.type;
    
    getPresignedUrl({
      fileExtension: fileExtension,
      contentType: contentType,
    }, {
      onSuccess: async (data) => {
        const presignedUrlData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploads/presigned-url/${encodeURIComponent(data.key)}`)
        const { url } = await presignedUrlData.json();
        editor
          .chain()
          .focus()
          .setImage({ src: "https://example.com/foobar.png" })
          .createParagraphNear()
          .focus()
          .run();
      },
      onError: (error) => {
        console.error("Error uploading image:", error);
      },
    });
  };

  if (!editor) return null;

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <EditorContent
          editor={editor}
          className="w-full text-gray-900 font-normal leading-snug"
        />
        <button
          disabled={editor.storage.characterCount.characters() === 0}
          className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-gray-500 text-sm font-normal leading-snug pb-0.5"
          onClick={() => onSubmit?.(editor.getText())}
        >
          <PaperAirplaneIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="flex items-center gap-2 mt-2">
        {isUploadImage && (
          <div className="flex items-center gap-2">
            <Tooltip text="Upload Image">
              <button
                className="p-1 cursor-pointer rounded-md"
                onClick={() => inputRef.current?.click()}
              >
                <PhotoIcon className="w-6 h-6" />
              </button>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </Tooltip>
          </div>
        )}
        <div
          className={`character-count ${
            editor.storage.characterCount.characters() === limit
              ? "character-count--warning"
              : ""
          }`}
        >
          <svg height="20" width="20" viewBox="0 0 20 20">
            <circle r="10" cx="10" cy="10" fill="#e9ecef" />
            <circle
              r="5"
              cx="10"
              cy="10"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
              transform="rotate(-90) translate(-20)"
            />
            <circle r="6" cx="10" cy="10" fill="white" />
          </svg>
          {editor.storage.characterCount.characters()} / {limit} characters
        </div>
      </div>
    </div>
  );
}
