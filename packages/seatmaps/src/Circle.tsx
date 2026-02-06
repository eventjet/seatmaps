import { l } from './length';

/**
 * Props for the {@link Circle} component.
 * @public
 */
export interface CircleProps {
    /** X coordinate of the circle's center in seatmap units. Defaults to `0`. */
    centerX?: number;
    /** Y coordinate of the circle's center in seatmap units. Defaults to `0`. */
    centerY?: number;
    /** Fill color of the circle. */
    color?: string;
    /** Radius of the circle in seatmap units. */
    radius: number;
}

/**
 * A decorative circle shape.
 *
 * This is a structural element with no identity in the ticketing system.
 *
 * @example
 * ```tsx
 * <Circle centerX={100} centerY={100} radius={50} color="#4a90d9" />
 * ```
 *
 * @public
 */
export const Circle = ({ centerX = 0, centerY = 0, radius, color }: CircleProps) => (
    <circle
        cx={l(centerX)}
        cy={l(centerY)}
        r={l(radius)}
        fill={color}
        aria-hidden="true"
    />
);
