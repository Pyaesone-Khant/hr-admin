import { useDisclosure } from "@/hooks";
import { slugify } from "@/lib/utils";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useUpdatePosition } from "./positionApi";

export function EditPositionModal({ position }: { position: Position }) {

    const [isOpen, { toggle }] = useDisclosure();

    const { updatePosition, loading } = useUpdatePosition();

    const onFinish = (values: Partial<Position>) => {

        const slug = slugify(values.name!);
        const payload = {
            ...values,
            slug
        }

        updatePosition({
            id: position.id,
            data: payload
        }, {
            onSuccess: () => {
                toggle();
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
                title="Edit position"
                open={isOpen}
                onCancel={toggle}
                okText="Save"
                cancelText="Cancel"
                okButtonProps={{
                    loading: loading,
                    htmlType: 'submit',
                    form: `editPositionForm-${position?.id}`
                }}
                cancelButtonProps={{
                    disabled: loading
                }}
                centered
            >
                <Form
                    onFinish={onFinish}
                    name={`editPositionForm-${position?.id}`}
                    wrapperCol={{
                        span: 16
                    }}
                    labelCol={{
                        span: 6
                    }}
                    className="!pt-4"
                    initialValues={position}
                >
                    <Form.Item
                        label="Name"
                        name={'name'}
                        rules={[
                            {
                                required: true,
                                message: 'Required!'
                            }
                        ]}
                    >
                        <Input
                            placeholder="Position name"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name={'description'}
                        rules={[
                            {
                                required: true,
                                message: 'Required!'
                            }
                        ]}
                    >
                        <Input.TextArea
                            placeholder="A brief description of the position"
                            rows={4}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
