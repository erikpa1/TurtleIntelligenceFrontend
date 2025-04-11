import React from "react";
import {Button} from "antd";
import WorldApi from "../Api/WorldApi";


export default function TopBarControlView() {
    return (
        <div className={"hstack gap-3"}>
            <Button
                style={{
                    height: "20px"
                }}
                variant={"text"}
            >
                Projects
            </Button>


            <_PlayButton/>

        </div>
    )
}

function _PlayButton({}) {

    async function simulate() {
        await WorldApi.Simulate("")
    }


    return (
        <Button
            onClick={simulate}
            style={{
                height: "20px"
            }}
            variant={"text"}
        >
            Play
        </Button>
    )
}