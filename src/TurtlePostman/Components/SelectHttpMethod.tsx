import {Form, Select} from "antd";
import {useTranslation} from "react-i18next";

interface SelectHttpMethodProps {
    defaultMethod: string
    onChanged: (newValue: string) => void
}

export default function SelectHttpMethod({
                                             defaultMethod,
                                             onChanged
                                         }: SelectHttpMethodProps) {

    const [t] = useTranslation()

    return (
        <Form.Item label={`${"method"}:`}>
            <Select
                defaultValue={defaultMethod}
                onChange={(value: string) => {
                    onChanged(value)
                }}
            >
                <Select.Option value={"GET"}>GET</Select.Option>
                <Select.Option value={"POST"}>POST</Select.Option>
                <Select.Option value={"PUT"}>PUT</Select.Option>
                <Select.Option value={"DELETE"}>DELETE</Select.Option>
            </Select>
        </Form.Item>
    )
}