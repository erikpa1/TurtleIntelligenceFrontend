import React from 'react'
import {Flex, Form} from "antd";
import {Forecast} from "@TurtleApp/Forecasting/Forecast";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import TurtleApp from "@TurtleApp/TurtleApp";
import ForecastApi from "@TurtleApp/Forecasting/ForecastsApi";

interface _COUForecastProps {
    forecast: Forecast
    onBeforeSubmit?: () => void
    onAfterSubmit?: () => void
}

export default function COUForecast({

                                        forecast,
                                        onBeforeSubmit,
                                        onAfterSubmit,
                                    }: _COUForecastProps) {

    async function submit() {
        onBeforeSubmit && onBeforeSubmit()
        TurtleApp.Lock()
        await ForecastApi.COU(forecast)
        TurtleApp.Unlock()
        onAfterSubmit && onAfterSubmit()
    }

    return (
        <Form layout={"vertical"}>
            <Flex vertical gap={15}>

                <StringAttributeView
                    entity={forecast}
                    attribute={"name"}
                />

                <RightSubmitButton onClick={submit}/>
            </Flex>
        </Form>

    )
}