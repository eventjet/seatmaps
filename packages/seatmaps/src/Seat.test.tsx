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

describe('accessibility', () => {
    it('has role="button"', () => {
        const { getByRole } = render(
            <svg>
                <Seat name="1" />
            </svg>,
        );

        expect(getByRole('button')).toBeDefined();
    });

    it('is focusable with tabIndex', () => {
        const { getByRole } = render(
            <svg>
                <Seat name="1" />
            </svg>,
        );

        expect(getByRole('button').getAttribute('tabindex')).toBe('0');
    });

    it('is not focusable when disabled', () => {
        const { getByRole } = render(
            <svg>
                <Seat
                    name="1"
                    disabled={true}
                />
            </svg>,
        );

        expect(getByRole('button').getAttribute('tabindex')).toBe('-1');
    });

    it('has aria-label from name prop', () => {
        const { getByRole } = render(
            <svg>
                <Seat name="A5" />
            </svg>,
        );

        expect(getByRole('button').getAttribute('aria-label')).toBe('A5');
    });

    it('has aria-pressed when active', () => {
        const { getByRole } = render(
            <svg>
                <Seat
                    name="1"
                    active={true}
                />
            </svg>,
        );

        expect(getByRole('button').getAttribute('aria-pressed')).toBe('true');
    });

    it('has aria-pressed=false when not active', () => {
        const { getByRole } = render(
            <svg>
                <Seat
                    name="1"
                    active={false}
                />
            </svg>,
        );

        expect(getByRole('button').getAttribute('aria-pressed')).toBe('false');
    });

    it('has aria-disabled when disabled', () => {
        const { getByRole } = render(
            <svg>
                <Seat
                    name="1"
                    disabled={true}
                />
            </svg>,
        );

        expect(getByRole('button').getAttribute('aria-disabled')).toBe('true');
    });

    it('responds to Enter key', () => {
        const handleClick = vi.fn();
        const { getByRole } = render(
            <svg>
                <Seat
                    name="1"
                    onClick={handleClick}
                />
            </svg>,
        );

        fireEvent.keyDown(getByRole('button'), { key: 'Enter' });

        expect(handleClick).toHaveBeenCalled();
    });

    it('responds to Space key', () => {
        const handleClick = vi.fn();
        const { getByRole } = render(
            <svg>
                <Seat
                    name="1"
                    onClick={handleClick}
                />
            </svg>,
        );

        fireEvent.keyDown(getByRole('button'), { key: ' ' });

        expect(handleClick).toHaveBeenCalled();
    });

    it('does not respond to Enter key when disabled', () => {
        const handleClick = vi.fn();
        const { getByRole } = render(
            <svg>
                <Seat
                    name="1"
                    disabled={true}
                    onClick={handleClick}
                />
            </svg>,
        );

        fireEvent.keyDown(getByRole('button'), { key: 'Enter' });

        expect(handleClick).not.toHaveBeenCalled();
    });
});
