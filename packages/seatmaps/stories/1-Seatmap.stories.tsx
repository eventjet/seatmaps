import * as React from 'react';
import { Area, Block, Rectangle, Row, Seat, Seatmap, SeatShape, Text, Volume } from '../src';
import ref from './complex-example-reference.png';

export default {
    title: 'Seatmap',
    component: Seatmap,
};

export const ComplexExample = () => (
    <>
        <style type="text/css">{`
            .seatmap {
                width: 600px;
                height: 450px;
            }
        `}</style>
        <Seatmap className="seatmap">
            <Rectangle height={1200} width={700} x={-200} color="rgba(0, 0, 255, .12)"/>
            <Rectangle height={410} width={410} x={1145} y={245} color="#00000080"/>
            <Rectangle height={320} width={320} x={1190} y={740} color="#00000080"/>
            <Area>
                <Text text="An Area"/>
                <Block y={200}>
                    <Row>
                        <Seat name="1" x={0} color="#ff9900" shape={SeatShape.CIRCLE}/>
                        <Seat name="2" x={100} color="#ff9900" shape={SeatShape.CIRCLE} active={true}/>
                        <Seat name="3" x={200} color="#ff9900" shape={SeatShape.CIRCLE} disabled={true}/>
                    </Row>
                    <Row y={100} leftLabel="R1" rightLabel="R1">
                        <Seat name="1" x={0} color="#ff9900" shape={SeatShape.CIRCLE}/>
                        <Seat name="2" x={100} color="#ff9900" shape={SeatShape.CIRCLE} active={true}/>
                        <Seat name="3" x={200} color="#ff9900" shape={SeatShape.CIRCLE} disabled={true}/>
                    </Row>
                    <Row y={200} rightLabel="R2">
                        <Seat name="1" x={0} color="#00ff99" active={true} shape={SeatShape.CIRCLE}/>
                        <Seat name="2" x={100} color="#00ff99" active={true}/>
                        <Seat name="3" x={200} color="#00ff99" active={true} disabled={true}/>
                    </Row>
                    <Row y={300} leftLabel="R3" x={100}>
                        <Seat name="1" x={0} color="#ff0099" disabled={true} shape={SeatShape.CIRCLE}/>
                        <Seat name="2" x={100} color="#ff0099" disabled={true} active={true}/>
                        <Seat name="3" x={200} color="#ff0099" disabled={true}/>
                    </Row>
                    <Row y={400}>
                        <Seat name="1" x={0} color="#ff9900" shape={SeatShape.CIRCLE} hideName={true}/>
                        <Seat name="2" x={100} color="#ff9900" shape={SeatShape.CIRCLE} active={true} hideName={true}/>
                        <Seat
                            name="3" x={200} color="#ff9900" shape={SeatShape.CIRCLE} disabled={true} hideName={true}
                        />
                    </Row>
                    <Row y={500} leftLabel="R5" rightLabel="R5">
                        <Seat name="1" x={0} color="#ff9900" shape={SeatShape.CIRCLE} hideName={true}/>
                        <Seat name="2" x={100} color="#ff9900" shape={SeatShape.CIRCLE} active={true} hideName={true}/>
                        <Seat
                            name="3" x={200} color="#ff9900" shape={SeatShape.CIRCLE} disabled={true} hideName={true}
                        />
                    </Row>
                    <Row y={600} rightLabel="R6">
                        <Seat name="1" x={0} color="#00ff99" active={true} shape={SeatShape.CIRCLE} hideName={true}/>
                        <Seat name="2" x={100} color="#00ff99" active={true} hideName={true}/>
                        <Seat name="3" x={200} color="#00ff99" active={true} disabled={true} hideName={true}/>
                    </Row>
                    <Row y={700} leftLabel="R7" x={100}>
                        <Seat name="1" x={0} color="#ff0099" disabled={true} shape={SeatShape.CIRCLE} hideName={true}/>
                        <Seat name="2" x={100} color="#ff0099" disabled={true} active={true} hideName={true} y={100}/>
                        <Seat name="3" x={200} color="#ff0099" disabled={true} hideName={true}/>
                    </Row>
                    <Volume height={200} width={400} x={700} label="Table 69" color="#ff9900"/>
                    <Volume height={200} width={400} x={700} y={300} label="Table 42" color="#00ff99" active={true}/>
                    <Volume
                        height={200}
                        width={400}
                        x={700}
                        y={600}
                        label="Table 23"
                        color="#ff9900"
                        disabled={true}
                        shape={'ellipse'}
                    />
                    <Volume height={200} width={400} x={1150} y={150} label="Rota!" color="#ff0099" angle={45}/>
                    <Volume
                        height={200}
                        width={400}
                        x={1150}
                        y={600}
                        label="Rota!"
                        color="#ff0099"
                        angle={45}
                        shape={'ellipse'}
                    />
                </Block>
            </Area>
        </Seatmap>
        <img src={ref}/>
    </>
);
