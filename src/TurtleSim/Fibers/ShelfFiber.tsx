import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    OrbitControls,
    Environment,
    ContactShadows,
    RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";

/**
 * Material box (1x1x1) representing stored items.
 * Stylized cardboard-like crate with subtle bevels and tape line.
 */
function MaterialBox({ position, color = "#c8964a", tapeColor = "#8b6a35" }) {
    return (
        <group position={position}>
            {/* Main crate body with bevelled edges */}
            <RoundedBox
                args={[0.95, 0.95, 0.95]}
                radius={0.03}
                smoothness={4}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial
                    color={color}
                    roughness={0.85}
                    metalness={0.05}
                />
            </RoundedBox>

            {/* Horizontal tape strip on top */}
            <mesh position={[0, 0.476, 0]} castShadow>
                <boxGeometry args={[0.96, 0.003, 0.18]} />
                <meshStandardMaterial
                    color={tapeColor}
                    roughness={0.4}
                    metalness={0.1}
                />
            </mesh>

            {/* Front label */}
            <mesh position={[0, 0, 0.476]} castShadow>
                <planeGeometry args={[0.4, 0.25]} />
                <meshStandardMaterial color="#f5f1e8" roughness={0.9} />
            </mesh>
        </group>
    );
}

/**
 * Single shelf board with rounded edges and wood-like material.
 */
function ShelfBoard({
    position,
    width,
    depth,
    thickness,
    color,
    roughness,
    metalness,
}) {
    return (
        <RoundedBox
            args={[width, thickness, depth]}
            radius={thickness * 0.25}
            smoothness={4}
            position={position}
            castShadow
            receiveShadow
        >
            <meshStandardMaterial
                color={color}
                roughness={roughness}
                metalness={metalness}
            />
        </RoundedBox>
    );
}

/**
 * Vertical support post (the metal/wood uprights at the corners).
 */
function ShelfPost({
    position,
    height,
    thickness,
    color,
    roughness,
    metalness,
}) {
    return (
        <RoundedBox
            args={[thickness, height, thickness]}
            radius={thickness * 0.3}
            smoothness={4}
            position={position}
            castShadow
            receiveShadow
        >
            <meshStandardMaterial
                color={color}
                roughness={roughness}
                metalness={metalness}
            />
        </RoundedBox>
    );
}

/**
 * Configurable shelf component.
 *
 * Props:
 *  - columns: number of horizontal slots per shelf (default 3)
 *  - rows: number of shelf levels (default 3)
 *  - depth: how many boxes deep (default 1)
 *  - boxSize: size of a single material unit (default 1)
 *  - gap: spacing between boxes (default 0.05)
 *  - fillPattern: 'full' | 'checker' | 'random' | function(col,row,depthIdx) => bool | color
 *  - boardColor / postColor: material colors
 *  - boardStyle: 'wood' | 'metal' | 'matte'
 *  - position: world position
 */
export function ConfigurableShelf({
    columns = 3,
    rows = 3,
    depth = 1,
    boxSize = 1,
    gap = 0.05,
    fillPattern = "full",
    boardColor = "#3d2817",
    postColor = "#1f1f23",
    boardStyle = "wood",
    position = [0, 0, 0],
}) {
    // Derived dimensions
    const boardThickness = boxSize * 0.06;
    const postThickness = boxSize * 0.08;
    const slotWidth = boxSize + gap;
    const slotDepth = boxSize + gap;
    const slotHeight = boxSize + gap + boardThickness;

    const totalWidth = columns * slotWidth + gap;
    const totalDepth = depth * slotDepth + gap;
    const totalHeight =
        rows * slotHeight + boardThickness + postThickness * 1.5; // base + extras

    // Board material properties by style
    const boardProps = useMemo(() => {
        switch (boardStyle) {
            case "metal":
                return { roughness: 0.35, metalness: 0.8 };
            case "matte":
                return { roughness: 0.95, metalness: 0.0 };
            case "wood":
            default:
                return { roughness: 0.75, metalness: 0.05 };
        }
    }, [boardStyle]);

    const postProps = useMemo(() => ({ roughness: 0.4, metalness: 0.7 }), []);

    // Determine if a slot should contain a box
    const shouldFill = useMemo(() => {
        if (typeof fillPattern === "function") return fillPattern;
        if (fillPattern === "full") return () => true;
        if (fillPattern === "checker")
            return (c, r, d) => (c + r + d) % 2 === 0;
        if (fillPattern === "random") {
            // Stable per-render random seed pattern
            const seed = [];
            for (let r = 0; r < rows; r++)
                for (let c = 0; c < columns; c++)
                    for (let d = 0; d < depth; d++)
                        seed.push(Math.random() > 0.35);
            return (c, r, d) => seed[r * columns * depth + c * depth + d];
        }
        return () => true;
    }, [fillPattern, rows, columns, depth]);

    // Palette of box colors for visual variety
    const boxPalette = [
        { color: "#c8964a", tape: "#8b6a35" }, // kraft
        { color: "#a85a3a", tape: "#6e3a25" }, // terracotta
        { color: "#4a6b7a", tape: "#2f4651" }, // slate blue
        { color: "#7a8a5a", tape: "#4f5a3a" }, // olive
        { color: "#b8a47e", tape: "#7a6a4f" }, // sand
        { color: "#8a4a5a", tape: "#5a2f3a" }, // mauve
    ];

    // Center the shelf so position prop sits at the base center
    const offsetX = -totalWidth / 2 + slotWidth / 2 + gap / 2;
    const offsetZ = -totalDepth / 2 + slotDepth / 2 + gap / 2;

    // Build shelf boards (one at base + one above each row)
    const boards = [];
    for (let r = 0; r <= rows; r++) {
        const y = r * slotHeight + boardThickness / 2;
        boards.push(
            <ShelfBoard
                key={`board-${r}`}
                position={[0, y, 0]}
                width={totalWidth}
                depth={totalDepth}
                thickness={boardThickness}
                color={boardColor}
                {...boardProps}
            />,
        );
    }

    // Build corner + intermediate posts
    const posts = [];
    const postPositions = [
        [
            -totalWidth / 2 + postThickness / 2,
            -totalDepth / 2 + postThickness / 2,
        ],
        [
            totalWidth / 2 - postThickness / 2,
            -totalDepth / 2 + postThickness / 2,
        ],
        [
            -totalWidth / 2 + postThickness / 2,
            totalDepth / 2 - postThickness / 2,
        ],
        [
            totalWidth / 2 - postThickness / 2,
            totalDepth / 2 - postThickness / 2,
        ],
    ];
    postPositions.forEach((p, i) => {
        posts.push(
            <ShelfPost
                key={`post-${i}`}
                position={[p[0], totalHeight / 2 - postThickness * 0.25, p[1]]}
                height={totalHeight}
                thickness={postThickness}
                color={postColor}
                {...postProps}
            />,
        );
    });

    // Decorative top caps on posts
    const caps = postPositions.map((p, i) => (
        <mesh
            key={`cap-${i}`}
            position={[p[0], totalHeight - postThickness * 0.1, p[1]]}
            castShadow
        >
            <sphereGeometry args={[postThickness * 0.55, 16, 16]} />
            <meshStandardMaterial
                color={postColor}
                roughness={0.3}
                metalness={0.85}
            />
        </mesh>
    ));

    // Build the material boxes
    const boxes = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            for (let d = 0; d < depth; d++) {
                const fill = shouldFill(c, r, d);
                if (!fill) continue;

                const x = offsetX + c * slotWidth;
                const y = r * slotHeight + boardThickness + boxSize / 2;
                const z = offsetZ + d * slotDepth;

                // Allow function-based fill to return a color
                const palette =
                    typeof fill === "string"
                        ? { color: fill, tape: fill }
                        : boxPalette[(c + r * 3 + d * 5) % boxPalette.length];

                boxes.push(
                    <MaterialBox
                        key={`box-${c}-${r}-${d}`}
                        position={[x, y, z]}
                        color={palette.color}
                        tapeColor={palette.tape}
                    />,
                );
            }
        }
    }

    // Floor pads under posts
    const pads = postPositions.map((p, i) => (
        <mesh key={`pad-${i}`} position={[p[0], 0.005, p[1]]} receiveShadow>
            <cylinderGeometry
                args={[postThickness * 0.7, postThickness * 0.8, 0.01, 16]}
            />
            <meshStandardMaterial color="#0a0a0a" roughness={0.6} />
        </mesh>
    ));

    return (
        <group position={position}>
            {pads}
            {posts}
            {caps}
            {boards}
            {boxes}
        </group>
    );
}

/**
 * Demo scene wrapping the shelf in a nicely-lit environment.
 * Drop this into your app, or import { ConfigurableShelf } directly.
 */
export default function ShelfScene() {
    return (
        <Canvas
            shadows
            camera={{ position: [6, 4, 7], fov: 40 }}
            gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
            style={{ width: "100%", height: "100vh", background: "#1a1a1f" }}
        >
            {/* Lighting */}
            <ambientLight intensity={0.25} />
            <directionalLight
                position={[5, 10, 5]}
                intensity={1.2}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-left={-8}
                shadow-camera-right={8}
                shadow-camera-top={8}
                shadow-camera-bottom={-8}
            />
            <pointLight
                position={[-5, 3, -5]}
                intensity={0.4}
                color="#ffaa66"
            />
            <pointLight position={[5, 2, -3]} intensity={0.3} color="#6699ff" />

            {/* HDRI for nice reflections */}
            <Environment preset="warehouse" />

            {/* Subtle ground */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
                receiveShadow
            >
                <planeGeometry args={[40, 40]} />
                <meshStandardMaterial
                    color="#15151a"
                    roughness={0.9}
                    metalness={0.1}
                />
            </mesh>

            <ContactShadows
                position={[0, 0.01, 0]}
                opacity={0.6}
                scale={15}
                blur={2.5}
                far={4}
            />

            {/* The shelf itself */}
            <ConfigurableShelf
                columns={4}
                rows={3}
                depth={2}
                gap={0.06}
                fillPattern="checker"
                boardColor="#3d2817"
                postColor="#1a1a1d"
                boardStyle="wood"
                position={[0, 0, 0]}
            />

            <OrbitControls
                enableDamping
                dampingFactor={0.08}
                minDistance={4}
                maxDistance={20}
                maxPolarAngle={Math.PI / 2.1}
            />
        </Canvas>
    );
}
