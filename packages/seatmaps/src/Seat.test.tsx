import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import { Seat } from './Seat';

it('reports clicks', () => {
    const handleClick = vi.fn();
    const { getByText } = render(
        <svg>
            <Seat
                name="23"
                onClick={handleClick}
            />
        </svg>,
    );

    fireEvent.click(getByText('23'));

    expect(handleClick).toHaveBeenCalled();
});

it('does not report a click if it is disabled', () => {
    const handleClick = vi.fn();
    const { getByText } = render(
        <svg>
            <Seat
                name="23"
                disabled={true}
                onClick={handleClick}
            />
        </svg>,
    );

    fireEvent.click(getByText('23'));

    expect(handleClick).not.toHaveBeenCalled();
});
