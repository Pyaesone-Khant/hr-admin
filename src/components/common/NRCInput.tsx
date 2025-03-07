import { NRC_DATA, NRC_TYPES } from "@/constants";
import { Form, FormInstance, Input, Select } from "antd";
import { useState } from "react";

export function NRCInput({ form }: { form: FormInstance }) {

    const [nrcCode, setNRCCode] = useState<string>('');
    const [townships, setTownships] = useState<string[]>([]);

    const onNRCCodeChange = (code: string) => {
        const townships = NRC_DATA.filter((nrc) => nrc.nrc_code === code).map((nrc) => nrc.name_en)
        setNRCCode(code);
        setTownships(townships);
        form.setFieldValue(["nrc", "township"], townships[0]);
    }

    return (
        <div
            className="items-center gap-4 col-span-2 grid grid-cols-8"
        >
            <Form.Item
                label="NRC"
                name={["nrc", "nrc_code"]}
                rules={[{ required: true, message: "Required!" }]}
            >
                <Select
                    options={
                        Array(14).fill(0).map((_, index) => ({
                            value: (index + 1).toString(),
                            label: index + 1
                        }))
                    }
                    placeholder="NRC Code"
                    value={nrcCode}
                    onChange={onNRCCodeChange}
                />
            </Form.Item>
            <Form.Item
                label=" "
                name={["nrc", "slash"]}
                required={false}
                initialValue={'/'}
            >
                <Input
                    readOnly
                    className="text-center"
                />
            </Form.Item>
            <Form.Item
                label=" "
                name={["nrc", "township"]}
                required={false}
                rules={[{ required: true, message: "Required!" }]}
                className="col-span-2"
                initialValue={townships[0]}
            >
                <Select
                    options={townships.map((ts) => ({
                        value: ts.toString(),
                        label: ts
                    }))}
                    placeholder="Township"
                />
            </Form.Item>
            <Form.Item
                label=" "
                name={["nrc", "nrc_type"]}
                required={false}
                rules={[{ required: true, message: "Required!" }]}
                initialValue={NRC_TYPES[0]}
            >
                <Select
                    options={NRC_TYPES.map((type) => ({
                        value: type,
                        label: type
                    }))}
                    placeholder="NRC Type"
                />
            </Form.Item>
            <Form.Item
                label=" "
                name={["nrc", "nrc_number"]}
                required={false}
                rules={[
                    { required: true, message: "Required!" },
                    { pattern: /^(?!000000)\d{6}$/, message: "Invalid NRC Number!" }
                ]}
                className="col-span-3"
            >
                <Input
                    placeholder="NRC Number"
                    inputMode="numeric"
                />
            </Form.Item>
        </div >
    )
}
