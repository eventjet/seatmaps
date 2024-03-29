import { Badge } from './Badge';
import { l } from './length';
import { calculateBadgePosition } from './util/calculations';

interface LegacySeatCountBadgeProps {
    containerWidth: number;
    count: number;
    color?: string;
}

interface NewSeatCountBadgeProps {
    containerProps: Dimensions;
    count: number;
    color?: string;
}

export type SeatCountBadgeProps = LegacySeatCountBadgeProps | NewSeatCountBadgeProps;

interface Dimensions {
    width: number;
    height: number;
}

// to place the badge on the right side of the volume (yes, that's on purpose, because unfortunately one value doesn't work for both shapes.)
const HORIZONTAL_BADGE_PADDING = 5;
const VERTICAL_BADGE_PADDING = 0;

const adjustRectangleBadgePosition = (containerWidth: number) => ({
    x: l(containerWidth) - HORIZONTAL_BADGE_PADDING,
    y: VERTICAL_BADGE_PADDING,
});

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
