import {Splitter} from "antd";
import TopBarWrapper from "@Turtle/Components/TopBarWrapper";
import React from "react";


export function SplitterWithHeader({
                                       topbar, children
                                   }) {

    return (
        <div>
            <TopBarWrapper>
                {topbar}
            </TopBarWrapper>
            <Splitter style={{
                height: "100%",
                // backgroundColor: "#212124"
            }}>
                {React.Children.toArray(children)}
            </Splitter>
        </div>
    )
}