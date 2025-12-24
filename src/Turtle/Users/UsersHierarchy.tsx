import React from "react"
import DynamicHierarchy from "@Turtle/DynamicModules/DynamicHierarchy"


import UsersApi from "@Turtle/Users/UsersApi"
import {User} from "@Turtle/Users/User"
import COUUser from "@Turtle/Users/COUUser"


export default function UsersHierarchy() {
    return <DynamicHierarchy<User> api={UsersApi} cou={COUUser}/>
}