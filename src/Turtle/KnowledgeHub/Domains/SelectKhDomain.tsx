import {Form, Select} from "antd";
import React, {useState} from "react";
import KhDomain from "@Turtle/KnowledgeHub/Data/Domains";
import {TurtleSkeleton} from "@Turtle/Components/TurtleSkeleton";
import KhDomainApi from "@Turtle/KnowledgeHub/Api/KhDomainApi";
import {useTranslation} from "react-i18next";

interface SelectDomainProps {
    domain: string
    onDomainChange: (domain: string) => void
}

export default function SelectKhDomain({
                                           domain,
                                           onDomainChange
                                       }: SelectDomainProps) {

    const [t] = useTranslation()

    const [isLoading, setIsLoading] = React.useState(true)

    const [domains, setDomains] = useState<KhDomain[]>([])

    async function refresh() {
        setIsLoading(true)
        setDomains(await KhDomainApi.List())
        setIsLoading(false)
    }

    React.useEffect(() => {
        refresh()
    }, [])

    if (isLoading) {
        return (
            <TurtleSkeleton/>
        )
    } else {

        return (
            <Form.Item label={`${t("domain")}:`}>
                <Select
                    defaultValue={domain}
                    onChange={onDomainChange}
                >
                    <Select.Option value={""}>{""}</Select.Option>

                    {
                        domains.map((val) => {
                            return (
                                <Select.Option
                                    key={val.uid}
                                    value={val.uid}
                                >
                                    {val.name}
                                </Select.Option>
                            )
                        })
                    }

                </Select>
            </Form.Item>
        )

    }

}
