import styled from '@emotion/styled';
import { useTransform } from './useTransform';

const FONT_SIZE = 10;

const Root = styled('text')`
    fill: #808080;
`;

export interface TextProps {
    angle?: number;
    text: string;
    x?: number;
    y?: number;
}

export const Text = ({ text, x = 0, y = 0, angle = 0 }: TextProps) => (
    <Root
        fontSize={FONT_SIZE}
        transform={useTransform(x, y + FONT_SIZE * 10, angle, 0, 0)}
    >
        {text}
    </Root>
);
