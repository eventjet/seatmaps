import { l } from './length';
import { getTransform } from './transform';

/**
 * Props for the {@link Rectangle} component.
 * @public
 */
export interface RectangleProps {
    /** Rotation angle in degrees. Rotates around the center point `(x + width/2, y + height/2)`. */
    angle?: number;
    /** Fill color of the rectangle. */
    color?: string;
    /** Height of the rectangle in seatmap units. */
    height: number;
    /** Width of the rectangle in seatmap units. */
    width: number;
    /** X position of the rectangle in seatmap units. Defaults to `0`. */
    x?: number;
    /** Y position of the rectangle in seatmap units. Defaults to `0`. */
    y?: number;
}

/**
 * A decorative rectangle shape.
 *
 * This is a structural element with no identity in the ticketing system.
 * Rotation is around the rectangle's center point.
 *
 * @example
 * ```tsx
 * <Rectangle x={50} y={50} width={200} height={100} color="#4a90d9" angle={15} />
 * ```
 *
 * @public
 */
export const Rectangle = ({ height, width, x = 0, y = 0, color, angle = 0 }: RectangleProps) => (
    <rect
        width={l(width)}
        height={l(height)}
        fill={color}
        transform={getTransform(x, y, angle, width, height)}
        aria-hidden="true"
    />
);
