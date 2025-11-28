import {IWidgetCategory} from "@NavBar/NavBarInterface";
import {INavBarItem} from "@Turtle/Components/NavBar";


const DOCUMENT_AUTOMATION_WIDGETS: INavBarItem[] = [
    {
        lang: "ocr.tools",
        icon: "/icons/format_shapes.svg",
        link: "/ocr-tools"
    },
    {
        lang: "ocr.pipelines",
        icon: "/icons/flowsheet.svg",
        link: "/ocr-pipelines"
    },

]


const DATA_WIDGETS: INavBarItem[] = [
    {
        lang: "invoices",
        icon: "/icons/receipt.svg",
        link: "/invoices"
    },
    {
        lang: "contracts",
        icon: "/icons/receipt.svg",
        link: "/contracts"
    },
    {
        lang: "business.subjects",
        icon: "/icons/receipt.svg",
        link: "/business-subjects"
    },
    {
        lang: "cities",
        icon: "/icons/receipt.svg",
        link: "/cities"
    },
    {
        lang: "states",
        icon: "/icons/receipt.svg",
        link: "/states"
    },

]


export const CRM_CATEGORIES: IWidgetCategory[] = [
    {
        titleKey: "data",
        items: DATA_WIDGETS
    },
    {
        titleKey: "documents.automation",
        items: DOCUMENT_AUTOMATION_WIDGETS
    },


]
