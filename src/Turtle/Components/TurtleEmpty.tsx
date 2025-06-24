//https://claude.ai/chat/ed59e98f-2c4f-4127-9ada-c18ff22095f1


import {useTranslation} from "react-i18next";
import {Empty} from "antd";

export default function TurtleEmpty() {

    const [t] = useTranslation()

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px' // or desired height
        }}>
            <Empty description={t("no.data")}/>
        </div>
    )
}