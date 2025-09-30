import React from 'react'
import {Flex, Form, Select} from "antd";
import {Forecast} from "@TurtleApp/Forecasting/Forecast";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import TurtleApp from "@TurtleApp/TurtleApp";
import ForecastApi, {ForecastingMethod} from "@TurtleApp/Forecasting/ForecastsApi";
import {useTranslation} from "react-i18next";

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

    const [t] = useTranslation()

    const [fcMethods, setFcMethods] = React.useState<Array<ForecastingMethod>>([])


    async function submit() {
        onBeforeSubmit && onBeforeSubmit()
        TurtleApp.Lock()
        await ForecastApi.COU(forecast)
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
                    entity={forecast}
                    attribute={"name"}
                />

                <Form.Item label={`${t("type")}:`}>
                    <Select
                        defaultValue={`${forecast.type}`}
                        onChange={(val) => {
                            forecast.type = Number(val)
                        }}
                    >
                        {
                            fcMethods.map((val) => {
                                return (
                                    <Select.Option
                                        disabled={!val.enabled}
                                        value={`${val.type}`}>
                                        {t(val.name)}
                                    </Select.Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>


                <RightSubmitButton onClick={submit}/>
            </Flex>
        </Form>

    )
}