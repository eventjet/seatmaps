import { ReactNode } from 'react';
import { useTransform } from './useTransform';

export interface AreaProps {
    angle?: number;
    height?: number;
    width?: number;
    x?: number;
    y?: number;
    children?: ReactNode;
}

export const Area = ({ children, x = 0, y = 0, angle = 0, width = 0, height = 0 }: AreaProps) => (
    <g transform={useTransform(x, y, angle, width, height)}>{children}</g>
);
