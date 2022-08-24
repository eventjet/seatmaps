import { l } from './length';

export interface CircleProps {
    centerX?: number;
    centerY?: number;
    color?: string;
    radius: number;
}

export const Circle = ({centerX = 0, centerY = 0, radius, color}: CircleProps) => (
    <circle cx={l(centerX)} cy={l(centerY)} r={l(radius)} fill={color}/>
);
