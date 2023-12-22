import * as React from 'react';
import { Area } from '../Area';
import { BadgeProps } from '../Badge';
import { SeatCountBadge } from '../SeatCountBadge';
import { Seatmap } from '../Seatmap';
import { Volume, VolumeProps } from '../Volume';

export default {
    title: 'SeatCountBadge - Square-Volume',
    component: SeatCountBadge,
    parameters: {
        docs: {
            description: {
                component:
                    "modified Badge Component to use, e.g., as a child of the [Volume Component](../?path=/docs/volume--rectangle). It's nicely positioned at the top right of the volume.",
            },
        },
    },
};

const lightBackground = '#ff9900';
const darkBackground = '#0000ff';

interface WrappedProps {
    badgeProps?: Partial<BadgeProps>;
    volumeProps?: Partial<VolumeProps>;
}

const volumes: Array<[string, number, number]> = [
    ['Table 16', 0, 0],
    ['Table 17', 600, 0],
    ['Table 18', 0, 400],
    ['Table 19', 600, 400],
    ['Table 20', 0, 800],
    ['Table 21', 600, 800],
];

const Wrapped = ({ badgeProps, volumeProps }: WrappedProps) => {
    const [active, setActive] = React.useState<{ [volumeLabel: string]: boolean }>({});
    const containerWidth = 250;
    const containerHeight = 250;
    return (
        <Seatmap className="badge">
            <Area>
                {volumes.map(([label, x, y], index) => (
                    <Volume
                        key={index}
                        label={label}
                        x={x}
                        y={y}
                        onClick={() => setActive({ ...active, [label]: !active[label] })}
                        width={containerWidth}
                        height={containerHeight}
                        color="#ff9900"
                        active={active[label]}
                        shape="rectangle"
                        {...volumeProps}
                    >
                        <SeatCountBadge
                            containerProps={{ height: containerHeight, width: containerWidth }}
                            {...badgeProps}
                        />
                    </Volume>
                ))}
            </Area>
        </Seatmap>
    );
};

export const Disabled = () => (
    <Wrapped
        badgeProps={{ count: 200 }}
        volumeProps={{ disabled: true }}
    />
);
export const LightBackground = () => (
    <Wrapped
        badgeProps={{ count: 200 }}
        volumeProps={{ color: lightBackground }}
    />
);
export const DarkBackground = () => (
    <Wrapped
        badgeProps={{ count: 200 }}
        volumeProps={{ color: darkBackground }}
    />
);
export const Rotated = () => (
    <Wrapped
        badgeProps={{ count: 200 }}
        volumeProps={{ angle: 20, color: lightBackground }}
    />
);
export const FontWeightNormal = () => (
    <Wrapped
        badgeProps={{ count: 200 }}
        volumeProps={{ fontWeight: 'normal', color: lightBackground }}
    />
);
export const FontWeightNormalDark = () => (
    <Wrapped
        badgeProps={{ count: 200 }}
        volumeProps={{ fontWeight: 'normal', color: darkBackground }}
    />
);
