import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { noop } from './util/noop';

export enum TextSize {
    SMALL,
    NORMAL,
}

const context = createContext<[TextSize, (size: TextSize) => void, (size: TextSize) => void]>([
    TextSize.NORMAL,
    noop,
    noop,
]);

export const TextSizeController = ({ children }: { children?: ReactNode }) => {
    const [sizes, setSizes] = useState<TextSize[]>([]);
    const register = (size: TextSize) => {
        setSizes((currentSizes) => [...currentSizes, size]);
    };
    const unregister = (size: TextSize) => {
        setSizes((currentSizes) => {
            const firstIndex = currentSizes.indexOf(size);
            if (firstIndex === -1) {
                return currentSizes;
            }
            const changedSizes = [...currentSizes];
            changedSizes.splice(firstIndex, 1);
            return changedSizes;
        });
    };
    const textSize = sizes.length === 0 ? TextSize.NORMAL : Math.min(...sizes);
    return <context.Provider value={[textSize, register, unregister]}>{children}</context.Provider>;
};

export const useTextSize = (ownSize: TextSize) => {
    const [textSize, register, unregister] = useContext(context);
    useEffect(() => {
        register(ownSize);
        return () => {
            unregister(ownSize);
        };
    }, [ownSize, register, unregister]);
    return textSize;
};
