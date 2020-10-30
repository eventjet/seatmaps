import * as React from 'react';
import { Area, Block, Row, Seat, Seatmap } from '../src';

export default {
    title: 'Row',
    component: Row,
};

export const LabelsMoveWithSeats = () => (
    <>
        <style type="text/css">{`
            .seatmap {
                width: 300px;
                height: 300px;
            }
        `}</style>
        <Seatmap className="seatmap">
            <Area>
                <Block>
                    <Row leftLabel="12" rightLabel="12">
                        <Seat name="60" x={300} y={100}/>
                        <Seat name="160" x={400}/>
                        <Seat name="80" x={500} y={-100}/>
                        <Seat name="240" x={600}/>
                        <Seat name="75" x={700} y={100}/>
                    </Row>
                </Block>
            </Area>
        </Seatmap>
    </>
);
