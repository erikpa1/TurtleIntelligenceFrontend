import {INavBarItem} from "@Turtle/Components/NavBar";
import {IWidgetCategory} from "@NavBar/NavBarInterface";


const AI_WIDGETS: INavBarItem[] = [
    {
        lang: "neuralnetworks",
        icon: "/icons/network_intel_node.svg",
        link: "/nn"
    },
    {
        lang: "llm.models",
        icon: "/icons/ollama.svg",
        link: "/llms"
    },
    {
        lang: "agents",
        icon: "/icons/robot_2.svg",
        link: "/agents"
    },
    {
        lang: "agents-tools",
        icon: "/icons/robot_2.svg",
        link: "/agents-tools"
    }
]


const DATA_WIDGETS: INavBarItem[] = [
    {
        lang: "functions",
        icon: "/icons/function.svg",
        link: "/functions"
    },
    {
        lang: "containers",
        icon: "/icons/inventory_2.svg",
        link: "/containers"
    },
    {
        lang: "actors",
        icon: "/icons/support_agent.svg",
        link: "/actors"
    },
    {
        lang: "resources",
        icon: "/icons/support_agent.svg",
        link: "/resources"
    },
    {
        lang: "flows",
        icon: "/icons/flowsheet.svg",
        link: "/flows"
    },
    {
        lang: "tables",
        icon: "/icons/flowsheet.svg",
        link: "/tables"
    },
    {
        lang: "table.data",
        icon: "/icons/flowsheet.svg",
        link: "/table-data"
    },
    {
        lang: "forecasting",
        icon: "/icons/flowsheet.svg",
        link: "/forecasting"
    },
    {
        lang: "users",
        icon: "/icons/user.svg",
        link: "/users"
    }
]

const THREED_WIDGETS: INavBarItem[] = [
    {
        lang: "scenes",
        icon: "/icons/article.svg",
        link: "/scenes"
    }
]

const OTHER_WIDGETS: INavBarItem[] = [
    {
        lang: "documentation",
        icon: "/icons/article.svg",
        link: "/documentation"
    },
    {
        lang: "llm.clusters",
        icon: "/icons/graph_3.svg",
        link: "/llm-clusters"
    },
    {
        lang: "agents.incidents",
        icon: "/icons/graph_3.svg",
        link: "/agents-incidents"
    },

]

const USERSCHAT_WIDGETS: INavBarItem[] = [
    {
        lang: "userschat",
        icon: "/icons/graph_3.svg",
        link: "/users-chat"
    },
]

const UTILS_WIDGETS: INavBarItem[] = [
    {
        lang: "themes",
        icon: "/icons/graph_3.svg",
        link: "/themes"
    },
    {
        lang: "icons",
        icon: "/icons/graph_3.svg",
        link: "/icons"
    }
]

const AOF_WIDGETS: INavBarItem[] = [
    {
        lang: "factories",
        icon: "/icons/article.svg",
        link: "/aof-factories"
    },
    {
        lang: "devices",
        icon: "/icons/article.svg",
        link: "/devices"
    }
]


export const BASIC_CATEGORIES: IWidgetCategory[] = [
    {
        titleKey: "AI",
        items: AI_WIDGETS
    },
    {
        titleKey: "data",
        items: DATA_WIDGETS
    },

    {
        titleKey: "3D",
        items: THREED_WIDGETS
    },
    {
        titleKey: "other",
        items: OTHER_WIDGETS
    },
    {
        titleKey: "aof",
        items: AOF_WIDGETS
    },
    {
        titleKey: "utils",
        items: UTILS_WIDGETS
    },
    {
        titleKey: "usersChat",
        items: USERSCHAT_WIDGETS
    }
]

