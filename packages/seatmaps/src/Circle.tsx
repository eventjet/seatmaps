import React, { FC } from 'react';
import { l } from './length';

interface CircleProps {
    centerX?: number;
    centerY?: number;
    color?: string;
    radius: number;
}

export const Circle: FC<CircleProps> = ({centerX = 0, centerY = 0, radius, color}) => (
    <circle cx={l(centerX)} cy={l(centerY)} r={l(radius)} fill={color}/>
);
