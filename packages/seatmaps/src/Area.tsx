import { ReactNode } from 'react';
import { getTransform } from './transform';

/**
 * Props for the {@link Area} component.
 * @public
 */
export interface AreaProps {
    /** Rotation angle in degrees. Rotates all children around the area's center. Requires `width` and `height` to be set. */
    angle?: number;
    /** Height of the area in seatmap units. Required when using `angle`. */
    height?: number;
    /** Width of the area in seatmap units. Required when using `angle`. */
    width?: number;
    /** X position of the area in seatmap units. Defaults to `0`. */
    x?: number;
    /** Y position of the area in seatmap units. Defaults to `0`. */
    y?: number;
    /** Child elements to render inside the area (rows, seats, volumes). */
    children?: ReactNode;
}

/**
 * A section of the seatmap containing rows, seats, and volumes.
 *
 * Areas are addressable elements that define a naming scope for the ticketing system.
 * The area's own identity is tracked externally (not by this component). Each combination
 * of area + row + seat name must be unique. Volume labels must be unique within the area.
 *
 * When `angle` is specified, all child elements are rotated together around the
 * area's center point. The center is calculated as `(x + width/2, y + height/2)`,
 * so both `width` and `height` must be provided when rotating.
 *
 * @example
 * ```tsx
 * <Area x={100} y={100} width={300} height={200} angle={15}>
 *   <Row leftLabel="A">
 *     <Seat name="1" />
 *     <Seat name="2" x={100} />
 *   </Row>
 *   <Row y={100} leftLabel="B">
 *     <Seat name="1" />
 *     <Seat name="2" x={100} />
 *   </Row>
 * </Area>
 * ```
 *
 * @public
 */
export const Area = ({ children, x = 0, y = 0, angle = 0, width = 0, height = 0 }: AreaProps) => (
    <g transform={getTransform(x, y, angle, width, height)}>{children}</g>
);
