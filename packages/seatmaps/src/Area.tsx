import React, { FC } from 'react';
import { useTransform } from './useTransform';

interface AreaProps {
    angle?: number;
    height?: number;
    width?: number;
    x?: number;
    y?: number;
}

export const Area: FC<AreaProps> = ({children, x = 0, y = 0, angle = 0, width = 0, height = 0}) => (
    <g transform={useTransform(x, y, angle, width, height)}>{children}</g>
);
