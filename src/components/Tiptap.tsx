"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Paragraph from '@tiptap/extension-paragraph'
import Image from '@tiptap/extension-image'
import Text from '@tiptap/extension-text'
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";

const limit = 100;

export default function Tiptap() {
  const editor = useEditor({
    extensions: [
      Paragraph,
      Text,
      Image,
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something...",
      }),
      CharacterCount.configure({
        limit,
      }),
    ],
  });

  const percentage = editor
    ? Math.round((100 / limit) * editor.storage.characterCount.characters())
    : 0

  if (!editor) return null;

  return (
    <div className="w-full">
      <EditorContent editor={editor} className="w-full" />
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
  );
}
