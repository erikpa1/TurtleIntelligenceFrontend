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
]
