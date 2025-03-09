import { useDisclosure } from "@/hooks";
import { slugify } from "@/lib/utils";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useUpdateDepartment } from "./departmentApi";

export function EditDepartmentModal({ department }: { department: Department }) {
    const [isOpen, { toggle }] = useDisclosure();
    const [form] = Form.useForm();

    const { updateDepartment, loading } = useUpdateDepartment();

    const onFinish = async (values: { name: string, description: string }) => {
        const payload = {
            ...values,
            slug: slugify(values.name)
        }

        updateDepartment({
            id: department.id,
            department: payload
        }, {
            onSuccess: () => {
                toggle();
                form.resetFields()
            }
        })
    }

    return (
        <>
            <Button
                icon={<EditOutlined />}
                onClick={toggle}
            />
            <Modal
                title="Edit Department"
                open={isOpen}
                onCancel={() => {
                    form.resetFields();
                    toggle();
                }}
                okText="Save"
                cancelText="Cancel"
                okButtonProps={{
                    form: `updateDepartmentForm-${department.id}`,
                    htmlType: 'submit',
                    loading: loading
                }}
                cancelButtonProps={{
                    disabled: loading
                }}
                centered
                maskClosable={!loading}
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                    name={`updateDepartmentForm-${department.id}`}
                    labelCol={{
                        span: 6
                    }}
                    wrapperCol={{
                        span: 16
                    }}
                    className="!pt-4"
                    initialValues={{
                        ...department
                    }}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Department Name"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Brief Description about the Department"
                            rows={3}
                        />
                    </Form.Item>
                </Form>
            </Modal >
        </>
    )
}
