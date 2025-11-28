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
    }, {
        lang: "business.subjects",
        icon: "/icons/receipt.svg",
        link: "/business-subjects"
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
