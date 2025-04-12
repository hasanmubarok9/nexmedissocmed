import React, { useState, useRef, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ReactDOM from "react-dom";
import Image from "next/image";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { Comment } from "@/hooks/posts";
import { useSession } from "next-auth/react";
import { usePostComment } from "@/hooks/comments";
import { formatTime } from "@/utils/time";
import Tiptap from "./Tiptap";

export default function PostDetail({
  image,
  content,
  name,
  time,
  comments,
  postId,
}: {
  image: string;
  content: string;
  name: string;
  time: string;
  comments: Comment[];
  postId: number;
}) {
  const [isShowing, setIsShowing] = useState(false);
  const { mutate: postComment } = usePostComment();
  const { data: session } = useSession();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tiptapRef = useRef<any>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsShowing(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsShowing(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    let html = document.querySelector("html");

    if (html) {
      if (isShowing && html) {
        html.style.overflowY = "hidden";

        const focusableElements =
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        const modal = document.querySelector("#modal"); // select the modal by it's id

        if (!modal) return;

        const firstFocusableElement = modal.querySelectorAll(
          focusableElements
        )[0] as HTMLElement; // get first element to be focused inside modal

        if (!firstFocusableElement) return;

        const focusableContent = modal.querySelectorAll(
          focusableElements
        ) as NodeListOf<HTMLElement>;

        const lastFocusableElement =
          focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

        document.addEventListener("keydown", function (e) {
          if (e.keyCode === 27) {
            setIsShowing(false);
          }

          let isTabPressed = e.key === "Tab" || e.keyCode === 9;

          if (!isTabPressed) {
            return;
          }

          if (e.shiftKey) {
            // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus(); // add focus for the last focusable element
              e.preventDefault();
            }
          } else {
            // if tab key is pressed
            if (document.activeElement === lastFocusableElement) {
              // if focused has reached to last focusable element then focus first focusable element after pressing tab
              firstFocusableElement.focus(); // add focus for the first focusable element
              e.preventDefault();
            }
          }
        });

        firstFocusableElement.focus();
      } else {
        html.style.overflowY = "visible";
      }
    }
  }, [isShowing]);

  return (
    <>
      <button
        onClick={() => setIsShowing(true)}
        className="cursor-pointer inline-flex items-center justify-center h-10 gap-2 text-sm font-medium tracking-wide transition duration-300 rounded whitespace-nowrap focus-visible:outline-none disabled:cursor-not-allowed disabled:shadow-none"
      >
        <ChatBubbleOvalLeftIcon className="w-6 h-6" />
      </button>

      {isShowing && typeof document !== "undefined"
        ? ReactDOM.createPortal(
            <div
              className="fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-slate-300/20 backdrop-blur-sm"
              aria-labelledby="header-3a content-3a"
              aria-modal="true"
              tabIndex={-1}
              role="dialog"
            >
              {/*    <!-- Modal --> */}
              <div
                ref={wrapperRef}
                className="flex h-[80vh] w-9/12 max-w-full flex-col gap-6 overflow-hidden rounded bg-white text-slate-500 shadow-xl shadow-slate-700/10"
                id="modal"
                role="document"
              >
                {/*        <!-- Modal body --> */}
                <div id="content-3a" className="flex-1 overflow-auto flex">
                  <div className="relative h-full w-2/3">
                    <Image
                      src="https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ"
                      alt="Post Image"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="w-1/3 p-4 flex flex-col gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Image
                          src="https://pagedone.io/asset/uploads/1704092147.png"
                          alt="profile picture"
                          className="w-12 h-12"
                          width={48}
                          height={48}
                        />
                        <h2 className="text-gray-900 text-sm font-semibold leading-snug pb-0.5">
                          {name}
                        </h2>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-gray-900 text-md font-normal leading-snug">
                          {content}
                        </p>
                        <p className="text-gray-500 text-xs font-normal leading-4">
                          {time}
                        </p>
                      </div>
                    </div>
                    <div className="overflow-auto flex-1 flex flex-col gap-4">
                      {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4">
                          <div className="flex items-center gap-3">
                            <Image
                              src="https://pagedone.io/asset/uploads/1704092147.png"
                              alt="profile picture"
                              className="w-12 h-12"
                              width={48}
                              height={48}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <p className="text-gray-900 text-sm font-normal leading-snug">
                              <span className="font-semibold">
                                {comment.user.name}
                              </span>{" "}
                              {comment.content}
                            </p>
                            <p className="text-gray-500 text-xs font-normal leading-4">
                              {formatTime(comment.createdAt)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="">
                      <Tiptap
                        ref={tiptapRef}
                        placeholder="Add a comment..."
                        isUploadImage={false}
                        onSubmit={(content) => {
                          postComment({
                            postId: postId,
                            content: content,
                            userId: 2, // TODO: get user id from session
                          }, {
                            onSuccess: () => {
                              tiptapRef.current.clearContent();
                              queryClient.invalidateQueries({
                                queryKey: ["posts/getPosts"],
                              });
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
