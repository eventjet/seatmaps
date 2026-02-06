import styled from '@emotion/styled';
import { ReactElement, ReactNode } from 'react';
import { textCss } from './textCss';
import { useTransform } from './useTransform';

const isReactElement = (x: unknown): x is ReactElement => {
    return typeof x === 'object' && x !== null && 'props' in x;
};

const Name = styled('text')`
    ${textCss}
    text-anchor: middle;
    alignment-baseline: central;
    cursor: inherit;
    display: block;
    fill: #707070;
    font-size: 6px;
`;

/**
 * Props for the {@link Row} component.
 * @public
 */
export interface RowProps {
    /** Row identifier displayed to the left of the first seat. */
    leftLabel?: string;
    /** Accessible name for the row. */
    name?: string;
    /** Row identifier displayed to the right of the last seat. */
    rightLabel?: string;
    /** X position of the row in seatmap units. Defaults to `0`. */
    x?: number;
    /** Y position of the row in seatmap units. Defaults to `0`. */
    y?: number;
    /** Seat elements to render in the row. */
    children?: ReactNode;
}

/**
 * A row of seats within an area.
 *
 * Rows are addressable elements with identities meaningful to the ticketing system.
 * The row is identified by its label (shown via `leftLabel` or `rightLabel`), which
 * combines with the area and seat name to form a unique seat identifier.
 *
 * Row labels are automatically positioned relative to the first and last seats.
 *
 * @example
 * ```tsx
 * <Row leftLabel="A" rightLabel="A">
 *   <Seat name="1" />
 *   <Seat name="2" x={100} />
 *   <Seat name="3" x={200} />
 * </Row>
 * ```
 *
 * @public
 */
export const Row = ({ children, leftLabel, name, rightLabel, x = 0, y = 0 }: RowProps) => {
    const [[leftX, leftY], [rightX, rightY]] = ((): [left: [x: number, y: number], right: [x: number, y: number]] => {
        if (!Array.isArray(children)) {
            return [
                [0, 0],
                [0, 0],
            ];
        }
        const first = children[0];
        const last = children[children.length - 1];
        return [
            isReactElement(first) ? [first.props.x ?? 0, first.props.y ?? 0] : [0, 0],
            isReactElement(last) ? [last.props.x ?? 0, last.props.y ?? 0] : [0, 0],
        ];
    })();
    const leftStyle =
        leftX !== 0 || leftY !== 0 ? { transform: `translate(${leftX / 10}px, ${leftY / 10}px)` } : undefined;
    const rightStyle =
        rightX !== 0 || rightY !== 0 ? { transform: `translate(${rightX / 10}px, ${rightY / 10}px)` } : undefined;
    return (
        <g
            transform={useTransform(x, y)}
            role="group"
            aria-label={name}
        >
            {leftLabel !== undefined ? (
                <Name
                    x={-5}
                    y={5}
                    style={leftStyle}
                    aria-hidden="true"
                >
                    {leftLabel}
                </Name>
            ) : undefined}
            {children}
            {rightLabel !== undefined ? (
                <Name
                    x={15}
                    y={5}
                    style={rightStyle}
                    aria-hidden="true"
                >
                    {rightLabel}
                </Name>
            ) : undefined}
        </g>
    );
};
