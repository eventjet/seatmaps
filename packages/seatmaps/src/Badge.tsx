import './Badge.css';

/**
 * Props for the {@link Badge} component.
 * @public
 */
export interface BadgeProps {
    /** The number to display inside the badge. */
    count: number;
    /** Background color of the badge. Defaults to `#808080`. */
    color?: string;
    /** Y position of the badge center in SVG units. */
    y: number;
    /** X position of the badge center in SVG units. */
    x: number;
}

// radius currently fixed, as the font size would also have to be adjusted when changing the radius
const CIRCLE_RADIUS = 5;

/**
 * A circular badge for displaying numeric counts.
 *
 * Renders as a filled circle with a semi-transparent overlay and centered text.
 * Commonly used with {@link SeatCountBadge} to show available seat counts on volumes.
 *
 * @example
 * ```tsx
 * <Badge x={50} y={50} count={12} color="#4a90d9" />
 * ```
 *
 * @public
 */
export const Badge = ({ x, y, count = 0, color = '#808080' }: BadgeProps) => {
    return (
        <>
            <circle
                className="ej-seatmaps-badge__circle"
                cx={x}
                cy={y}
                r={CIRCLE_RADIUS}
                fill={color}
                filter="url(#f2)"
            />
            <circle
                className="ej-seatmaps-badge__text-overlay-circle"
                cx={x}
                cy={y}
                r={CIRCLE_RADIUS}
            />
            <text
                className="ej-seatmaps-badge__name"
                x={x}
                y={y}
            >
                {count}
            </text>
        </>
    );
};
