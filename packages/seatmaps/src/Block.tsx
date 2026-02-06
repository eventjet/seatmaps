import { ReactNode } from 'react';
import { getTransform } from './transform';

/**
 * Props for the {@link Block} component.
 * @public
 */
export interface BlockProps {
    /** Rotation angle in degrees. Rotates all children around the block's center. Requires `width` and `height` to be set. */
    angle?: number;
    /** Height of the block in seatmap units. Required when using `angle`. */
    height?: number;
    /** Width of the block in seatmap units. Required when using `angle`. */
    width?: number;
    /** X position of the block in seatmap units. Defaults to `0`. */
    x?: number;
    /** Y position of the block in seatmap units. Defaults to `0`. */
    y?: number;
    /** Child elements to render inside the block (typically rows). */
    children?: ReactNode;
}

/**
 * A structural container for positioning and rotating groups of rows within an area.
 *
 * Blocks group rows of seats together, allowing them to be positioned and rotated
 * as a unit. They are structural elements with no identity in the ticketing system -
 * the naming scope is defined by the containing {@link Area}, not the block.
 *
 * When `angle` is specified, all child elements are rotated together around the
 * block's center point. The center is calculated as `(x + width/2, y + height/2)`,
 * so both `width` and `height` must be provided when rotating.
 *
 * @example
 * ```tsx
 * <Area>
 *   <Block x={100} y={100} angle={15} width={300} height={200}>
 *     <Row leftLabel="A">
 *       <Seat name="1" />
 *       <Seat name="2" x={100} />
 *     </Row>
 *     <Row y={100} leftLabel="B">
 *       <Seat name="1" />
 *       <Seat name="2" x={100} />
 *     </Row>
 *   </Block>
 * </Area>
 * ```
 *
 * @public
 */
export const Block = ({ children, x = 0, y = 0, angle = 0, width = 0, height = 0 }: BlockProps) => (
    <g
        transform={getTransform(x, y, angle, width, height)}
        role="presentation"
    >
        {children}
    </g>
);
