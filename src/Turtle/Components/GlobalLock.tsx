//Created in https://claude.ai/chat/5869daf3-b3e1-4310-9d0c-52d2eb5dd971
import {create} from "zustand";
import {Spin} from 'antd';
import {useTranslation} from "react-i18next";


interface IGlobalLock {
    isLocked: boolean
    lock: () => void
    unlock: () => void
}

export const useGlobalLock = create<IGlobalLock>((set) => ({
    isLocked: false,
    lock: () => set((newState) => ({isLocked: true})),
    unlock: () => set((newState) => ({isLocked: false})),
}))


export function GlobalLock({}) {

    const [t] = useTranslation()

    const {isLocked} = useGlobalLock()

    if (isLocked) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 9999,
                }}
            >
                <Spin size="large"/>
                <div
                    style={{
                        marginTop: '16px',
                        color: 'white',
                        fontWeight: '500'
                    }}
                >
                    {t("wait")}...
                </div>
            </div>
        )
    } else {
        return (
            <></>
        )
    }

}