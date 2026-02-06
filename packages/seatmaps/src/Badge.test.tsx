import { render } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge accessibility', () => {
    it('has aria-hidden="true"', () => {
        const { container } = render(
            <svg>
                <Badge
                    x={50}
                    y={50}
                    count={12}
                />
            </svg>,
        );

        const group = container.querySelector('g');
        expect(group?.getAttribute('aria-hidden')).toBe('true');
    });
});
