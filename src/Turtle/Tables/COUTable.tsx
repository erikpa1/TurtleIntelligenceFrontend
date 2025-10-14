import React from 'react'
import {Flex, Form, Select} from "antd";

import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import TurtleApp from "@TurtleApp/TurtleApp";
import ForecastApi, {ForecastingMethod} from "@TurtleApp/Forecasting/ForecastsApi";
import {useTranslation} from "react-i18next";
import TablesApi from "@Turtle/Tables/TablesApi";
import {TurtleTable} from "@Turtle/Tables/Table";
import TableConfigEditor from "@Turtle/Tables/TableConfigAttributeView";
import {BoolAttributeView} from "@Turtle/Components/Forms/BoolPropertyView";

interface _COUTableProps {
    table: TurtleTable
    onBeforeSubmit?: () => void
    onAfterSubmit?: () => void
}


export default function COUTable({
                                     table,
                                     onBeforeSubmit,
                                     onAfterSubmit,
                                 }: _COUTableProps) {

    const [t] = useTranslation()

    const [fcMethods, setFcMethods] = React.useState<Array<ForecastingMethod>>([])


    async function submit() {
        onBeforeSubmit && onBeforeSubmit()
        TurtleApp.Lock()
        await TablesApi.COU(table)
        TurtleApp.Unlock()
        onAfterSubmit && onAfterSubmit()
    }

    async function refresh() {
        setFcMethods(await ForecastApi.ListForecastingMethods())
    }

    React.useEffect(() => {
        refresh()
    }, [])

    return (
        <Form layout={"vertical"}>
            <Flex vertical>

                <StringAttributeView
                    entity={table}
                    attribute={"name"}
                />

                <BoolAttributeView
                    entity={table}
                    attribute={"hasDatabaseTable"}
                />

                <TableConfigEditor entity={table}/>

                <RightSubmitButton onClick={submit}/>
            </Flex>
        </Form>

    )
}