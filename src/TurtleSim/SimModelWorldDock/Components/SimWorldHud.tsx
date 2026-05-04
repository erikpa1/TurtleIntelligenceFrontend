export default function SimWorldHud() {
    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",       // lets clicks pass through to Three.js
                zIndex: 10,
                display: "grid",
                gridTemplateAreas: `
                    "top-left    top-center    top-right"
                    "mid-left    mid-center    mid-right"
                    "bot-left    bot-center    bot-right"
                `,
                gridTemplateRows: "auto 1fr auto",
                gridTemplateColumns: "auto 1fr auto",
                padding: 12,
                gap: 8,
            }}
        >
            {/* Top-left: world name / status */}
            <div style={{gridArea: "top-left", pointerEvents: "auto"}}>
                <HUDPanel>
                    <span style={{fontWeight: 600, fontSize: 13}}>XXX</span>
                    <HUDBadge color="#52c41a">Running</HUDBadge>
                </HUDPanel>
            </div>

            {/* Top-right: camera / view controls */}
            <div style={{gridArea: "top-right", pointerEvents: "auto"}}>
                <HUDPanel>
                    <HUDIconButton title="Reset camera" onClick={() => {
                    }}>⌖</HUDIconButton>
                    <HUDIconButton title="Top view" onClick={() => {
                    }}>⬆</HUDIconButton>
                    <HUDIconButton title="Front view" onClick={() => {
                    }}>◉</HUDIconButton>
                </HUDPanel>
            </div>

            {/* Bottom-left: coordinates readout */}
            <div style={{gridArea: "bot-left"}}>
                <HUDPanel mono>
                    x 0.00 &nbsp; y 0.00 &nbsp; z 0.00
                </HUDPanel>
            </div>

            {/* Bottom-right: quick stats */}
            <div style={{gridArea: "bot-right"}}>
                <HUDPanel mono>
                    FPS: 60 &nbsp;|&nbsp; Objects: 0
                </HUDPanel>
            </div>
        </div>
    )
}

function HUDPanel({children, mono = false}: {
    children: React.ReactNode
    mono?: boolean
}) {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 6,
            padding: "4px 10px",
            color: "#e8e8e8",
            fontSize: 12,
            fontFamily: mono ? "monospace" : "inherit",
            userSelect: "none",
            whiteSpace: "nowrap",
        }}>
            {children}
        </div>
    )
}

function HUDBadge({children, color}: { children: React.ReactNode, color: string }) {
    return (
        <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            color,
            fontSize: 11,
        }}>
            <span style={{
                width: 6, height: 6,
                borderRadius: "50%",
                backgroundColor: color,
                boxShadow: `0 0 4px ${color}`,
            }}/>
            {children}
        </span>
    )
}

function HUDIconButton({children, title, onClick}: {
    children: React.ReactNode
    title: string
    onClick: () => void
}) {
    return (
        <button
            title={title}
            onClick={onClick}
            style={{
                background: "none",
                border: "none",
                color: "#ccc",
                cursor: "pointer",
                fontSize: 16,
                padding: "2px 4px",
                borderRadius: 4,
                lineHeight: 1,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "#ccc")}
        >
            {children}
        </button>
    )
}