import * as React from 'react';
import {Area} from '../Area';
import {Badge, BadgeProps} from '../Badge';
import {Seatmap} from '../Seatmap';

export default {
    title: 'Badge',
    component: Badge,
    parameters: {
        docs: {
            description: {
                component:
                    'Badge Component to display a number of available Seats. <br />Default color is `#ff9900`<br />Don`t be irritated by the dropShadow - works really nice in combination eg with the [Volume Component](../?path=/docs/volume-seat-count-badge--rectangle).',
            },
        },
    },
};

const lightBackground = '#ff9900';
const darkBackground = '#0000ff';

interface WrappedProps {
    badgeProps: BadgeProps;
}

const Wrapped = ({badgeProps}: WrappedProps) => {
    return (
        <Seatmap className="badge">
            <Area>
                <Badge {...badgeProps} />
            </Area>
        </Seatmap>
    );
};

export const DefaultColor = () => <Wrapped badgeProps={{count: 200, x: 40, y: 1}} />;
export const LightBackground = () => <Wrapped badgeProps={{count: 200, x: 40, y: 1, color: lightBackground}} />;
export const DarkBackground = () => <Wrapped badgeProps={{count: 200, x: 40, y: 1, color: darkBackground}} />;
