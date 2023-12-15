import { Badge } from './Badge';
import { l } from './length';
import { calculateBadgePosition } from './util/calculations';

export interface SeatCountBadgeProps {
    count: number;
    color?: string;
    containerProps: ParentContainerProps;
}

export interface ParentContainerProps {
    width: number;
    height: number;
}

// to place the badge on the right side of the volume (yes, that's on purpose, because unfortunately one value doesn't work for both shapes.)
const HORIZONTAL_BADGE_PADDING = 2;
const VERTICAL_BADGE_PADDING = 2;
const HORIZONTAL_BADGE_PADDING_CIRCLE = 4;
const VERTICAL_BADGE_PADDING_CIRCLE = 4;

const badgePositionAdjustment = (containerWidth: number, isCircle = false) => {
    if (isCircle) {
        return {
            x: l(containerWidth) - HORIZONTAL_BADGE_PADDING_CIRCLE,
            y: VERTICAL_BADGE_PADDING_CIRCLE,
        };
    }
    return {
        x: l(containerWidth) - HORIZONTAL_BADGE_PADDING,
        y: VERTICAL_BADGE_PADDING,
    };
};

export const SeatCountBadge = ({ containerProps, count = 0, color = 'inherit' }: SeatCountBadgeProps) => {
    const { x, y } = badgePositionAdjustment(containerProps.width);
    return (
        <Badge
            x={x}
            y={y}
            color={color}
            count={count}
        />
    );
};

export const SeatCountBadgeOnCircle = ({ containerProps, count = 0, color = 'inherit' }: SeatCountBadgeProps) => {
    const { x, y } = badgePositionAdjustment(containerProps.width, true);
    return (
        <Badge
            x={x}
            y={y}
            color={color}
            count={count}
        />
    );
};

export const SeatCountBadgeOnEllipse = ({ containerProps, count = 0, color = 'inherit' }: SeatCountBadgeProps) => {
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
