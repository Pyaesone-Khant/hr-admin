import { queryClient } from "@/constants"
import { useAlert } from "@/hooks"
import { ALOVA } from "@/services/alova"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetPositions = () => {

    const { data, isLoading, error } = useQuery({
        queryKey: ['positions'],
        queryFn: ALOVA.getPositions,
    })

    return {
        positions: data,
        loading: isLoading,
        error: error,
    }
}

export const useCreatePosition = () => {
    const { mutate, isPending, error, isSuccess } = useMutation({
        mutationKey: ['createPosition'],
        mutationFn: (payload: Partial<Position>) => ALOVA.createPosition(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['positions'] })
        }
    })

    useAlert({
        success: isSuccess,
        successMessage: 'Position created successfully!',
        error: error!,
    });

    return {
        createPosition: mutate,
        loading: isPending,
    }
}

export const useUpdatePosition = () => {
    const { mutate, isPending, error, isSuccess } = useMutation({
        mutationKey: ['updatePosition'],
        mutationFn: (payload: { id: number, data: Partial<Position> }) => ALOVA.updatePosition(payload.id, payload.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['positions'] })
        }
    })

    useAlert({
        success: isSuccess,
        successMessage: 'Position updated successfully!',
        error: error!,
    });

    return {
        updatePosition: mutate,
        loading: isPending,
    }
}

export const useDeletePosition = () => {
    const { mutate, isPending, error, isSuccess } = useMutation({
        mutationKey: ['deletePosition'],
        mutationFn: (id: number) => ALOVA.deletePosition(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['positions'] })
        }
    })

    useAlert({
        success: isSuccess,
        successMessage: 'Position deleted successfully!',
        error: error!,
    });

    return {
        deletePosition: mutate,
        loading: isPending,
    }
}