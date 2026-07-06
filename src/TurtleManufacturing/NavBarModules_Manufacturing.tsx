import {IWidgetCategory} from "@NavBar/NavBarInterface"
import {INavBarItem} from "@Turtle/Components/NavBar"

const INVENTORY_WIDGETS: INavBarItem[] = [
    {
        lang: "inventory.materials",
        icon: "/icons/warehouse.svg",
        link: "/inventory",
    },
]

const MANUFACTURING_WIDGETS: INavBarItem[] = [
    {
        lang: "manufacturing.bom",
        icon: "/icons/manufacturing.svg",
        link: "/manufacturing/bom",
    },
    {
        lang: "manufacturing.routings",
        icon: "/icons/flowsheet.svg",
        link: "/manufacturing/routings",
    },
    {
        lang: "manufacturing.workcenters",
        icon: "/icons/factory.svg",
        link: "/manufacturing/work-centers",
    },
]

const PLANNING_WIDGETS: INavBarItem[] = [
    {
        lang: "manufacturing.demand",
        icon: "/icons/receipt.svg",
        link: "/manufacturing/demand",
    },
    {
        lang: "manufacturing.mrp",
        icon: "/icons/inventory_2.svg",
        link: "/manufacturing/mrp",
    },
    {
        lang: "manufacturing.aps",
        icon: "/icons/flowsheet.svg",
        link: "/manufacturing/aps",
    },
]

export const MANUFACTURING_CATEGORIES: IWidgetCategory[] = [
    {
        titleKey: "inventory",
        items: INVENTORY_WIDGETS,
    },
    {
        titleKey: "manufacturing",
        items: MANUFACTURING_WIDGETS,
    },
    {
        titleKey: "advanced.planning",
        items: PLANNING_WIDGETS,
    },
]
