import PrimitiveMesh from "../../Turtle/Fibers/PrimitiveMesh";

import _WEFiberWrapper, {EntityFiberProps} from "./_WEFiberWrapper";
import ModelsGallery from "../Data/ModelsGallery";


export default function WorkerFiber({entity}: EntityFiberProps) {
    return (
        <_WEFiberWrapper entity={entity}>

            <PrimitiveMesh
                path={ModelsGallery.MINION}
            />

        </_WEFiberWrapper>
    )
}