import * as React from 'react';
import { Area, Block, Row, Seat, Seatmap, SeatShape } from '../src';

export default {
    title: 'Seat',
    component: Seat,
};

export const LongNames = () => (
    <>
        <p>Seat labels get smaller when there is at least one long name.</p>
        <style type="text/css">{`
            .seatmap {
                width: 150px;
                height: 30px;
            }
        `}</style>
        <Seatmap className="seatmap">
            <Area>
                <Block>
                    <Row>
                        <Seat name="60" shape={SeatShape.CIRCLE} color="#900"/>
                        <Seat name="160" shape={SeatShape.CIRCLE} color="#900" x={100}/>
                        <Seat name="80" shape={SeatShape.CIRCLE} color="#900" x={200}/>
                        <Seat name="240" shape={SeatShape.SQUARE} color="#900" x={300}/>
                        <Seat name="75" shape={SeatShape.SQUARE} color="#900" x={400}/>
                    </Row>
                </Block>
            </Area>
        </Seatmap>
    </>
);
