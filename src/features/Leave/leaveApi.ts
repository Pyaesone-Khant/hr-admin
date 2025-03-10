import { queryClient } from "@/constants"
import { LeaveStatus } from "@/constants/leave-status"
import { useAlert } from "@/hooks"
import { ALOVA } from "@/services/alova"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetLeaves = (status: LeaveStatus) => {

    const { data: leaves, isLoading: loading } = useQuery<Leave[], Error, Leave[]>({
        queryKey: ['leaves', status],
        queryFn: () => ALOVA.getLeaves(status),
    })

    return {
        leaves,
        loading
    }

}

export const useUpdateLeaveStatus = () => {

    const { mutate, isPending, error, isSuccess, data } = useMutation({
        mutationKey: ['updateLeaveStatus'],
        mutationFn: (payload: { id: number, status: string }) => ALOVA.updateLeaveStatus(payload.id, { status: payload.status }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['leaves']
            })
        }
    })

    useAlert({
        success: isSuccess,
        successMessage: `Leave ${data?.status} successfully`,
        error: error!,
    })

    return {
        updateLeaveStatus: mutate,
        loading: isPending
    }
}