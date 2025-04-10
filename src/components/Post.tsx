import Image from "next/image";

export default function Post({
  image,
  name,
  description,
  time,
}: {
  image: string;
  name: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={image}
        alt={name}
        className="w-12 h-12"
        width={48}
        height={48}
      />
      <div>
        <h2 className="text-gray-900 text-sm font-medium leading-snug pb-0.5">
          {name}{" "}
          <span className="text-gray-500">
            {description}
          </span>
        </h2>
        <h3 className="text-gray-500 text-xs font-normal leading-4">
          {time}
        </h3>
      </div>
    </div>
  );
}
