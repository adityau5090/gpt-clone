"use client"

import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { createConversation, updateConversation, deleteConversation, listConversations } from "../actions/conversation-actions"
import { queryKeys } from "../utils/query-keys"


export function useConversations(){
    return useQuery({
        queryKey: queryKeys.conversations.all,
        queryFn: () => listConversations(),
    });
}

export function useCreateconversation(){
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (title?: string) => createConversation(title),
        onSuccess: (conversation) => {
            void queryClient.invalidateQueries({
                queryKey: queryKeys.conversations.all,
            })
            router.push(`/c/${conversation.id}`);
        },
        onError: (error: Error) => {
            toast.error(error.message || "Could not create chat");
        },
    });
}

export function useUpdateConversation(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, ...data}: {
            id: string;
            title?: string;
            isPinned?: boolean;
            isArchive?: boolean;
        }) => updateConversation(id, data),
        onSuccess: (conversation) => {
            void queryClient.invalidateQueries({
                queryKey: queryKeys.conversations.all,
            });
            void queryClient.invalidateQueries({
                queryKey: queryKeys.conversations.detail(conversation.id),
            });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Could not update chat")
        }

    });
}

export function useDeleteConversation(activeId?: string){
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (id: string) => deleteConversation(id),
        onSuccess: ({ id }) => {
            void queryClient.invalidateQueries({
                queryKey: queryKeys.conversations.all
            });
            queryClient.removeQueries({
                queryKey: queryKeys.messages.byConversation(id),
            });
            if(activeId === id){
                router.push("/");
            }

            toast.success("Chat deleted");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Could not delete the chat")
        },
    })
}