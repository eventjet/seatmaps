import * as React from 'react'
import { Area } from '../Area'
import { Badge, BadgeProps } from '../Badge'
import { Seatmap } from '../Seatmap'

export default {
  title: 'Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          "Badge Component to display, e.g., a number of available seats.<br />Default color is `#ff9900`<br />Don't be irritated by the cropped drop shadow - it works really nicely in combination with the [Volume Component](../?path=/story/seatcountbadge--light-background).",
      },
    },
  },
}

const lightBackground = '#ff9900'
const darkBackground = '#0000ff'

interface WrappedProps {
  badgeProps?: Partial<BadgeProps>
}

const Wrapped = ({ badgeProps }: WrappedProps) => {
  return (
    <Seatmap className='badge'>
      <Area>
        <Badge x={40} y={1} {...badgeProps} />
      </Area>
    </Seatmap>
  )
}

export const DefaultColor = () => <Wrapped badgeProps={{ count: 200 }} />
export const LightBackground = () => <Wrapped badgeProps={{ count: 200, color: lightBackground }} />
export const DarkBackground = () => <Wrapped badgeProps={{ count: 200, color: darkBackground }} />
