import { l } from './length';
import { useTransform } from './useTransform';

export interface RectangleProps {
    angle?: number;
    color?: string;
    height: number;
    width: number;
    x?: number;
    y?: number;
}

export const Rectangle = ({ height, width, x = 0, y = 0, color, angle = 0 }: RectangleProps) => (
    <rect
        width={l(width)}
        height={l(height)}
        fill={color}
        transform={useTransform(x, y, angle, width, height)}
    />
);
