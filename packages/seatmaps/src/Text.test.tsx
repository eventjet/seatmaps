import { render } from '@testing-library/react';
import { Text } from './Text';

describe('Text accessibility', () => {
    it('has aria-hidden="true"', () => {
        const { container } = render(
            <svg>
                <Text text="Stage" />
            </svg>,
        );

        const textElement = container.querySelector('text');
        expect(textElement?.getAttribute('aria-hidden')).toBe('true');
    });
});
