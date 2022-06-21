import styled from '@emotion/styled';
import React, { ReactElement, ReactNode } from 'react';
import { textCss } from './text';
import { useTransform } from './useTransform';

const isReactElement = (x: unknown): x is ReactElement => {
    return typeof x === 'object' && x !== null && 'props' in x;
};

const Name = styled.text`
    ${textCss}
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
    children?: ReactNode;
}

export const Row = ({children, leftLabel, rightLabel, x = 0, y = 0}: RowProps) => {
    const [[leftX, leftY], [rightX, rightY]] = ((): [left: [x: number, y: number], right: [x: number, y: number]] => {
        if (!Array.isArray(children)) {
            return [[0, 0], [0, 0]];
        }
        const first = children[0];
        const last = children[children.length - 1];
        return [
            isReactElement(first) ? [first.props.x ?? 0, first.props.y ?? 0] : [0, 0],
            isReactElement(last) ? [last.props.x ?? 0, last.props.y ?? 0] : [0, 0],
        ];
    })();
    const leftStyle = leftX !== 0 || leftY !== 0 ? {transform: `translate(${leftX / 10}px, ${leftY / 10}px)`} : undefined;
    const rightStyle = rightX !== 0 || rightY !== 0 ? {transform: `translate(${rightX / 10}px, ${rightY / 10}px)`} : undefined;
    return (
        <g transform={useTransform(x, y)}>
            {leftLabel !== undefined ? (
                <Name x={-5} y={5} style={leftStyle}>{leftLabel}</Name>
            ) : undefined}
            {children}
            {rightLabel !== undefined ? (
                <Name x={15} y={5} style={rightStyle}>{rightLabel}</Name>
            ) : undefined}
        </g>
    );
};
