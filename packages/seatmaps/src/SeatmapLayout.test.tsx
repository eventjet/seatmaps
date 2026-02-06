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
