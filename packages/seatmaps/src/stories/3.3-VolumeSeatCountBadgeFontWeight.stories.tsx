import * as React from 'react';
import {useState} from 'react';
import {Area, Seatmap, Volume, VolumeProps} from '..';

export default {
    title: 'Volume + Seat Count - Badge + FontWeight Prop',
    component: Volume,
    parameters: {
        docs: {
            description: {
                component:
                    'Display availableSeats as Badge on a Volume with a given fontWeight.<br />Set via `showSeatCountAsBadge = true`, `availableSeatCount`-Prop & `fontWeight`-Prop.<br />default = "bold" - `fontWeight` takes the normal css values for font-weight. ',
            },
        },
    },
};

interface WrappedProps {
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

const Wrapped = ({volumeProps}: WrappedProps) => {
    const [active, setActive] = useState<{[volumeLabel: string]: boolean}>({});
    return (
        <>
            <style type="text/css">{`
                .seatmap {
                    width: 400px;
                    height: 400px;
                }
            `}</style>
            <Seatmap className="seatmap">
                <Area>
                    {volumes.map(([label, x, y], index) => (
                        <Volume
                            key={index}
                            label={label}
                            x={x}
                            y={y}
                            onClick={() => setActive({...active, [label]: !active[label]})}
                            width={500}
                            height={300}
                            color="#ff9900"
                            active={active[label]}
                            {...volumeProps}
                        />
                    ))}
                </Area>
            </Seatmap>
        </>
    );
};

export const Rectangle = () => (
    <Wrapped
        volumeProps={{shape: 'rectangle', showSeatCountAsBadge: true, availableSeatCount: 200, fontWeight: 'normal'}}
    />
);

export const Rotated = () => (
    <Wrapped volumeProps={{angle: 20, showSeatCountAsBadge: true, availableSeatCount: 200, fontWeight: 'normal'}} />
);

export const Disabled = () => (
    <Wrapped
        volumeProps={{disabled: true, showSeatCountAsBadge: true, availableSeatCount: 200, fontWeight: 'normal'}}
    />
);

export const DarkBackground = () => (
    <Wrapped
        volumeProps={{
            shape: 'rectangle',
            showSeatCountAsBadge: true,
            availableSeatCount: 200,
            color: '#0000FF',
            fontWeight: 'normal',
        }}
    />
);