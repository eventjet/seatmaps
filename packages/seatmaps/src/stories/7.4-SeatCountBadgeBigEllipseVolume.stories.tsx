import * as React from 'react';
import { Area } from '../Area';
import { BadgeProps } from '../Badge';
import { SeatCountBadgeOnEllipse } from '../SeatCountBadge';
import { Seatmap } from '../Seatmap';
import { Volume, VolumeProps } from '../Volume';

export default {
    title: 'SeatCountBadge - Big Ellipse-Volume',
    component: Volume,
    parameters: {
        docs: {
            description: {
                component:
                    "show the number of seats in an ellipse-shaped volume. We don't use the SeatCountBadge-Component here, because it's not possible - at the moment - to position it correctly.",
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

const DEFAULT_WIDTH = 1000;
const DEFAULT_HEIGHT = 500;

const volumes: Array<[string, number, number]> = [['Stehplatz', 0, 0]];

const Wrapped = ({ badgeProps, volumeProps }: WrappedProps) => {
    const [active, setActive] = React.useState<{ [volumeLabel: string]: boolean }>({});
    const containerWidth = volumeProps?.width ?? DEFAULT_WIDTH;
    const containerHeight = volumeProps?.height ?? DEFAULT_HEIGHT;
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
                        shape="ellipse"
                        {...volumeProps}
                    >
                        <SeatCountBadgeOnEllipse
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
