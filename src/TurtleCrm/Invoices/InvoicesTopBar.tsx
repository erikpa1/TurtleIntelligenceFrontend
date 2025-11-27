import {Segmented} from "antd";
import {useTranslation} from "react-i18next";
import {HierarchyRightFlex} from "@Turtle/Components/HierarchyComponents";


export default function InvoicesTopBar() {
    return (
        <>
            <_InvoiceTypeSegmentation/>

            <HierarchyRightFlex>
                <div/>
            </HierarchyRightFlex>
        </>
    )
}

function _InvoiceTypeSegmentation({}) {

    const [t] = useTranslation()

    return (
        <Segmented
            options={[
                {value: 0, label: t("all")},
                {value: 1, label: t("new")},
                {value: 3, label: t("registered")},
                {value: 4, label: t("paid")},
            ]}
        />
    )
}