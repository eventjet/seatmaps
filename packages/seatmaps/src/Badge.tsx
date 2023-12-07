import styled from '@emotion/styled';
import { textCss } from './textCss';

export interface BadgeProps {
    count: number;
    color?: string;
    y: number;
    x: number;
}

// radius currently fixed, as the font size would also have to be adjusted when changing the radius
const CIRCLE_RADIUS = 6;

const Name = styled('text')`
    ${textCss}
    dominant-baseline: middle;
    text-anchor: middle;
    fill: black;
    font-size: 5px;
`;

const StyledCircle = styled.circle<{ color: string }>`
    fill: ${({ color }) => color};
    filter: drop-shadow(-0.25px 1.5px 1px rgb(0 0 0 / 0.2));
`;
const StyledTextOverlayCircle = styled.circle`
    fill: rgba(255, 255, 255, 0.54);
`;

export const Badge = ({ x, y, count = 0, color = '#808080' }: BadgeProps) => {
    return (
        <>
            <StyledCircle
                cx={x}
                cy={y}
                r={CIRCLE_RADIUS}
                color={color}
                filter="url(#f2)"
            />
            <StyledTextOverlayCircle
                cx={x}
                cy={y}
                r={CIRCLE_RADIUS}
            />
            <Name
                x={x}
                y={y}
            >
                {count}
            </Name>
        </>
    );
};
