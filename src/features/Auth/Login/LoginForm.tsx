import { ALOVA, alovaInstance } from "@/services/alova";
import { setApiToken } from "@/services/api";
import { getJwtToken } from "@/services/getJwtToken";
import { useNotificationStore } from "@/states/zustand/notification";
import { useUserStore } from "@/states/zustand/user";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";

type LoginFormValues = {
    email: string;
    password: string;
}

export function LoginForm() {


    const [form] = Form.useForm<LoginFormValues>();
    const [loading, setLoading] = useState(false);

    const nav = useNavigate();

    const onFinish = async (values: LoginFormValues) => {
        setLoading(true);
        try {
            await ALOVA.login(values)
                .then((jwt) => {
                    setApiToken({
                        apiInstance: alovaInstance,
                        token: jwt.accessToken,
                    });

                    getJwtToken().setJwtToken(jwt);
                    useUserStore.getState().setJwt(jwt);

                    useNotificationStore.getState().setNotification({
                        message: "Login Successful",
                        type: "success",
                    });

                    nav("/", {
                        replace: true
                    })
                })
                .catch((err) => {
                    useNotificationStore.getState().setNotification({
                        type: "error",
                        message: err?.message || "Login Failed",
                    });
                })
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form
            layout="vertical"
            onFinish={onFinish}
            form={form}
            initialValues={{
                email: "superadmin123@gmail.com",
                password: "superadmin123"
            }}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        type: "email",
                        required: true,
                        message: "Invalid Email!"

                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Required!"
                    }
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Button
                htmlType="submit"
                type="primary"
                block
                loading={loading}
            >
                Login
            </Button>
        </Form >
    )
}
