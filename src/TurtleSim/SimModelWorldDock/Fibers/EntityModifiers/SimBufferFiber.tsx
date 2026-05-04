import React from "react"
import {Html} from "@react-three/drei"
import {SimFiber} from "@TurtleSim/SimModelWorldDock/Fibers/EntityModifiers/SimFiber"
import {useActiveSimulation} from "@TurtleSim/SimModelWorldDock/Controllers/RunningSimulationController"

const BUFFER_CAPACITY = 100

function getOccupancy(count: number, capacity: number) {
    const pct = count / capacity
    if (pct >= 0.9) return {bg: "rgba(127,29,29,0.92)", accent: "#ef4444", glow: "#ef444466", label: "CRITICAL"}
    if (pct >= 0.7) return {bg: "rgba(120,53,15,0.92)", accent: "#f97316", glow: "#f9731666", label: "HIGH"}
    if (pct >= 0.4) return {bg: "rgba(30,58,95,0.92)", accent: "#60a5fa", glow: "#60a5fa66", label: "MODERATE"}
    return {bg: "rgba(20,83,45,0.92)", accent: "#4ade80", glow: "#4ade8066", label: "NOMINAL"}
}

export default function SimBufferFiber({entity}: SimFiber) {
    const [activeCount, setActiveCount] = React.useState(0)
    const {isRunning} = useActiveSimulation()

    if (isRunning === "") {
        return null
    }

    const capacity = BUFFER_CAPACITY
    const remaining = capacity - activeCount
    const pct = Math.round((activeCount / capacity) * 100)
    const {bg, accent, glow, label} = getOccupancy(activeCount, capacity)
    const barWidth = `${pct}%`

    return (
        <Html
            occlude
            distanceFactor={8}
            position={[0, 1.4, 0]}
            center
            style={{pointerEvents: "none"}}
        >
            <div style={{
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontSize: "11px",
                width: "160px",
                borderRadius: "5px",
                overflow: "hidden",
                border: `1px solid ${accent}55`,
                boxShadow: `0 0 10px ${glow}, 0 2px 8px rgba(0,0,0,0.6)`,
                backdropFilter: "blur(6px)",
                userSelect: "none",
                whiteSpace: "nowrap",
            }}>

                {/* Header row */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: accent,
                    padding: "2px 6px",
                }}>
                    <span style={{color: "#000", fontWeight: 800, letterSpacing: "0.08em", fontSize: "9px"}}>
                        BUFFER
                    </span>
                    <span style={{color: "#00000099", fontWeight: 700, fontSize: "9px"}}>
                        {label}
                    </span>
                </div>

                {/* Count row */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: bg,
                    padding: "4px 8px",
                }}>
                    <span style={{color: accent, fontWeight: 700, fontSize: "15px", lineHeight: 1}}>
                        {activeCount}
                        <span style={{color: "#ffffff44", fontSize: "10px", fontWeight: 400}}>/{capacity}</span>
                    </span>
                    <div style={{textAlign: "right"}}>
                        <div style={{color: "#ffffff55", fontSize: "8px", letterSpacing: "0.05em"}}>REMAINING</div>
                        <div style={{color: "#ffffffcc", fontWeight: 600}}>{remaining}</div>
                    </div>
                </div>

                {/* Progress bar */}
                <div style={{backgroundColor: "rgba(0,0,0,0.5)", height: "4px", position: "relative"}}>
                    <div style={{
                        position: "absolute",
                        left: 0, top: 0, bottom: 0,
                        width: barWidth,
                        backgroundColor: accent,
                        boxShadow: `0 0 6px ${accent}`,
                        transition: "width 0.3s ease",
                    }}/>
                </div>

                {/* Percent footer */}
                <div style={{
                    backgroundColor: "rgba(0,0,0,0.7)",
                    padding: "2px 8px",
                    color: "#ffffff33",
                    fontSize: "9px",
                    letterSpacing: "0.1em",
                    display: "flex",
                    justifyContent: "flex-end",
                }}>
                    <span style={{color: accent + "aa"}}>{pct}%</span>&nbsp;occupancy
                </div>
            </div>
        </Html>
    )
}