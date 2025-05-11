import {Modal, ModalFuncProps} from "antd";
import React from "react"
import {useTranslation} from "react-i18next";


export function useTurtleModal() {

    const [t] = useTranslation()

    const guard: any = React.useMemo(() => ({current: null}), [])

    function activate(props: ModalFuncProps) {
        guard.current = Modal.info({
            ...props,
            title: t(props.title as any ?? ""),
            icon: props.icon ?? null,
            footer: null,
            closable: true
        })
    }

    function deactivate() {
        guard.current.destroy()
    }

    return {activate, deactivate}


}