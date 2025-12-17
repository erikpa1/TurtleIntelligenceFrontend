import {Select} from "antd";

interface SelectHttpMethodProps {
    defaultMethod: string
    onChanged: (newValue: string) => void
}

export default function SelectHttpMethod({
                                             defaultMethod,
                                             onChanged
                                         }: SelectHttpMethodProps) {
    return (
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
    )
}