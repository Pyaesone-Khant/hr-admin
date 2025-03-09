import { useDisclosure } from "@/hooks";
import { slugify } from "@/lib/utils";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useCreateDepartment } from "./departmentApi";

export function AddNewDepartmentModal() {

    const [isOpen, { toggle }] = useDisclosure();
    const [form] = Form.useForm();

    const { createDepartment, loading } = useCreateDepartment();

    const onFinish = async (values: { name: string, description: string }) => {
        const payload = {
            ...values,
            slug: slugify(values.name)
        }

        createDepartment(payload, {
            onSuccess: () => {
                toggle();
                form.resetFields()
            }
        })
    }


    return (
        <>
            <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={toggle}
            >
                New Department
            </Button>
            <Modal
                title="Create a new Department"
                open={isOpen}
                onCancel={() => {
                    form.resetFields();
                    toggle();
                }}
                okText="Save"
                cancelText="Cancel"
                okButtonProps={{
                    form: 'AddNewDepartmentModal',
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
                    name="AddNewDepartmentModal"
                    labelCol={{
                        span: 6
                    }}
                    wrapperCol={{
                        span: 16
                    }}
                    className="!pt-4"
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
            </Modal>
        </>
    )
}
