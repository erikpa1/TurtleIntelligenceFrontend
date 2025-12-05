import React from "react"
import {COUEntityView} from "@Turtle/Interfaces/ICOUView";
import KnowledgeRelation from "@Turtle/KnowledgeHub/Data/KnowledgeRelation";
import {Flex, Form, Select} from "antd";
import UidAttributeView from "@Turtle/Components/Forms/UidAttributeView";
import {Knowledge} from "@Turtle/KnowledgeHub/Data/Knowledge";
import {LoadingOrError, useIsLoading} from "@Turtle/Utils/isLoading";
import KnowledgeApi from "@Turtle/KnowledgeHub/Api/KnowledgeApi"
import {COUSubmitButton} from "@Turtle/Utils/Cou"
import KhRelationsApi from "@Turtle/KnowledgeHub/Api/KhRelationsApi"
import {BoolAttributeView} from "@Turtle/Components/Forms/BoolPropertyView";


export default function COUKhRelation(props: COUEntityView<KnowledgeRelation>) {

    const relation = props.entity

    const [isLoading, load] = useIsLoading()

    const [knowledges, setKnowledges] = React.useState<Knowledge[]>([])

    async function refresh() {
        load(async () => {
            setKnowledges(await KnowledgeApi.List())
        })
    }

    React.useEffect(() => {
        refresh()
    }, [])

    if (isLoading.IsDoingSomething()) {
        return (
            <LoadingOrError status={isLoading}/>
        )
    } else {
        return (
            <Form layout={"vertical"}>
                <Flex vertical>

                    <UidAttributeView
                        entity={relation}
                        attribute={"uid"}
                    />

                    <Form.Item
                        label={"A"}
                    >
                        <Select
                            defaultValue={relation.a}
                            disabled={true}
                        >
                            <Select.Option>
                                {""}
                            </Select.Option>

                            {
                                knowledges.map((val) => {
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

                    <Form.Item
                        label={"relation.type"}
                    >
                        <Select
                            defaultValue={relation.relationType}
                            onChange={(val) => {
                                relation.relationType = Number(val)
                            }}
                        >
                            <Select.Option key={"0"} value={"0"}>{"include"}</Select.Option>
                            <Select.Option key={"1"} value={"1"}>{"exclude"}</Select.Option>
                            <Select.Option key={"2"} value={"2"}>{"prohibits"}</Select.Option>
                            <Select.Option key={"3"} value={"3"}>{"supports"}</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label={"B"}
                    >
                        <Select
                            defaultValue={relation.b}
                            onChange={(newVal) => {
                                relation.b = newVal
                            }}
                        >
                            <Select.Option key={""} value={""}>
                                {""}
                            </Select.Option>

                            {
                                knowledges.map((val) => {
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

                    <BoolAttributeView
                        entity={props.entity}
                        attribute={"bidirect"}
                    />


                    <COUSubmitButton
                        api={KhRelationsApi}
                        props={props}
                    />

                </Flex>


            </Form>
        )
    }


}