import { Badge } from './Badge';
import { l } from './length';

export interface SeatCountBadgeProps {
    containerWidth: number;
    count: number;
    color?: string;
}

// to place the badge on the right side of the volume (yes, that's on purpose, because unfortunately one value doesn't work for both shapes.)
const HORIZONTAL_BADGE_PADDING = 2;
const VERTICAL_BADGE_PADDING = 2;
const HORIZONTAL_BADGE_PADDING_CIRCLE = 3;
const VERTICAL_BADGE_PADDING_CIRCLE = 3;

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

export const SeatCountBadge = ({ containerWidth, count = 0, color = 'inherit' }: SeatCountBadgeProps) => {
    const { x, y } = badgePositionAdjustment(containerWidth);
    return (
        <Badge
            x={x}
            y={y}
            color={color}
            count={count}
        />
    );
};

export const SeatCountBadgeOnCircle = ({ containerWidth, count = 0, color = 'inherit' }: SeatCountBadgeProps) => {
    const { x, y } = badgePositionAdjustment(containerWidth, true);
    return (
        <Badge
            x={x}
            y={y}
            color={color}
            count={count}
        />
    );
};
