import {Flex, Select} from "antd";


export default function TableDataHierarchy() {
    return (
        <Flex vertical>

            <Select>
                <Select.Option value="1">
                    My table 1
                </Select.Option>

                <Select.Option value="2">
                    My table 2
                </Select.Option>
            </Select>


        </Flex>
    )
}