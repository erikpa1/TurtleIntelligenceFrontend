import StorageFiber from "../../Fibers/StorageFiber";
import {Box, TransformControls} from "@react-three/drei";
import CartFiber from "../../Fibers/CartFiber";
import WorkerFiber from "../../Fibers/WorkerFiber";
import React from "react";
import Entity from "../../../Turtle/Data/Entity";


export default function WorldEntitiesFiber({}) {


    const storage = new Entity()
    storage.position = [0, 0, 5]

    const cart = new Entity()
    cart.position = [0, 0, 4]

    const farmer = new Entity()
    farmer.position = [7, 0, 0]

    return (
        <group>
            <StorageFiber entity={storage}/>

            <Box name={"MyBox"}/>

            {/*<TransformControls object={boxRef} mode="translate"/>*/}
            {/*<mesh ref={boxRef}/>*/}


            <CartFiber entity={cart}/>
            <WorkerFiber entity={farmer}/>

        </group>
    )

}