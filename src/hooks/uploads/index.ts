import { useMutation } from "@tanstack/react-query";
import { fetchData } from "@/utils/api";

export const useGetPresignedUrl = () => {
    return useMutation({
        mutationKey: ["uploads/getPresignedUrl"],
        mutationFn: ({
            fileExtension,
            contentType,
        }: {
            fileExtension: string;
            contentType: string;
        }) => fetchData({
            url: "/uploads/presigned-url",
            method: "POST",
            data: {
                fileExtension: fileExtension,
                contentType: contentType,
            },
        }),
    });
};

