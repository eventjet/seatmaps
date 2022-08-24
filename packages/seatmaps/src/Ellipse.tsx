import { l } from './length';
import { useTransform } from './useTransform';

export interface EllipseProps {
    color?: string;
    height: number;
    width: number;
    x?: number;
    y?: number;
}

export const Ellipse = ({height, width, x = 0, y = 0, color}: EllipseProps) => (
    <ellipse
        rx={l(width / 2)}
        ry={l(height / 2)}
        cx={l(width / 2)}
        cy={l(height / 2)}
        fill={color}
        transform={useTransform(x, y, 0, width, height)}
    />
);
