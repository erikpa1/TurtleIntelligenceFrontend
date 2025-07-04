import {ConfigProvider, Modal, ModalFuncProps} from "antd";
import React from "react"
import {useTranslation} from "react-i18next";
import ErrorBoundary from "@Turtle/Components/ErrorBoundary";
import {TurtleTheme} from "../../mainTheme";


export function useTurtleModal() {

    const [t] = useTranslation()

    const guard: any = React.useMemo(() => ({current: null}), [])

    function activate({
                          content,
                          ...props
                      }: ModalFuncProps) {



        guard.current = Modal.info({
            ...props,
            title: t(props.title as any ?? ""),
            icon: props.icon ?? null,
            footer: null,
            closable: true,
            content: (
                <ConfigProvider
                    theme={TurtleTheme}>
                    <ErrorBoundary>
                        {content}
                    </ErrorBoundary>
                </ConfigProvider>


            )


        })
    }

    function deactivate() {
        guard.current.destroy()
    }

    return {activate, deactivate}


}