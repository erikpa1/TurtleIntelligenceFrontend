import React, {useMemo} from 'react'
import {Cylinder, Cone, Sphere} from '@react-three/drei'
import * as THREE from 'three'
import ColorConstants from "@Turtle/Constants/ColorConstants";

/**
 * CylinderBetweenPoints - Creates a cylinder between two 3D points with an arrow at the end
 *
 * @param {Object} props
 * @param {Array} props.start - Start point [x, y, z]
 * @param {Array} props.end - End point [x, y, z]
 * @param {Number} props.radius - Radius of the cylinder (default: 0.05)
 * @param {Number} props.segments - Number of radial segments (default: 16)
 * @param {Number} props.endpointDiameter - Diameter of endpoints (default: 1.7)
 * @param {Boolean} props.showArrow - Whether to show arrow at the end (default: true)
 * @param {Number} props.arrowHeight - Height of the arrow cone (default: 0.2)
 * @param {Number} props.arrowRadius - Radius of the arrow cone base (default: 0.1)
 * @param {Object} props.material - Material properties to apply to the cylinder
 * @param {Object} props.arrowMaterial - Material properties to apply to the arrow
 * @param {React.ReactNode} props.children - Additional components to render inside the group
 */

interface CylinderBetweenPointsProps {
    start: any
    end: any
    radius?: number
    segments?: number
    endpointDiameter?: number
    showArrow?: boolean
    arrowHeight?: number
    arrowRadius?: number
    children?: any
}

const _MATERIAL = <meshMatcapMaterial attach="material" color={ColorConstants.AZURE_BLUE}/>

export default function CylinderBetweenPoints({
                                                  start = [0, 0, 0],
                                                  end = [1, 1, 1],
                                                  radius = 0.025,
                                                  segments = 16,
                                                  endpointDiameter = 1.7,
                                                  showArrow = true,
                                                  arrowHeight = 0.5,
                                                  arrowRadius = 0.15,
                                                  children,
                                              }: CylinderBetweenPointsProps) {

    const HEIGHT = 0.25

    const startVec = useMemo(() => new THREE.Vector3(...start), [start])
    const endVec = useMemo(() => new THREE.Vector3(...end), [end])

    // Calculate direction vector
    const direction = useMemo(() => {
        return new THREE.Vector3().subVectors(endVec, startVec).normalize()
    }, [startVec, endVec])

    // Calculate the offset (half of the endpoint diameter)
    const offset = endpointDiameter / 2

    // Apply offset to start and end points
    const offsetStartVec = useMemo(() => {
        return new THREE.Vector3().copy(startVec).addScaledVector(direction, offset)
    }, [startVec, direction, offset])

    const offsetEndVec = useMemo(() => {
        return new THREE.Vector3().copy(endVec).addScaledVector(direction, -offset)
    }, [endVec, direction, offset])

    // If showing arrow, make the cylinder a bit shorter to accommodate the arrow
    const arrowOffset = showArrow ? arrowHeight : 0
    const adjustedEndVec = useMemo(() => {
        return new THREE.Vector3().copy(offsetEndVec).addScaledVector(direction, -arrowOffset)
    }, [offsetEndVec, direction, arrowOffset])

    // Calculate midpoint of the offset points (adjusted for arrow if needed)
    const midPoint = useMemo(() => {
        return new THREE.Vector3().addVectors(
            offsetStartVec,
            adjustedEndVec
        ).multiplyScalar(0.5)
    }, [offsetStartVec, adjustedEndVec])

    // Calculate length of the cylinder (between offset points, adjusted for arrow)
    const length = useMemo(() => {
        return offsetStartVec.distanceTo(adjustedEndVec)
    }, [offsetStartVec, adjustedEndVec])

    // Calculate rotation to align cylinder with the two points
    const quaternion = useMemo(() => {
        // Default cylinder orientation in three.js is along the Y axis
        const defaultDirection = new THREE.Vector3(0, 1, 0)

        // Get rotation quaternion
        const quaternion = new THREE.Quaternion()
        quaternion.setFromUnitVectors(defaultDirection, direction)

        return quaternion
    }, [direction])

    // Handle the y-position fix if needed (from the original code)
    // Note: This might be specific to your use case, remove if not needed
    midPoint.y = HEIGHT
    offsetStartVec.y = HEIGHT

    return (
        <>
            {/* Start sphere */}
            <Sphere
                scale={radius * 2}
                position={offsetStartVec}
            >
                {_MATERIAL}
            </Sphere>

            {/* Cylinder group */}
            <group
                position={midPoint}
                quaternion={quaternion}
            >
                {/* Main cylinder */}
                <Cylinder
                    args={[radius, radius, length, segments]}
                >
                    {_MATERIAL}
                </Cylinder>

                {/* Arrow at end */}
                {showArrow && (
                    <Cone
                        args={[arrowRadius, arrowHeight, segments, 1]}
                        position={[0, length / 2 + arrowHeight / 2, 0]}
                        rotation={[0, 0, 0]}
                    >
                        {_MATERIAL}
                    </Cone>
                )}

                {children}
            </group>

        </>
    )
}