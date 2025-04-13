import { useQuery, useMutation } from "@tanstack/react-query";
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
        }) => fetchData<{
            presignedUrl: string;
            key: string;
            imageUrl: string;
        }>({
            url: "/uploads/presigned-url",
            method: "POST",
            data: {
                fileExtension: fileExtension,
                contentType: contentType,
            },
        }),
    });
};

export const useGetPresignedUrlForView = (key: string) => {
    return useQuery({
        queryKey: ["uploads/getPresignedUrlForView"],
        queryFn: () => fetchData<{
            url: string;
        }>({
            url: `/uploads/presigned-url-for-view/${key}`,
        }),
    });
};
