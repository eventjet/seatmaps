import { useTransform } from './useTransform';
import './Text.css';

const FONT_SIZE = 10;

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
    <text
        className="ej-seatmaps-text"
        fontSize={FONT_SIZE}
        transform={useTransform(x, y + FONT_SIZE * 10, angle, 0, 0)}
    >
        {text}
    </text>
);
