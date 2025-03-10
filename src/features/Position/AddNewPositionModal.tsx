import { useDisclosure } from "@/hooks"
import { slugify } from "@/lib/utils"
import { ALOVA } from "@/services/alova"
import { PlusOutlined } from "@ant-design/icons"
import { useForm } from "alova/client"
import { Button, Form, Input, Modal } from "antd"

export function AddNewPositionModal() {

    const [isOpen, { toggle }] = useDisclosure()
    const { loading, form, send: submit, onSuccess, updateForm, onError } = useForm(
        (payload) => ALOVA.createPosition(payload),
        {
            resetAfterSubmiting: true
        }
    );

    const onFinish = (values: Partial<Position>) => {

        const slug = slugify(values.name!);
        const payload = {
            ...values,
            slug
        }
        console.log(payload)
        submit(payload)
    }

    return (
        <>
            <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={toggle}
            >
                New Position
            </Button>
            <Modal
                title="Create a new position"
                open={isOpen}
                onCancel={toggle}
                okText="Save"
                cancelText="Cancel"
                okButtonProps={{
                    loading: loading,
                    htmlType: 'submit',
                    form: 'addNewPositionForm'
                }}
                cancelButtonProps={{
                    disabled: loading
                }}
                centered
            >
                <Form
                    onFinish={onFinish}
                    name="addNewPositionForm"
                    wrapperCol={{
                        span: 16
                    }}
                    labelCol={{
                        span: 6
                    }}
                    className="!pt-4"
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
