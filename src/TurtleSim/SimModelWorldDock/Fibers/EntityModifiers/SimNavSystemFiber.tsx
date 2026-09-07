import React from "react";
import * as THREE from "three";
import {Line, Sphere} from "@react-three/drei";
import {SimFiber} from "@TurtleSim/SimModelWorldDock/Fibers/EntityModifiers/SimFiber";
import aee from "@Turtle/Data/Aee";

const CORNER_SEGMENTS = 12;

function toLocalPoints(entity: SimFiber["entity"]): THREE.Vector3[] {
    const rawPoints = ((entity.typeData as any).points ?? []) as number[][];
    const [ox, oy, oz] = entity.position;
    return rawPoints.map(([x, y, z]) => new THREE.Vector3(x - ox, y - oy, z - oz));
}

function buildRoundedPath(points: THREE.Vector3[], rounding: number): THREE.Vector3[] {
    if (points.length < 3 || !rounding || rounding <= 0) {
        return points;
    }

    const result: THREE.Vector3[] = [points[0]];

    for (let i = 1; i < points.length - 1; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const next = points[i + 1];

        const toPrev = prev.clone().sub(curr);
        const toNext = next.clone().sub(curr);

        const legIn = Math.min(rounding, toPrev.length() / 2);
        const legOut = Math.min(rounding, toNext.length() / 2);

        const cornerStart = curr.clone().add(toPrev.normalize().multiplyScalar(legIn));
        const cornerEnd = curr.clone().add(toNext.normalize().multiplyScalar(legOut));

        const curve = new THREE.QuadraticBezierCurve3(cornerStart, curr, cornerEnd);

        result.push(cornerStart, ...curve.getPoints(CORNER_SEGMENTS).slice(1, -1), cornerEnd);
    }

    result.push(points[points.length - 1]);
    return result;
}

export default function SimNavSystemFiber({entity}: SimFiber) {
    const [, setVersion] = React.useState(0);

    React.useEffect(() => {
        function refresh() {
            setVersion((v) => v + 1);
        }

        aee.on("WorldEntitiesChanged", refresh);
        return () => {
            aee.off("WorldEntitiesChanged", refresh);
        };
    }, []);

    const localPoints = toLocalPoints(entity);
    const rounding = (entity.typeData as any).rounding ?? 0;

    const pathPoints = React.useMemo(() => {
        return buildRoundedPath(localPoints, rounding);
    }, [entity, JSON.stringify((entity.typeData as any).points), rounding]);

    return (
        <group>
            {
                pathPoints.length >= 2 && (
                    <Line
                        points={pathPoints}
                        color={"#3aa0ff"}
                        lineWidth={3}
                    />
                )
            }

            {
                localPoints.map((point, index) => (
                    <Sphere
                        key={index}
                        args={[0.08, 12, 12]}
                        position={point}
                    >
                        <meshStandardMaterial color={"#3aa0ff"}/>
                    </Sphere>
                ))
            }
        </group>
    );
}
