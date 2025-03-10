import { Alova, AlovaDefaultCacheAdapter, AlovaGenerics } from "alova";
import { FetchRequestInit } from "alova/fetch";

export const createApi = (apiInstance: Alova<AlovaGenerics<any, any, FetchRequestInit, Response, Headers, AlovaDefaultCacheAdapter, AlovaDefaultCacheAdapter>>) => {
    return {
        getDepartments: () => apiInstance.Get('/departments', {
            name: 'departments',
        }),

        getDepartment: (id: number) => apiInstance.Get(`/departments/${id}`),

        createDepartment: (payload: Partial<Department>) => apiInstance.Post('/departments', payload, {
            hitSource: 'departments'
        }),

        updateDepartment: (id: number, payload: Partial<Department>) => apiInstance.Patch(`/departments/${id}`, payload, {
            hitSource: 'departments'
        }),

        deleteDepartment: (id: number) => apiInstance.Delete(`/departments/${id}`, undefined, {
            hitSource: 'departments'
        }),

        getEmployees: () => apiInstance.Get('/employees'),

        getEmployee: (id: string): Promise<Employee> => apiInstance.Get(`/employees/${id}`),

        createEmployee: (payload: Partial<Employee>): Promise<Employee> => apiInstance.Post('/employees', payload),

        updateEmployee: (id: number, payload: Partial<Employee>) => apiInstance.Patch(`/employees/${id}`, payload),

        deleteEmployee: (id: number) => apiInstance.Delete(`/employees/${id}`),

        getLeaves: () => apiInstance.Get('/leaves'),

        getLeave: (id: number) => apiInstance.Get(`/leaves/${id}`),

        createLeave: (payload: any) => apiInstance.Post('/leaves', payload),

        updateLeave: (id: number, payload: { status: string }) => apiInstance.Patch(`/leaves/${id}`, payload),

        deleteLeave: (id: number) => apiInstance.Delete(`/leaves/${id}`),

        getPositions: (): Promise<Position[]> => apiInstance.Get('/positions'),

        getPosition: (id: number) => apiInstance.Get(`/positions/${id}`),

        createPosition: (payload: Partial<Position>) => apiInstance.Post('/positions', payload),

        updatePosition: (id: number, payload: Partial<Position>): Promise<Position> => apiInstance.Patch(`/positions/${id}`, payload),

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