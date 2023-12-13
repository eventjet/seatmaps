import { Badge } from './Badge';
import { l } from './length';

export interface SeatCountBadgeProps {
    containerWidth: number;
    count: number;
    color?: string;
}

export const SeatCountBadge = ({ containerWidth, count = 0, color = 'inherit' }: SeatCountBadgeProps) => {
    const x = l(containerWidth);
    return (
        <Badge
            x={x}
            y={0}
            color={color}
            count={count}
        />
    );
};
