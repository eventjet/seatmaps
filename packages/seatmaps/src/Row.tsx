import React, { FC } from 'react';
import { useTransform } from './useTransform';
import styled from '@emotion/styled';

const Name = styled.text`
    composes: text from './text.css';
    text-anchor: middle;
    alignment-baseline: central;
    cursor: inherit;
    display: block;
    fill: #707070;
    font-size: 6px;
`;

export interface RowProps {
    leftLabel?: string;
    rightLabel?: string;
    x?: number;
    y?: number;
}

export const Row: FC<RowProps> = ({children, leftLabel, rightLabel, x = 0, y = 0}) => {
    const seatsWidth = (Array.isArray(children) ? children.length : 0) * 10;
    return (
        <g transform={useTransform(x, y)}>
            {leftLabel !== undefined ? <Name x={-5} y={5}>{leftLabel}</Name> : undefined}
            {children}
            {rightLabel !== undefined ? <Name x={seatsWidth + 5} y={5}>{rightLabel}</Name> : undefined}
        </g>
    );
};
