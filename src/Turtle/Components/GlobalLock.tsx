// Created in https://claude.ai/chat/5869daf3-b3e1-4310-9d0c-52d2eb5dd971
import {create} from "zustand";
import React from "react";
import {useTranslation} from "react-i18next";
import ColorConstants from "@Turtle/Constants/ColorConstants";


interface IGlobalLock {
    isLocked: boolean
    lock: () => void
    unlock: () => void
}

export const useGlobalLock = create<IGlobalLock>((set) => ({
    isLocked: false,
    lock: () => set(() => ({isLocked: true})),
    unlock: () => set(() => ({isLocked: false})),
}))

export function GlobalLock() {
    const [t] = useTranslation();
    const {isLocked} = useGlobalLock();
    const [visible, setVisible] = React.useState(isLocked);

    React.useEffect(() => {
        if (isLocked) setVisible(true);
        else {
            const timer = setTimeout(() => setVisible(false), 400);
            return () => clearTimeout(timer);
        }
    }, [isLocked]);

    if (!visible) return null;

    return (
        <div style={{
            position: "fixed", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            backgroundColor: "rgba(6, 154, 243, 0.12)",
            zIndex: 9999,
            opacity: isLocked ? 1 : 0,
            transition: "opacity 0.4s ease",
        }}>

            <div style={{
                position: "absolute", inset: 0,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='64'%3E%3Cpolygon points='28,2 54,16 54,48 28,62 2,48 2,16' fill='none' stroke='%23069AF3' stroke-width='1'/%3E%3C/svg%3E")`,
                backgroundSize: "56px 64px",
                opacity: 0.07,
            }}/>

            <div style={{position: "relative", width: 72, height: 72}}>
                <SpinRing size={72} duration="2.4s" color={ColorConstants.AZURE_BLUE}
                          colorFaint={`${ColorConstants.AZURE_BLUE}33`}/>
                <SpinRing size={52} duration="1.6s" color={ColorConstants.AZURE_BLUE_HOVER}
                          colorFaint={ColorConstants.AZURE_BLUE_HOVER} reverse/>
                <SpinRing size={28} duration="1s" color={`${ColorConstants.AZURE_BLUE}99`} colorFaint="transparent"/>
                <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 10, height: 10, borderRadius: "50%",
                    background: ColorConstants.AZURE_BLUE,
                    animation: "ti-pulse 2s ease-in-out infinite",
                    willChange: "transform",
                }}/>
            </div>

            <div style={{
                marginTop: 22,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300, fontSize: 15,
                color: ColorConstants.AZURE_BLUE_HOVER, letterSpacing: "0.05em",
                animation: "ti-fade 2.8s ease-in-out infinite",
            }}>
                {t("wait")}…
            </div>

            <style>{`
        @keyframes ti-spin-cw  { to { transform: rotate(360deg);  } }
        @keyframes ti-spin-ccw { to { transform: rotate(-360deg); } }
        @keyframes ti-pulse { 0%,100%{opacity:1;transform:translate(-50%,-50%) scale(1)} 50%{opacity:.3;transform:translate(-50%,-50%) scale(.5)} }
        @keyframes ti-fade  { 0%,100%{opacity:.45} 50%{opacity:1} }
      `}</style>
        </div>
    );
}

function SpinRing({size, duration, color, colorFaint, reverse = false}: {
    size: number; duration: string; color: string; colorFaint: string; reverse?: boolean;
}) {
    const offset = (72 - size) / 2;
    return (
        <div style={{
            position: "absolute",
            top: offset, left: offset,
            width: size, height: size,
            borderRadius: "50%",
            border: "3.5px solid transparent",
            borderTopColor: color,
            borderRightColor: colorFaint,
            animation: `${reverse ? "ti-spin-ccw" : "ti-spin-cw"} ${duration} linear infinite`,
        }}/>
    );
}