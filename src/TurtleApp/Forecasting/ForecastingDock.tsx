import React from "react"
import TopBarWrapper from "@Turtle/Components/TopBarWrapper";
import {Splitter} from "antd";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import ForecastingHierarchy from "@TurtleApp/Forecasting/ForecastingHierarchy";
import ForecastView from "@TurtleApp/Forecasting/ForecastView";

export default function ForecastingDock() {

    const {bigPadding, theme} = useTurtleTheme()


    return (
        <div>
            <TopBarWrapper>
                <div/>
            </TopBarWrapper>

            <Splitter style={{
                height: "100%",
                // backgroundColor: "#212124"
            }}>
                <Splitter.Panel
                    defaultSize="25%"
                    style={{
                        backgroundColor: "white",
                        padding: bigPadding,
                        height: theme.GetSplitterBigHeight(),

                    }}
                >
                    <ForecastingHierarchy/>
                </Splitter.Panel>

                <Splitter.Panel
                    defaultSize="75%"
                    style={{
                        position: "relative",
                        height: theme.GetSplitterBigHeight(),
                    }}
                >
                    <ForecastView/>

                </Splitter.Panel>
            </Splitter>

        </div>
    )
}