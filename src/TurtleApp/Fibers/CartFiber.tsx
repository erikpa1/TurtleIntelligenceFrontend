import PrimitiveMesh from "../../Turtle/Fibers/PrimitiveMesh";

import _WEFiberWrapper, {EntityFiberProps} from "./_WEFiberWrapper";
import ModelsGallery from "../Data/ModelsGallery";


export default function CartFiber({entity}: EntityFiberProps) {
    return (
        <_WEFiberWrapper entity={entity}>

            <PrimitiveMesh
                path={ModelsGallery.CART}
            />

        </_WEFiberWrapper>
    )
}