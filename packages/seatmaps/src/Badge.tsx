import styled from '@emotion/styled';
import { textCss } from './textCss';

export interface BadgeProps {
    count: number;
    color?: string;
    y: number;
    x: number;
}

// radius currently fixed, as the font size would also have to be adjusted when changing the radius
const CIRCLE_RADIUS = 4;

const Name = styled('text')`
    ${textCss}
    dominant-baseline: middle;
    text-anchor: middle;
    fill: black;
    font-size: 4px;
`;

const StyledCircle = styled.circle<{ color: string }>`
    fill: ${({ color }) => color};
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
            <Name
                x={x}
                y={y}
            >
                {count}
            </Name>
        </>
    );
};
