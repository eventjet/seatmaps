import * as React from 'react';
import { useState } from 'react';
import {
    SeatmapBookableClickEvent,
    SeatmapLayout,
    SeatmapLayoutData,
    SeatmapSeatData,
    SeatmapVolumeData,
} from '../SeatmapLayout';
import { SeatShape } from '../Seat';

export default {
    title: 'SeatmapLayout',
    component: SeatmapLayout,
};

const initialData: SeatmapLayoutData = {
    decorations: [
        { type: 'rectangle', height: 1200, width: 700, x: -200, color: 'rgba(0, 0, 255, .12)' },
        { type: 'text', text: 'Stage', x: 0, y: -100 },
    ],
    areas: [
        {
            name: 'Main Hall',
            blocks: [
                {
                    y: 200,
                    rows: [
                        {
                            name: 'A',
                            showLabels: 'both',
                            seats: [
                                { id: 'a-1', name: '1', x: 0, color: '#ff9900', shape: SeatShape.CIRCLE },
                                { id: 'a-2', name: '2', x: 100, color: '#ff9900', shape: SeatShape.CIRCLE },
                                { id: 'a-3', name: '3', x: 200, color: '#ff9900', shape: SeatShape.CIRCLE },
                                { id: 'a-4', name: '4', x: 300, color: '#ff9900', shape: SeatShape.CIRCLE },
                                { id: 'a-5', name: '5', x: 400, color: '#ff9900', shape: SeatShape.CIRCLE },
                            ],
                        },
                        {
                            y: 100,
                            name: 'B',
                            showLabels: 'left',
                            seats: [
                                { id: 'b-1', name: '1', x: 0, color: '#00ff99' },
                                { id: 'b-2', name: '2', x: 100, color: '#00ff99' },
                                { id: 'b-3', name: '3', x: 200, color: '#00ff99' },
                                { id: 'b-4', name: '4', x: 300, color: '#00ff99', disabled: true },
                                { id: 'b-5', name: '5', x: 400, color: '#00ff99' },
                            ],
                        },
                    ],
                },
            ],
            volumes: [
                {
                    id: 'vol-rect',
                    label: 'Table 1',
                    width: 400,
                    height: 200,
                    x: 700,
                    color: '#ff9900',
                    availableSeats: 15,
                },
                {
                    id: 'vol-ellipse',
                    label: 'Table 2',
                    width: 300,
                    height: 200,
                    x: 700,
                    y: 300,
                    color: '#00ff99',
                    shape: 'ellipse',
                    availableSeats: 8,
                },
                {
                    id: 'vol-big-ellipse',
                    label: 'Standing Area',
                    width: 1200,
                    height: 200,
                    x: 700,
                    y: 600,
                    color: '#ff0099',
                    shape: 'ellipse',
                    availableSeats: 250,
                },
                {
                    id: 'vol-disabled',
                    label: 'Sold Out',
                    width: 400,
                    height: 200,
                    x: 700,
                    y: 900,
                    color: '#808080',
                    disabled: true,
                },
            ],
        },
    ],
};

const toggleSeat = (data: SeatmapLayoutData, seatId: string): SeatmapLayoutData => ({
    ...data,
    areas: data.areas.map((area) => ({
        ...area,
        blocks: area.blocks?.map((block) => ({
            ...block,
            rows: block.rows.map((row) => ({
                ...row,
                seats: row.seats.map(
                    (seat): SeatmapSeatData => (seat.id === seatId ? { ...seat, active: !seat.active } : seat),
                ),
            })),
        })),
    })),
});

const toggleVolume = (data: SeatmapLayoutData, volumeId: string): SeatmapLayoutData => ({
    ...data,
    areas: data.areas.map((area) => ({
        ...area,
        volumes: area.volumes?.map(
            (vol): SeatmapVolumeData => (vol.id === volumeId ? { ...vol, active: !vol.active } : vol),
        ),
    })),
});

export const Default = () => {
    const [data, setData] = useState(initialData);

    const handleBookableClick = ({ id, type, disabled }: SeatmapBookableClickEvent) => {
        if (disabled) {
            return;
        }
        setData((prev) => (type === 'seat' ? toggleSeat(prev, id) : toggleVolume(prev, id)));
    };

    return (
        <>
            <style type="text/css">{`
                .seatmap-layout {
                    width: 800px;
                    height: 600px;
                }
            `}</style>
            <SeatmapLayout
                data={data}
                className="seatmap-layout"
                onBookableClick={handleBookableClick}
            />
        </>
    );
};
