import {Form, FormProps} from "antd";
import React from "react";


export function HorizontalForm(props: FormProps) {

    return React.createElement(Form, {
        layout: "horizontal",
        labelCol: {span: 10},
        wrapperCol: {span: 15},
        ...props as any
    })

}

export function VerticalForm(props: FormProps) {

    return React.createElement(Form, {
        layout: "vertical",
        ...props as any
    })

}