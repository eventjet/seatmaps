import React, { FC } from 'react';
import { l } from './length';
import { useTransform } from './useTransform';

interface RectangleProps {
    angle?: number;
    color?: string;
    height: number;
    width: number;
    x?: number;
    y?: number;
}

export const Rectangle: FC<RectangleProps> = ({height, width, x = 0, y = 0, color, angle = 0}) => (
    <rect
        width={l(width)}
        height={l(height)}
        fill={color}
        transform={useTransform(x, y, angle, width, height)}
    />
);
