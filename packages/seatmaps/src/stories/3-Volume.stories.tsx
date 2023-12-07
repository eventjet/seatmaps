import * as React from 'react';
import { useState } from 'react';
import { Area, Seatmap, Volume, VolumeProps } from '../';

export default {
    title: 'Volume',
    component: Volume,
    parameters: {
        docs: {
            description: {
                component: 'Volume component - label is displayed as it is passed as prop.',
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

const Wrapped = ({ volumeProps }: WrappedProps) => {
    const [active, setActive] = useState<{ [volumeLabel: string]: boolean }>({});
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
                            onClick={() => setActive({ ...active, [label]: !active[label] })}
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

export const Rectangle = () => <Wrapped volumeProps={{ shape: 'rectangle' }} />;

export const Ellipse = () => <Wrapped volumeProps={{ shape: 'ellipse' }} />;

export const Rotated = () => <Wrapped volumeProps={{ angle: 20 }} />;

export const Disabled = () => <Wrapped volumeProps={{ disabled: true }} />;
export const RectangleFontWeightNormal = () => <Wrapped volumeProps={{ fontWeight: 'normal' }} />;
