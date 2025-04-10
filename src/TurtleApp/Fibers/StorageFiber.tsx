import PrimitiveMesh from "../../Turtle/Fibers/PrimitiveMesh";
import {Cylinder} from "@react-three/drei";
import WEFiberWrapper, {EntityFiberProps} from "./WEFiberWrapper";
import ModelsGallery from "../Data/ModelsGallery";


export default function StorageFiber({entity}: EntityFiberProps) {
    return (
        <WEFiberWrapper entity={entity}>


            <PrimitiveMesh
                path={ModelsGallery.STORAGE}
            />

            <group
                scale={[0.3, 0.8, 0.3]}
            >
                <Cylinder
                    position={[0, 0.5, 0]}
                >
                    <meshStandardMaterial color={"red"}/>
                </Cylinder>
            </group>

        </WEFiberWrapper>
    )
}