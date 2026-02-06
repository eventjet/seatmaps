import styled from '@emotion/styled';
import { getTransform } from './transform';

const FONT_SIZE = 10;

const Root = styled('text')`
    fill: #808080;
`;

/**
 * Props for the {@link Text} component.
 * @public
 */
export interface TextProps {
    /** Rotation angle in degrees. Rotates around the text's position. */
    angle?: number;
    /** The text content to display. */
    text: string;
    /** X position of the text in seatmap units. Defaults to `0`. */
    x?: number;
    /** Y position of the text in seatmap units. Defaults to `0`. */
    y?: number;
}

/**
 * A decorative text label.
 *
 * This is a structural element with no identity in the ticketing system.
 * Rendered in gray with a fixed font size. Supports rotation.
 *
 * @example
 * ```tsx
 * <Text text="Stage" x={100} y={50} />
 * ```
 *
 * @public
 */
export const Text = ({ text, x = 0, y = 0, angle = 0 }: TextProps) => (
    <Root
        fontSize={FONT_SIZE}
        transform={getTransform(x, y + FONT_SIZE * 10, angle, 0, 0)}
        aria-hidden="true"
    >
        {text}
    </Root>
);
