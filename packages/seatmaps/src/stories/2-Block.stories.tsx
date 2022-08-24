import * as React from 'react';
import { useState } from 'react';
import { Area, Block, Row, Seat, Seatmap, SeatProps, SeatShape } from '../';

export default {
    title: 'Block',
    component: Block,
};

interface TenByTenProps {
    seatProps?: Partial<SeatProps> | (() => Partial<SeatProps>);
    active?: string[];
}

const TenByTen = ({seatProps = {}, active: defaultActive = []}: TenByTenProps) => {
    const [active, setActive] = useState<string[]>(defaultActive);
    const oneThroughTen = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const toggle = (rowName: string, seatName: string) => {
        const combined = `${rowName}/${seatName}`;
        const set = new Set(active);
        set.has(combined) ? set.delete(combined) : set.add(combined);
        setActive(Array.from(set));
    };
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
                    <Block>
                        {oneThroughTen.map((rowName, rowIndex) => (
                            <Row
                                key={rowIndex}
                                leftLabel={rowName}
                                rightLabel={rowName}
                                y={rowIndex * 100}
                            >
                                {oneThroughTen.map((seatName, seatIndex) => (
                                    <Seat
                                        key={seatIndex}
                                        name={seatName}
                                        color="#ff9900"
                                        x={seatIndex * 100}
                                        onClick={() => toggle(rowName, seatName)}
                                        active={active.indexOf(`${rowName}/${seatName}`) !== -1}
                                        hideName={seatIndex !== 0 && seatIndex !== 9}
                                        {...(typeof seatProps === 'function' ? seatProps() : seatProps)}
                                    />
                                ))}
                            </Row>
                        ))}
                    </Block>
                </Area>
            </Seatmap>
        </>
    );
};

export const Square = () => (
    <TenByTen seatProps={{shape: SeatShape.SQUARE}}/>
);

export const Circular = () => (
    <TenByTen seatProps={{shape: SeatShape.CIRCLE}}/>
);

export const ActiveSquare = () => (
    <TenByTen seatProps={{shape: SeatShape.SQUARE}} active={['3/6', '3/7', '3/8']}/>
);

export const ActiveCircular = () => (
    <TenByTen seatProps={{shape: SeatShape.CIRCLE}} active={['3/6', '3/7', '3/8']}/>
);

export const Disabled = () => (
    <TenByTen seatProps={{disabled: true}}/>
);
