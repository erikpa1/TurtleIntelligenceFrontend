import DynamicHierarchy from "@Turtle/DynamicModules/DynamicHierarchy";
import React from "react";
import CitiesApi from "@TurtleCrm/Cities/CitiesApi";
import COUCity from "@TurtleCrm/Cities/COUCity";
import City from "@TurtleCrm/Cities/City";


export default function CitiesHierarchy() {
    return <DynamicHierarchy<City> api={CitiesApi} cou={COUCity}/>
}