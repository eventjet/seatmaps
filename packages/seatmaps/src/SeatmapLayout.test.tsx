import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import { SeatmapLayout, SeatmapLayoutData } from './SeatmapLayout';

const minimalData: SeatmapLayoutData = {
    areas: [],
};

describe('SeatmapLayout', () => {
    it('renders with empty areas', () => {
        const { getByRole } = render(<SeatmapLayout data={minimalData} />);

        expect(getByRole('group')).toBeDefined();
    });

    it('renders with default aria-label', () => {
        const { getByRole } = render(<SeatmapLayout data={minimalData} />);

        expect(getByRole('group').getAttribute('aria-label')).toBe('Seat map');
    });

    it('applies custom ariaLabel', () => {
        const { getByRole } = render(
            <SeatmapLayout
                data={minimalData}
                ariaLabel="My seatmap"
            />,
        );

        expect(getByRole('group').getAttribute('aria-label')).toBe('My seatmap');
    });

    it('applies className to root svg', () => {
        const { container } = render(
            <SeatmapLayout
                data={minimalData}
                className="custom-class"
            />,
        );

        expect(container.querySelector('svg.custom-class')).not.toBeNull();
    });

    it('renders seats and calls onBookableClick when a seat is clicked', () => {
        const data: SeatmapLayoutData = {
            areas: [
                {
                    blocks: [
                        {
                            rows: [
                                {
                                    seats: [{ id: 'seat-1', name: 'A1' }],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        const handleClick = vi.fn();
        const { getByText } = render(
            <SeatmapLayout
                data={data}
                onBookableClick={handleClick}
            />,
        );

        fireEvent.click(getByText('A1'));

        expect(handleClick).toHaveBeenCalledWith({ id: 'seat-1', type: 'seat', disabled: false });
    });

    it('calls onBookableClick with disabled=true when a disabled seat is clicked', () => {
        const data: SeatmapLayoutData = {
            areas: [
                {
                    blocks: [
                        {
                            rows: [
                                {
                                    seats: [{ id: 'seat-1', name: 'A1', disabled: true }],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        const handleClick = vi.fn();
        const { getByText } = render(
            <SeatmapLayout
                data={data}
                onBookableClick={handleClick}
            />,
        );

        fireEvent.click(getByText('A1'));

        expect(handleClick).toHaveBeenCalledWith({ id: 'seat-1', type: 'seat', disabled: true });
    });

    it('renders volumes and calls onBookableClick when a volume is clicked', () => {
        const data: SeatmapLayoutData = {
            areas: [
                {
                    volumes: [{ id: 'vol-1', label: 'GA', width: 200, height: 100 }],
                },
            ],
        };
        const handleClick = vi.fn();
        const { getByRole } = render(
            <SeatmapLayout
                data={data}
                onBookableClick={handleClick}
            />,
        );

        fireEvent.click(getByRole('button'));

        expect(handleClick).toHaveBeenCalledWith({ id: 'vol-1', type: 'volume', disabled: false });
    });

    it('calls onBookableClick with disabled=true when a disabled volume is clicked', () => {
        const data: SeatmapLayoutData = {
            areas: [
                {
                    volumes: [{ id: 'vol-1', label: 'GA', width: 200, height: 100, disabled: true }],
                },
            ],
        };
        const handleClick = vi.fn();
        const { getByRole } = render(
            <SeatmapLayout
                data={data}
                onBookableClick={handleClick}
            />,
        );

        fireEvent.click(getByRole('button'));

        expect(handleClick).toHaveBeenCalledWith({ id: 'vol-1', type: 'volume', disabled: true });
    });

    it('does not crash when onBookableClick is not provided', () => {
        const data: SeatmapLayoutData = {
            areas: [
                {
                    blocks: [{ rows: [{ seats: [{ id: 's1', name: '1' }] }] }],
                    volumes: [{ id: 'v1', width: 100, height: 100 }],
                },
            ],
        };

        expect(() => render(<SeatmapLayout data={data} />)).not.toThrow();
    });

    it('renders a badge on a disabled volume with availableSeats', () => {
        const data: SeatmapLayoutData = {
            areas: [
                {
                    volumes: [
                        {
                            id: 'vol-1',
                            label: 'GA',
                            width: 200,
                            height: 100,
                            disabled: true,
                            availableSeats: 5,
                            color: '#ff0000',
                        },
                    ],
                },
            ],
        };
        const { container } = render(<SeatmapLayout data={data} />);

        // Badge renders with the count text (aria-hidden text inside the badge)
        const badgeText = container.querySelector('text[aria-hidden="true"]');
        expect(badgeText?.textContent).toBe('5');
    });

    describe('name formatters', () => {
        it('formatAreaName applies to the area accessible label', () => {
            const data: SeatmapLayoutData = {
                areas: [{ name: 'Area 1', blocks: [] }],
            };
            const { getByRole } = render(
                <SeatmapLayout
                    data={data}
                    formatAreaName={({ name }) => `Section: ${name}`}
                />,
            );

            expect(getByRole('group', { name: 'Section: Area 1' })).toBeDefined();
        });

        it('formatRowName applies to the row accessible label but not the visual labels', () => {
            const data: SeatmapLayoutData = {
                areas: [
                    {
                        blocks: [
                            {
                                rows: [{ name: 'Row A', showLabels: 'both', seats: [{ id: 's1', name: '1' }] }],
                            },
                        ],
                    },
                ],
            };
            const { getByRole, getAllByText } = render(
                <SeatmapLayout
                    data={data}
                    formatRowName={({ name }) => `Row: ${name}`}
                />,
            );

            expect(getByRole('group', { name: 'Row: Row A' })).toBeDefined();
            expect(getAllByText('Row A').length).toBeGreaterThanOrEqual(2);
        });

        it('formatSeatName applies to the seat accessible label but not the visual name', () => {
            const data: SeatmapLayoutData = {
                areas: [{ blocks: [{ rows: [{ seats: [{ id: 's1', name: 'A1' }] }] }] }],
            };
            const { getByRole, getByText } = render(
                <SeatmapLayout
                    data={data}
                    formatSeatName={({ name }) => `Seat ${name}`}
                />,
            );

            expect(getByRole('button', { name: 'Seat A1' })).toBeDefined();
            expect(getByText('A1')).toBeDefined();
        });

        it('formatSeatName receives active state for active seats', () => {
            const data: SeatmapLayoutData = {
                areas: [{ blocks: [{ rows: [{ seats: [{ id: 's1', name: 'A1', active: true }] }] }] }],
            };
            const { getByRole, getByText } = render(
                <SeatmapLayout
                    data={data}
                    formatSeatName={({ name, active }) => (active ? `${name} – in your cart` : name)}
                />,
            );

            expect(getByRole('button', { name: 'A1 – in your cart' })).toBeDefined();
            expect(getByText('A1')).toBeDefined();
        });

        it('formatSeatName receives active=false for inactive seats', () => {
            const data: SeatmapLayoutData = {
                areas: [{ blocks: [{ rows: [{ seats: [{ id: 's1', name: 'A1', active: false }] }] }] }],
            };
            const { getByRole, getByText } = render(
                <SeatmapLayout
                    data={data}
                    formatSeatName={({ name, active }) => (active ? `${name} – in your cart` : name)}
                />,
            );

            expect(getByRole('button', { name: 'A1' })).toBeDefined();
            expect(getByText('A1')).toBeDefined();
        });

        it('formatSeatName receives disabled state', () => {
            const data: SeatmapLayoutData = {
                areas: [{ blocks: [{ rows: [{ seats: [{ id: 's1', name: 'A1', disabled: true }] }] }] }],
            };
            const { getByRole, getByText } = render(
                <SeatmapLayout
                    data={data}
                    formatSeatName={({ name, disabled }) => (disabled ? `${name} – unavailable` : name)}
                />,
            );

            expect(getByRole('button', { name: 'A1 – unavailable' })).toBeDefined();
            expect(getByText('A1')).toBeDefined();
        });

        it('formatVolumeLabel receives active state for active volumes', () => {
            const data: SeatmapLayoutData = {
                areas: [{ volumes: [{ id: 'v1', label: 'GA', width: 200, height: 100, active: true }] }],
            };
            const { getByRole, getByText } = render(
                <SeatmapLayout
                    data={data}
                    formatVolumeLabel={({ name, active }) => (active ? `${name} – in your cart` : name)}
                />,
            );

            expect(getByRole('button', { name: 'GA – in your cart' })).toBeDefined();
            expect(getByText('GA')).toBeDefined();
        });

        it('formatVolumeLabel applies to the volume accessible label but not the visual label', () => {
            const data: SeatmapLayoutData = {
                areas: [{ volumes: [{ id: 'v1', label: 'GA', width: 200, height: 100 }] }],
            };
            const { getByRole, getByText } = render(
                <SeatmapLayout
                    data={data}
                    formatVolumeLabel={({ name }) => `Area: ${name}`}
                />,
            );

            expect(getByRole('button', { name: 'Area: GA' })).toBeDefined();
            expect(getByText('GA')).toBeDefined();
        });
    });

    it('renders row labels when showLabels is set', () => {
        const data: SeatmapLayoutData = {
            areas: [
                {
                    blocks: [
                        {
                            rows: [
                                {
                                    name: 'Row A',
                                    showLabels: 'both',
                                    seats: [{ id: 's1', name: '1' }],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        const { getAllByText } = render(<SeatmapLayout data={data} />);

        // 'Row A' should appear as left and right labels
        expect(getAllByText('Row A').length).toBeGreaterThanOrEqual(2);
    });
});

describe('roving tabindex', () => {
    it('gives the first area tabIndex=0 and others tabIndex=-1 on initial render', () => {
        const data: SeatmapLayoutData = {
            areas: [
                { name: 'Area 1', blocks: [] },
                { name: 'Area 2', blocks: [] },
            ],
        };
        const { getByRole } = render(<SeatmapLayout data={data} />);

        expect(getByRole('group', { name: 'Area 1' }).getAttribute('tabindex')).toBe('0');
        expect(getByRole('group', { name: 'Area 2' }).getAttribute('tabindex')).toBe('-1');
    });

    it('all seats start with tabIndex=-1', () => {
        const data: SeatmapLayoutData = {
            areas: [{ blocks: [{ rows: [{ seats: [{ id: 's1', name: 'A1' }] }] }] }],
        };
        const { getByRole } = render(<SeatmapLayout data={data} />);

        expect(getByRole('button', { name: 'A1' }).getAttribute('tabindex')).toBe('-1');
    });

    it('ArrowDown on area moves focus to the next area', () => {
        const data: SeatmapLayoutData = {
            areas: [
                { name: 'Area 1', blocks: [] },
                { name: 'Area 2', blocks: [] },
            ],
        };
        const { getByRole } = render(<SeatmapLayout data={data} />);

        fireEvent.keyDown(getByRole('group', { name: 'Area 1' }), { key: 'ArrowDown' });

        expect(getByRole('group', { name: 'Area 2' }).getAttribute('tabindex')).toBe('0');
        expect(getByRole('group', { name: 'Area 1' }).getAttribute('tabindex')).toBe('-1');
    });

    it('ArrowUp on first area is a no-op', () => {
        const data: SeatmapLayoutData = {
            areas: [{ name: 'Area 1', blocks: [] }],
        };
        const { getByRole } = render(<SeatmapLayout data={data} />);

        fireEvent.keyDown(getByRole('group', { name: 'Area 1' }), { key: 'ArrowUp' });

        expect(getByRole('group', { name: 'Area 1' }).getAttribute('tabindex')).toBe('0');
    });

    it('Enter on area moves focus into the first enabled seat', () => {
        const data: SeatmapLayoutData = {
            areas: [
                {
                    name: 'Area 1',
                    blocks: [{ rows: [{ seats: [{ id: 's1', name: 'A1' }] }] }],
                },
            ],
        };
        const { getByRole } = render(<SeatmapLayout data={data} />);

        fireEvent.keyDown(getByRole('group', { name: 'Area 1' }), { key: 'Enter' });

        expect(getByRole('button', { name: 'A1' }).getAttribute('tabindex')).toBe('0');
        expect(getByRole('group', { name: 'Area 1' }).getAttribute('tabindex')).toBe('-1');
    });

    it('ArrowRight on seat moves to the next seat', () => {
        const data: SeatmapLayoutData = {
            areas: [
                {
                    name: 'Area 1',
                    blocks: [
                        {
                            rows: [
                                {
                                    seats: [
                                        { id: 's1', name: 'A1' },
                                        { id: 's2', name: 'A2' },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        const { getByRole } = render(<SeatmapLayout data={data} />);

        fireEvent.keyDown(getByRole('group', { name: 'Area 1' }), { key: 'Enter' });
        fireEvent.keyDown(getByRole('button', { name: 'A1' }), { key: 'ArrowRight' });

        expect(getByRole('button', { name: 'A2' }).getAttribute('tabindex')).toBe('0');
        expect(getByRole('button', { name: 'A1' }).getAttribute('tabindex')).toBe('-1');
    });

    it('ArrowLeft from the first seat of a row wraps to the last seat of the previous row', () => {
        const data: SeatmapLayoutData = {
            areas: [
                {
                    name: 'Area 1',
                    blocks: [
                        {
                            rows: [
                                {
                                    seats: [
                                        { id: 's1', name: 'A1' },
                                        { id: 's2', name: 'A2' },
                                    ],
                                },
                                {
                                    seats: [
                                        { id: 's3', name: 'B1' },
                                        { id: 's4', name: 'B2' },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        const { getByRole } = render(<SeatmapLayout data={data} />);

        fireEvent.keyDown(getByRole('group', { name: 'Area 1' }), { key: 'Enter' }); // → A1
        fireEvent.keyDown(getByRole('button', { name: 'A1' }), { key: 'ArrowDown' }); // → B1
        fireEvent.keyDown(getByRole('button', { name: 'B1' }), { key: 'ArrowLeft' }); // → A2 (last of prev row)

        expect(getByRole('button', { name: 'A2' }).getAttribute('tabindex')).toBe('0');
    });

    it('ArrowDown moves to the same-index seat in the next row', () => {
        const data: SeatmapLayoutData = {
            areas: [
                {
                    name: 'Area 1',
                    blocks: [
                        {
                            rows: [
                                {
                                    seats: [
                                        { id: 's1', name: 'A1' },
                                        { id: 's2', name: 'A2' },
                                    ],
                                },
                                {
                                    seats: [
                                        { id: 's3', name: 'B1' },
                                        { id: 's4', name: 'B2' },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        const { getByRole } = render(<SeatmapLayout data={data} />);

        fireEvent.keyDown(getByRole('group', { name: 'Area 1' }), { key: 'Enter' }); // → A1
        fireEvent.keyDown(getByRole('button', { name: 'A1' }), { key: 'ArrowDown' }); // → B1

        expect(getByRole('button', { name: 'B1' }).getAttribute('tabindex')).toBe('0');
    });

    it('ArrowUp moves to the same-index seat in the previous row', () => {
        const data: SeatmapLayoutData = {
            areas: [
                {
                    name: 'Area 1',
                    blocks: [
                        {
                            rows: [
                                {
                                    seats: [
                                        { id: 's1', name: 'A1' },
                                        { id: 's2', name: 'A2' },
                                    ],
                                },
                                {
                                    seats: [
                                        { id: 's3', name: 'B1' },
                                        { id: 's4', name: 'B2' },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        const { getByRole } = render(<SeatmapLayout data={data} />);

        fireEvent.keyDown(getByRole('group', { name: 'Area 1' }), { key: 'Enter' }); // → A1
        fireEvent.keyDown(getByRole('button', { name: 'A1' }), { key: 'ArrowDown' }); // → B1
        fireEvent.keyDown(getByRole('button', { name: 'B1' }), { key: 'ArrowUp' }); // → A1

        expect(getByRole('button', { name: 'A1' }).getAttribute('tabindex')).toBe('0');
    });

    it('Escape from seat returns to area', () => {
        const data: SeatmapLayoutData = {
            areas: [
                {
                    name: 'Area 1',
                    blocks: [{ rows: [{ seats: [{ id: 's1', name: 'A1' }] }] }],
                },
            ],
        };
        const { getByRole } = render(<SeatmapLayout data={data} />);

        fireEvent.keyDown(getByRole('group', { name: 'Area 1' }), { key: 'Enter' });
        fireEvent.keyDown(getByRole('button', { name: 'A1' }), { key: 'Escape' });

        expect(getByRole('group', { name: 'Area 1' }).getAttribute('tabindex')).toBe('0');
        expect(getByRole('button', { name: 'A1' }).getAttribute('tabindex')).toBe('-1');
    });

    it('focusing a seat by click syncs focusPosition to that seat', () => {
        const data: SeatmapLayoutData = {
            areas: [
                {
                    name: 'Area 1',
                    blocks: [
                        {
                            rows: [
                                {
                                    seats: [
                                        { id: 's1', name: 'A1' },
                                        { id: 's2', name: 'A2' },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        const { getByRole } = render(<SeatmapLayout data={data} />);

        fireEvent.focus(getByRole('button', { name: 'A2' }));

        expect(getByRole('button', { name: 'A2' }).getAttribute('tabindex')).toBe('0');
        expect(getByRole('button', { name: 'A1' }).getAttribute('tabindex')).toBe('-1');
        expect(getByRole('group', { name: 'Area 1' }).getAttribute('tabindex')).toBe('-1');
    });

    it('disabled seats are skipped when navigating with ArrowRight', () => {
        const data: SeatmapLayoutData = {
            areas: [
                {
                    name: 'Area 1',
                    blocks: [
                        {
                            rows: [
                                {
                                    seats: [
                                        { id: 's1', name: 'A1' },
                                        { id: 's2', name: 'A2', disabled: true },
                                        { id: 's3', name: 'A3' },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        const { getByRole } = render(<SeatmapLayout data={data} />);

        fireEvent.keyDown(getByRole('group', { name: 'Area 1' }), { key: 'Enter' }); // → A1
        fireEvent.keyDown(getByRole('button', { name: 'A1' }), { key: 'ArrowRight' }); // skips A2 → A3

        expect(getByRole('button', { name: 'A3' }).getAttribute('tabindex')).toBe('0');
    });

    it('Enter on an empty area is a no-op', () => {
        const data: SeatmapLayoutData = {
            areas: [{ name: 'Area 1', blocks: [] }],
        };
        const { getByRole } = render(<SeatmapLayout data={data} />);

        fireEvent.keyDown(getByRole('group', { name: 'Area 1' }), { key: 'Enter' });

        // Still on the area
        expect(getByRole('group', { name: 'Area 1' }).getAttribute('tabindex')).toBe('0');
    });

    it('Enter on area with only disabled seats falls through to volumes', () => {
        const data: SeatmapLayoutData = {
            areas: [
                {
                    name: 'Area 1',
                    blocks: [{ rows: [{ seats: [{ id: 's1', name: 'A1', disabled: true }] }] }],
                    volumes: [{ id: 'v1', label: 'GA', width: 100, height: 100 }],
                },
            ],
        };
        const { getByRole } = render(<SeatmapLayout data={data} />);

        fireEvent.keyDown(getByRole('group', { name: 'Area 1' }), { key: 'Enter' });

        expect(getByRole('button', { name: 'GA' }).getAttribute('tabindex')).toBe('0');
    });

    it('Escape from volume returns to area', () => {
        const data: SeatmapLayoutData = {
            areas: [
                {
                    name: 'Area 1',
                    volumes: [{ id: 'v1', label: 'GA', width: 100, height: 100 }],
                },
            ],
        };
        const { getByRole } = render(<SeatmapLayout data={data} />);

        fireEvent.keyDown(getByRole('group', { name: 'Area 1' }), { key: 'Enter' });
        fireEvent.keyDown(getByRole('button', { name: 'GA' }), { key: 'Escape' });

        expect(getByRole('group', { name: 'Area 1' }).getAttribute('tabindex')).toBe('0');
        expect(getByRole('button', { name: 'GA' }).getAttribute('tabindex')).toBe('-1');
    });
});
