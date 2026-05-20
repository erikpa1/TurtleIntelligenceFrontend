import TurtleColors from "@Turtle/Constants/TurtleColors";
import ABCircle from "@TurtleBlueprints/Edit/Nodes/ABCircle";
import React from "react";


export default class NodeTypeData {


    GetConnectionType(conn: string): string | undefined {
        return undefined
    }

    ToJson(): any {
        return {}
    }

    FromJson(jObj: any) {

    }
}

export class EmptyTypeData extends NodeTypeData {
    ToJson(): any {
        return {}
    }

    FromJson(jObj: any) {

    }
}