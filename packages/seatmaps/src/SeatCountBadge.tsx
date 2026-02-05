import { Badge } from './Badge';
import { l } from './length';
import { calculateBadgePosition } from './util/calculations';

/**
 * Legacy props for {@link SeatCountBadge} using only container width.
 * @public
 */
export interface LegacySeatCountBadgeProps {
    /** Width of the container volume in seatmap units. */
    containerWidth: number;
    /** The number to display in the badge. */
    count: number;
    /** Background color of the badge. Defaults to `'inherit'`. */
    color?: string;
}

/**
 * Props for {@link SeatCountBadge} and {@link SeatCountBadgeOnEllipse} using container dimensions.
 * @public
 */
export interface NewSeatCountBadgeProps {
    /** Dimensions of the container volume. */
    containerProps: Dimensions;
    /** The number to display in the badge. */
    count: number;
    /** Background color of the badge. Defaults to `'inherit'`. */
    color?: string;
}

/**
 * Props for the {@link SeatCountBadge} component.
 * Accepts either legacy props (with `containerWidth`) or new props (with `containerProps`).
 * @public
 */
export type SeatCountBadgeProps = LegacySeatCountBadgeProps | NewSeatCountBadgeProps;

/**
 * Dimensions for positioning badges on volumes.
 * @public
 */
export interface Dimensions {
    /** Width in seatmap units. */
    width: number;
    /** Height in seatmap units. */
    height: number;
}

// to place the badge on the right side of the volume (yes, that's on purpose, because unfortunately one value doesn't work for both shapes.)
const HORIZONTAL_BADGE_PADDING = 5;
const VERTICAL_BADGE_PADDING = 0;

const adjustRectangleBadgePosition = (containerWidth: number) => ({
    x: l(containerWidth) - HORIZONTAL_BADGE_PADDING,
    y: VERTICAL_BADGE_PADDING,
});

/**
 * A badge displaying a seat count, positioned on the right side of a rectangular volume.
 *
 * Use this component inside a {@link Volume} with `shape="rectangle"` to show
 * the number of available seats.
 *
 * @example
 * ```tsx
 * <Volume width={200} height={100} shape="rectangle">
 *   <SeatCountBadge containerWidth={200} count={15} color="#4a90d9" />
 * </Volume>
 * ```
 *
 * @public
 */
export const SeatCountBadge = ({ count = 0, color = 'inherit', ...props }: SeatCountBadgeProps) => {
    const containerWidth = 'containerWidth' in props ? props.containerWidth : props.containerProps.width;
    const { x, y } = adjustRectangleBadgePosition(containerWidth);
    return (
        <Badge
            x={x}
            y={y}
            color={color}
            count={count}
        />
    );
};

/**
 * A badge displaying a seat count, positioned on the edge of an elliptical volume.
 *
 * The badge is automatically positioned at approximately 45 degrees on the ellipse's perimeter.
 * Use this component inside a {@link Volume} with `shape="ellipse"` to show the number
 * of available seats.
 *
 * @example
 * ```tsx
 * <Volume width={200} height={150} shape="ellipse">
 *   <SeatCountBadgeOnEllipse containerProps={{ width: 200, height: 150 }} count={25} color="#4a90d9" />
 * </Volume>
 * ```
 *
 * @public
 */
export const SeatCountBadgeOnEllipse = ({ containerProps, count = 0, color = 'inherit' }: NewSeatCountBadgeProps) => {
    const [x, y] = calculateBadgePosition([0, 0], [containerProps?.width, containerProps?.height]);
    const x1 = x / 10;
    const y1 = y / 10;

    return (
        <Badge
            x={x1}
            y={y1}
            color={color}
            count={count}
        />
    );
};
