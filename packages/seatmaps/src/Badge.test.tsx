import { render } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge accessibility', () => {
    it('has aria-hidden="true" on all child elements', () => {
        const { container } = render(
            <svg>
                <Badge
                    x={50}
                    y={50}
                    count={12}
                />
            </svg>,
        );

        const svg = container.querySelector('svg')!;
        for (const child of svg.children) {
            expect(child.getAttribute('aria-hidden')).toBe('true');
        }
    });
});
