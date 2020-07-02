import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { noop } from './util/noop';

export enum TextSize {
    SMALL,
    NORMAL,
}

const context = createContext<[TextSize, (size: TextSize) => void, (size: TextSize) => void]>([TextSize.NORMAL, noop, noop]);

export const TextSizeController: FC = ({children}) => {
    const [textSize, setTextSize] = useState<TextSize>(TextSize.NORMAL);
    const [sizes, setSizes] = useState<TextSize[]>([]);
    const register = (size: TextSize) => {
        setSizes((currentSizes) => [...currentSizes, size]);
    };
    const unregister = (size: TextSize) => {
        setSizes((currentSizes) => {
            const changedSizes = [...currentSizes];
            const firstIndex = changedSizes.indexOf(size);
            if (firstIndex === -1) {
                return currentSizes;
            }
            changedSizes.splice(firstIndex, 1);
            return changedSizes;
        });
    };
    useEffect(() => {
        if (sizes.length === 0) {
            setTextSize(TextSize.NORMAL);
            return;
        }
        const min = Math.min(...sizes);
        if (min === textSize) {
            return;
        }
        setTextSize(min);
    }, [sizes]);
    return (
        <context.Provider value={[textSize, register, unregister]}>
            {children}
        </context.Provider>
    )
};

export const useTextSize = (ownSize: TextSize) => {
    const [textSize, register, unregister] = useContext(context);
    useEffect(() => {
        register(ownSize);
        return () => {
            unregister(ownSize);
        };
    }, [ownSize]);
    return textSize;
};
