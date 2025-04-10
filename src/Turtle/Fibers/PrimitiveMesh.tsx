import {useGLTF} from "@react-three/drei";


interface PrimitiveMeshProps {
    path: string
}

export default function PrimitiveMesh({path}) {

    const obj: any = useGLTF(path)
    return <primitive object={obj.scene.clone(true)}/>
}