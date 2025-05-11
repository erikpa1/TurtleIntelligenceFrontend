import React from 'react';


//Created by https://claude.ai/chat/325432ef-07a1-4439-b2bd-2165ef5ee7b9

export default function AeeWrapper({aee, children, ...props}) {

    React.useEffect(() => {
        // Register all props as event listeners
        const eventListeners = {};

        Object.entries(props).forEach(([eventName, listener]) => {
            if (typeof listener === 'function') {
                aee.on(eventName, listener);
                eventListeners[eventName] = listener;
            }
        });

        // Cleanup function to unregister listeners when component unmounts
        return () => {
            Object.entries(eventListeners).forEach(([eventName, listener]) => {
                aee.off(eventName, listener);
            });
        };
    }, [props]); // Re-run when props change

    return children || null;
};

