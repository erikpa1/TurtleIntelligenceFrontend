import {Form, Select} from "antd";
import {ListUserTypes} from "@Turtle/Users/User";
import React from "react";
import {XApiKey} from "@Turtle/XApiKey/XApiKey";
import XApiKeyApi from "@Turtle/XApiKey/XApiKeyApi";


export default function XApiKeySelect({
                                          entity,
                                          itemKey
                                      }) {

    const [keys, setKeys] = React.useState<Array<XApiKey>>([])

    async function refresh() {
        setKeys(await XApiKeyApi.ListKeys())
    }

    React.useEffect(() => {

    }, [])

    return (
        <Form.Item
            label={"XApiKey:"}
        >
            <Select
                defaultValue={entity[itemKey]}
                onChange={(value) => {
                    entity[itemKey] = value
                }}
            >
                <Select.Option
                    key={""}
                    value={""}
                >
                    {""}
                </Select.Option>
                {
                    keys.map((entity) => {
                        return (
                            <Select.Option
                                key={entity.uid}
                                value={entity.uid}
                            >
                                {entity.name}
                            </Select.Option>
                        )
                    })
                }

            </Select>
        </Form.Item>
    )
}