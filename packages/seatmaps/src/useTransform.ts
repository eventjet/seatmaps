import { useMemo } from 'react';
import { l } from './length';

export const useTransform = (x: number, y: number, angle = 0, width?: number, height?: number) =>
    useMemo(() => {
        if (x === 0 && y === 0 && angle === 0) {
            return undefined;
        }
        const rotate = (() => {
            if (angle === 0) {
                return undefined;
            }
            if (width === undefined || height === undefined) {
                throw new Error('Got an angle but no dimensions');
            }
            return angle !== 0 ? `rotate(${angle} ${l(width) / 2 + l(x)} ${l(height) / 2 + l(y)})` : undefined;
        })();
        const translate = x !== 0 || y !== 0 ? `translate(${l(x)}, ${l(y)})` : undefined;
        return [rotate, translate].filter((transformation) => transformation !== undefined).join(' ');
    }, [x, y, angle, width, height]);
