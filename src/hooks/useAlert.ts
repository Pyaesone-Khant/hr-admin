import { message } from "antd"
import { useEffect } from "react"

type AlertProps = {
    success: boolean,
    error: object,
    successMessage: string,
}

export function useAlert({
    success,
    error,
    successMessage,
}: AlertProps) {

    useEffect(() => {
        if (success && successMessage) {
            message.success(successMessage)
        }

        if (error && "message" in error) {
            message.error((error as { message: string }).message)
        }
    }, [successMessage, error, success])

    return null;
}
