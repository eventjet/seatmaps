import { l } from './length';
import { useTransform } from './useTransform';

/**
 * Props for the {@link Ellipse} component.
 * @public
 */
export interface EllipseProps {
    /** Fill color of the ellipse. */
    color?: string;
    /** Height of the ellipse's bounding box in seatmap units. */
    height: number;
    /** Width of the ellipse's bounding box in seatmap units. */
    width: number;
    /** X position of the ellipse's bounding box in seatmap units. Defaults to `0`. */
    x?: number;
    /** Y position of the ellipse's bounding box in seatmap units. Defaults to `0`. */
    y?: number;
}

/**
 * A decorative ellipse shape.
 *
 * This is a structural element with no identity in the ticketing system.
 * The ellipse is positioned and sized based on its bounding box, with the center
 * calculated automatically from the width and height.
 *
 * @example
 * ```tsx
 * <Ellipse x={50} y={50} width={200} height={100} color="#4a90d9" />
 * ```
 *
 * @public
 */
export const Ellipse = ({ height, width, x = 0, y = 0, color }: EllipseProps) => (
    <ellipse
        rx={l(width / 2)}
        ry={l(height / 2)}
        cx={l(width / 2)}
        cy={l(height / 2)}
        fill={color}
        transform={useTransform(x, y, 0, width, height)}
        aria-hidden="true"
    />
);
