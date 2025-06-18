import {useState, useEffect, Dispatch, SetStateAction} from 'react';

function useLocalStorage(key, defaultValue = ''): [string, (newState: string) => void] {
    // Get initial value from localStorage or use default
    const [value, setValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item !== null ? item : defaultValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return defaultValue;
        }
    });

    // Update localStorage whenever value changes
    useEffect(() => {
        try {
            window.localStorage.setItem(key, value);
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;