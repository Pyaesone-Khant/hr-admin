import { Alova, AlovaGenerics } from "alova";

export const createApi = (apiInstance: Alova<AlovaGenerics>) => {
    return {
        getDepartments: () => apiInstance.Get('/departments'),

        getDepartment: (id: number) => apiInstance.Get(`/departments/${id}`),

        createDepartment: (payload: any) => apiInstance.Post('/departments', payload),

        updateDepartment: (id: number, payload: any) => apiInstance.Patch(`/departments/${id}`, payload),

        deleteDepartment: (id: number) => apiInstance.Delete(`/departments/${id}`),

        getEmployees: () => apiInstance.Get('/employees'),

        getEmployee: (id: string) => apiInstance.Get(`/employees/${id}`),

        createEmployee: (payload: any): Promise<Employee> => apiInstance.Post('/employees', payload),

        updateEmployee: (id: number, payload: any) => apiInstance.Patch(`/employees/${id}`, payload),

        deleteEmployee: (id: number) => apiInstance.Delete(`/employees/${id}`),

        getLeaves: () => apiInstance.Get('/leaves'),

        getLeave: (id: number) => apiInstance.Get(`/leaves/${id}`),

        createLeave: (payload: any) => apiInstance.Post('/leaves', payload),

        updateLeave: (id: number, payload: { status: string }) => apiInstance.Patch(`/leaves/${id}`, payload),

        deleteLeave: (id: number) => apiInstance.Delete(`/leaves/${id}`),

        getPositions: () => apiInstance.Get('/positions'),

        getPosition: (id: number) => apiInstance.Get(`/positions/${id}`),

        createPosition: (payload: any) => apiInstance.Post('/positions', payload),

        updatePosition: (id: number, payload: any) => apiInstance.Patch(`/positions/${id}`, payload),

        deletePosition: (id: number) => apiInstance.Delete(`/positions/${id}`),
    };
};

export const setApiToken = ({
    apiInstance,
    token
}: {
    apiInstance: Alova<AlovaGenerics>,
    token: string
}) => {
    apiInstance.options.beforeRequest = (method) => {
        method.config.headers['Authorization'] = `Bearer ${token}`;
    }
}