import { Badge } from './Badge'
import { l } from './length'

export interface BadgeProps {
  containerWidth: number
  count: number
  color?: string
}

// to place the badge nicely on the inner right side of the volume
const HORIZONTAL_BADGE_PADDING = 7
const VERTICAL_BADGE_PADDING = 3


export const SeatCountBadge = ({ containerWidth, count = 0, color = '#808080' }: BadgeProps) => {
    const x = l(containerWidth) - HORIZONTAL_BADGE_PADDING
    return <Badge x={x} y={VERTICAL_BADGE_PADDING} color={color} count={count} />
}
