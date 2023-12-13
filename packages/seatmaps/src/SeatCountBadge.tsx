import { Badge } from './Badge';
import { l } from './length';

export interface SeatCountBadgeProps {
    containerWidth: number;
    count: number;
    color?: string;
}

// to place the badge on the right side of the volume
const HORIZONTAL_BADGE_PADDING = 2;
const VERTICAL_BADGE_PADDING = 2;

export const SeatCountBadge = ({ containerWidth, count = 0, color = 'inherit' }: SeatCountBadgeProps) => {
    const x = l(containerWidth) - HORIZONTAL_BADGE_PADDING;
    return (
        <Badge
            x={x}
            y={VERTICAL_BADGE_PADDING}
            color={color}
            count={count}
        />
    );
};
