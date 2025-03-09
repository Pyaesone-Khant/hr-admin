import { queryClient } from "@/constants"
import { useAlert } from "@/hooks"
import { ALOVA } from "@/services/alova"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetDepartments = () => {

    const { data, isLoading, error } = useQuery({
        queryKey: ['departments'],
        queryFn: ALOVA.getDepartments
    })

    return {
        departments: data as Department[],
        loading: isLoading,
        error,
    }
}

export const useCreateDepartment = () => {

    const { mutate, isPending, error, isSuccess } = useMutation({
        mutationKey: ['createDepartment'],
        mutationFn: (department: Partial<Department>) => ALOVA.createDepartment(department),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['departments'] })
        }
    })

    useAlert({
        success: isSuccess,
        successMessage: 'Department created successfully!',
        error: error!,
    })

    return {
        createDepartment: mutate,
        loading: isPending,
        error
    }
}

export const useUpdateDepartment = () => {

    const { mutate, isPending, error, isSuccess } = useMutation({
        mutationKey: ['updateDepartment'],
        mutationFn: (payload: { id: number, department: Partial<Department> }) => ALOVA.updateDepartment(payload.id, payload.department),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['departments'] })
        }
    })

    useAlert({
        success: isSuccess,
        successMessage: 'Department updated successfully!',
        error: error!,
    })

    return {
        updateDepartment: mutate,
        loading: isPending,
        error
    }
}

export const useDeleteDepartment = () => {

    const { mutate, isPending, error, isSuccess } = useMutation({
        mutationKey: ['deleteDepartment'],
        mutationFn: (id: number) => ALOVA.deleteDepartment(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['departments'] })
        }
    })

    useAlert({
        success: isSuccess,
        successMessage: 'Department deleted successfully!',
        error: error!,
    })

    return {
        deleteDepartment: mutate,
        loading: isPending,
        error
    }
}