import {IWidgetCategory} from "@NavBar/NavBarInterface"
import {INavBarItem} from "@Turtle/Components/NavBar"

const PENETRATIVE_TESTING_WIDGETS: INavBarItem[] = [
    {
        lang: "login.attack",
        icon: "/icons/format_shapes.svg",
        link: "/pentesting-login"
    }
]

export const SECURITY_CATEGORIES: IWidgetCategory[] = [
    {
        titleKey: "penetrative.testing",
        items: PENETRATIVE_TESTING_WIDGETS
    }
]
