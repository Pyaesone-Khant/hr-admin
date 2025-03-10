import { NRCInput } from "@/components/common/NRCInput";
import { EmploymentStatus, REQ_DATE_FORMAT } from "@/constants";
import { useGetDepartments } from "@/features/Department/departmentApi";
import { formatNRC } from "@/lib/utils";
import { ALOVA } from "@/services/alova";
import { useRequest } from "alova/client";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useCreateEmployee } from "./employeeApi";

export function AddNewEmployeeForm() {

    const [form] = Form.useForm();

    const { departments } = useGetDepartments();
    const { data: positions } = useRequest(ALOVA.getPositions);
    const { createEmployee, loading } = useCreateEmployee();

    const nav = useNavigate();

    const onFinish = (values: Partial<Employee>) => {
        const nrc = formatNRC(values.nrc as NRC);

        const payload = {
            ...values,
            dob: dayjs(values.dob).format(REQ_DATE_FORMAT),
            startDate: dayjs().format(REQ_DATE_FORMAT),
            nrc,
        };

        console.log(payload); return;

        createEmployee(payload, {
            onSuccess: () => {
                form.resetFields();
                nav('/employees');
            }
        });
    }

    useEffect(() => {
        form.setFieldsValue({
            name: 'Pyaesone Khant',
            email: 'email@gmail.com',
            mobileNumber: '09987654321',
            address: 'Yangon',
            positionId: '14',
            departmentId: '1',
            employmentStatus: 'PERMANENT',
            salary: 1000000
        })
    }, [])

    return (
        <>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                className="max-w-2xl grid grid-cols-2 gap-4 mx-auto"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Required!" }]}
                >
                    <Input
                        placeholder="Name"
                    />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: 'email', message: "Required!" }]}
                >
                    <Input
                        placeholder="Email"
                    />
                </Form.Item>

                <Form.Item
                    label="Mobile Number"
                    name="mobileNumber"
                    rules={[{ required: true, message: "Required!" }]}
                >
                    <Input
                        placeholder="Mobile Number"
                    />
                </Form.Item>

                <Form.Item
                    label="Date of Birth"
                    name="dob"
                    rules={[{ required: true, message: "Required!" }]}
                    initialValue={null}
                >
                    <DatePicker
                        placeholder="Date of Birth"
                        disabledDate={(current) => current && current > dayjs().subtract(10, 'year')}
                        className="w-full"
                        inputReadOnly
                    />
                </Form.Item>

                <NRCInput
                    form={form}
                />

                <Form.Item
                    label="Department"
                    name="departmentId"
                    rules={[{ required: true, message: "Required!" }]}
                >
                    <Select
                        placeholder="Select Department"
                        options={departments?.map((department: Department) => ({ label: department.name, value: department.id }))}
                    />
                </Form.Item>

                <Form.Item
                    label="Position"
                    name="positionId"
                    rules={[{ required: true, message: "Required!" }]}
                >
                    <Select
                        placeholder="Select Position"
                        options={positions?.map((position: Position) => ({ label: position.name, value: position.id }))}
                    />
                </Form.Item>
                <Form.Item
                    label="Employee Status"
                    name="employmentStatus"
                    rules={[{ required: true, message: "Required!" }]}
                >
                    <Select
                        placeholder="Select Employee Status"
                        options={Object.values(EmploymentStatus).map((status) => ({ label: status, value: status }))}
                    />
                </Form.Item>
                <Form.Item
                    label="Salary"
                    name="salary"
                    rules={[
                        { required: true, message: "Required!" },
                        { type: 'number', message: "Invalid number!", min: 200000 }
                    ]}
                >
                    <InputNumber
                        placeholder="Salary"
                        className="!w-full"
                        min={0}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        suffix="MMK"
                    />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: "Required!" }]}
                    className="col-span-2"
                >
                    <Input.TextArea
                        placeholder="Address"
                        className="resize-none"
                        rows={2}
                    />
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="block mx-auto col-span-2"
                    loading={loading}
                >
                    Submit
                </Button>
            </Form >
        </>
    )
}