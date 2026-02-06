import styled from '@emotion/styled';
import { textCss } from './textCss';

/**
 * Props for the {@link Badge} component.
 * @public
 */
export interface BadgeProps {
    /** The number to display inside the badge. */
    count: number;
    /** Background color of the badge. Defaults to `#808080`. */
    color?: string;
    /** Y position of the badge center in SVG units. */
    y: number;
    /** X position of the badge center in SVG units. */
    x: number;
}

// radius currently fixed, as the font size would also have to be adjusted when changing the radius
const CIRCLE_RADIUS = 5;

const Name = styled('text')`
    ${textCss}
    dominant-baseline: middle;
    text-anchor: middle;
    fill: black;
`;

const StyledCircle = styled.circle<{ color: string }>`
    fill: ${({ color }) => color};
    filter: drop-shadow(-0.25px 1.5px 1px rgb(0 0 0 / 0.2));
`;

const StyledTextOverlayCircle = styled.circle`
    fill: rgba(255, 255, 255, 0.54);
`;

/**
 * A circular badge for displaying numeric counts.
 *
 * Renders as a filled circle with a semi-transparent overlay and centered text.
 * Commonly used with {@link SeatCountBadge} to show available seat counts on volumes.
 *
 * @example
 * ```tsx
 * <Badge x={50} y={50} count={12} color="#4a90d9" />
 * ```
 *
 * @public
 */
export const Badge = ({ x, y, count = 0, color = '#808080' }: BadgeProps) => {
    return (
        <>
            <StyledCircle
                cx={x}
                cy={y}
                r={CIRCLE_RADIUS}
                color={color}
                filter="url(#f2)"
                aria-hidden="true"
            />
            <StyledTextOverlayCircle
                cx={x}
                cy={y}
                r={CIRCLE_RADIUS}
                aria-hidden="true"
            />
            <Name
                x={x}
                y={y}
                aria-hidden="true"
            >
                {count}
            </Name>
        </>
    );
};
