import React, { FC } from 'react';
import { useTransform } from './useTransform';

// const Name = styled.text`
//     composes: text from './text.css';
//     text-anchor: middle;
//     alignment-baseline: central;
//     cursor: inherit;
//     display: block;
//     fill: #707070;
//     font-size: 6px;
// `;

interface RowProps {
    leftLabel?: string;
    rightLabel?: string;
    x?: number;
    y?: number;
}

export const Row: FC<RowProps> = ({children, leftLabel, rightLabel, x = 0, y = 0}) => {
    const seatsWidth = (Array.isArray(children) ? children.length : 0) * 10;
    return (
        <g transform={useTransform(x, y)}>
            {leftLabel !== undefined ? <text x={-5} y={5}>{leftLabel}</text> : undefined}
            {children}
            {rightLabel !== undefined ? <text x={seatsWidth + 5} y={5}>{rightLabel}</text> : undefined}
        </g>
    );
};
