import { queryClient } from "@/constants"
import { useAlert } from "@/hooks"
import { ALOVA } from "@/services/alova"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetEmployees = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['employees'],
        queryFn: ALOVA.getEmployees
    })

    return {
        employees: data,
        loading: isLoading,
        error
    }
}

export const useGetEmployee = (id: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['employee', id],
        queryFn: () => ALOVA.getEmployee(id)
    })

    return {
        employee: data,
        loading: isLoading,
        error
    }
}

export const useCreateEmployee = () => {
    const { mutate, isPending, error, isSuccess } = useMutation({
        mutationKey: ['createEmployee'],
        mutationFn: (payload: Partial<Employee>) => ALOVA.createEmployee(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] })
        }
    });

    useAlert({
        successMessage: 'Employee added successfully!',
        success: isSuccess,
        error: error!,
    })

    return {
        createEmployee: mutate,
        loading: isPending,
    }
}