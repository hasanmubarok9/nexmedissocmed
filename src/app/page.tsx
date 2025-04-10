import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex items-center gap-3">
          <Image
            src="https://pagedone.io/asset/uploads/1704092147.png"
            alt="Hailey image"
            className="w-12 h-12"
            width={48}
            height={48}
          />
          <div>
            <h2 className="text-gray-900 text-sm font-medium leading-snug pb-0.5">
              Hailey Garza{" "}
              <span className="text-gray-500">
                added new tags to Ease Design System
              </span>
            </h2>
            <h3 className="text-gray-500 text-xs font-normal leading-4">
              Account | Friday, 10:03 AM
            </h3>
          </div>
        </div>
      </main>
    </div>
  );
}
