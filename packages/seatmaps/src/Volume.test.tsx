import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import { Volume } from './Volume';

describe('Volume', () => {
    it('reports clicks', () => {
        const handleClick = vi.fn();
        const { getByRole } = render(
            <svg>
                <Volume
                    width={100}
                    height={100}
                    label="GA"
                    onClick={handleClick}
                />
            </svg>,
        );

        fireEvent.click(getByRole('button'));

        expect(handleClick).toHaveBeenCalled();
    });

    it('does not report a click if it is disabled', () => {
        const handleClick = vi.fn();
        const { getByRole } = render(
            <svg>
                <Volume
                    width={100}
                    height={100}
                    label="GA"
                    disabled={true}
                    onClick={handleClick}
                />
            </svg>,
        );

        fireEvent.click(getByRole('button'));

        expect(handleClick).not.toHaveBeenCalled();
    });
});

describe('Volume accessibility', () => {
    it('has role="button"', () => {
        const { getByRole } = render(
            <svg>
                <Volume
                    width={100}
                    height={100}
                />
            </svg>,
        );

        expect(getByRole('button')).toBeDefined();
    });

    it('is focusable with tabIndex=0', () => {
        const { getByRole } = render(
            <svg>
                <Volume
                    width={100}
                    height={100}
                />
            </svg>,
        );

        expect(getByRole('button').getAttribute('tabindex')).toBe('0');
    });

    it('has tabIndex=-1 when disabled', () => {
        const { getByRole } = render(
            <svg>
                <Volume
                    width={100}
                    height={100}
                    disabled={true}
                />
            </svg>,
        );

        expect(getByRole('button').getAttribute('tabindex')).toBe('-1');
    });

    it('has aria-label from label prop', () => {
        const { getByRole } = render(
            <svg>
                <Volume
                    width={100}
                    height={100}
                    label="General Admission"
                />
            </svg>,
        );

        expect(getByRole('button').getAttribute('aria-label')).toBe('General Admission');
    });

    it('has default aria-label when no label provided', () => {
        const { getByRole } = render(
            <svg>
                <Volume
                    width={100}
                    height={100}
                />
            </svg>,
        );

        expect(getByRole('button').getAttribute('aria-label')).toBe('Volume');
    });

    it('has aria-pressed when active', () => {
        const { getByRole } = render(
            <svg>
                <Volume
                    width={100}
                    height={100}
                    active={true}
                />
            </svg>,
        );

        expect(getByRole('button').getAttribute('aria-pressed')).toBe('true');
    });

    it('has aria-pressed=false when not active', () => {
        const { getByRole } = render(
            <svg>
                <Volume
                    width={100}
                    height={100}
                    active={false}
                />
            </svg>,
        );

        expect(getByRole('button').getAttribute('aria-pressed')).toBe('false');
    });

    it('has aria-disabled when disabled', () => {
        const { getByRole } = render(
            <svg>
                <Volume
                    width={100}
                    height={100}
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
                <Volume
                    width={100}
                    height={100}
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
                <Volume
                    width={100}
                    height={100}
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
                <Volume
                    width={100}
                    height={100}
                    disabled={true}
                    onClick={handleClick}
                />
            </svg>,
        );

        fireEvent.keyDown(getByRole('button'), { key: 'Enter' });

        expect(handleClick).not.toHaveBeenCalled();
    });

    it('works with ellipse shape', () => {
        const handleClick = vi.fn();
        const { getByRole } = render(
            <svg>
                <Volume
                    width={100}
                    height={100}
                    shape="ellipse"
                    onClick={handleClick}
                />
            </svg>,
        );

        expect(getByRole('button').getAttribute('tabindex')).toBe('0');
        fireEvent.keyDown(getByRole('button'), { key: 'Enter' });
        expect(handleClick).toHaveBeenCalled();
    });
});
