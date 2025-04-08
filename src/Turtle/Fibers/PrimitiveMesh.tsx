import {useGLTF} from "@react-three/drei";


interface PrimitiveMeshProps {
    path: string
}

export default function PrimitiveMesh({path}) {

    const obj: any = useGLTF(path)
    return <primitive position={[9, 3 ,5]} object={obj.scene.clone(true)}/>
}