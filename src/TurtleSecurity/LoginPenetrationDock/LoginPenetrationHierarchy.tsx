import DynamicHierarchy from "@Turtle/DynamicModules/DynamicHierarchy";
import City from "@TurtleCrm/Cities/City";
import React from "react";
import LoginPenetrationApi from "@TurtleSecurity/LoginPenetrationDock/LoginPenetrationApi";
import COULoginPenetration from "@TurtleSecurity/LoginPenetrationDock/COULoginPenetration";


export default function LoginPenetrationHierarchy({}) {
    return <DynamicHierarchy<City> api={LoginPenetrationApi} cou={COULoginPenetration}/>
}
