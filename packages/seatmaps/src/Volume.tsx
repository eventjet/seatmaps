import styled from '@emotion/styled';
import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import { l } from './length';
import { textCss } from './textCss';
import { useTransform } from './useTransform';
import { noop } from './util/noop';

const SCRIM_HEIGHT = 10;
const HORIZONTAL_SCRIM_PADDING = 3;

const StyledRoot = styled.g`
    @keyframes active-keyframes {
        from {
            stroke-dashoffset: 0;
        }
        to {
            stroke-dashoffset: 7;
        }
    }

    cursor: default;

    &.clickable {
        cursor: pointer;
    }

    &.active .shape {
        stroke-dasharray: 3, 4;
        animation: active-keyframes 1s linear infinite;
        stroke: black;
        stroke-width: 1;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
`;

const Name = styled('text')`
    ${textCss}
    dominant-baseline: central;
    fill: black;
`;

const StyledScrim = styled.rect`
    fill: rgba(255, 255, 255, 0.54);
`;

interface ScrimProps {
    anchor?: 'center' | 'bottom-left';
    text: string;
    width?: number | 'auto';
    x: number;
    y: number;
}

const Scrim = ({ width = 'auto', x, y, text, anchor = 'bottom-left' }: ScrimProps) => {
    const textRef = useRef<SVGTextElement>(null);
    const [textWidth, setTextWidth] = useState(0);
    useEffect(() => {
        if (textRef.current === null || width !== 'auto') {
            return;
        }
        setTextWidth(textRef.current.getBBox().width);
    }, [width]);
    const scrimWidth = (() => {
        if (width !== 'auto') {
            return width;
        }
        if (textWidth === undefined) {
            return 0;
        }
        return textWidth + HORIZONTAL_SCRIM_PADDING * 2;
    })();
    const actualX = anchor === 'bottom-left' ? x : x - scrimWidth / 2;
    const actualY = anchor === 'bottom-left' ? y - SCRIM_HEIGHT : y - SCRIM_HEIGHT / 2;
    return (
        <>
            <StyledScrim
                width={scrimWidth}
                height={SCRIM_HEIGHT}
                x={actualX}
                y={actualY}
            />
            <Name
                x={actualX + HORIZONTAL_SCRIM_PADDING}
                y={actualY + SCRIM_HEIGHT / 2}
                ref={textRef}
            >
                {text}
            </Name>
        </>
    );
};

export interface VolumeProps {
    active?: boolean;
    angle?: number;
    className?: string;
    color?: string;
    disabled?: boolean;
    height: number;
    label?: string;
    onClick?: () => void;
    shape?: 'rectangle' | 'ellipse';
    width: number;
    x?: number;
    y?: number;
    children?: ReactNode;
    fontWeight?: CSSProperties['fontWeight'];
}

const EllipseVolume = ({
    x = 0,
    y = 0,
    width,
    height,
    label,
    color = '#808080',
    onClick = noop,
    className,
    angle,
    children,
    fontWeight = 'bold',
}: VolumeProps) => (
    <StyledRoot
        transform={useTransform(x, y, angle, width, height)}
        onClick={onClick}
        className={className}
        style={{ fontWeight: fontWeight }}
        fill={color}
    >
        <ellipse
            rx={l(width / 2)}
            ry={l(height / 2)}
            cx={l(width / 2)}
            cy={l(height / 2)}
            className="shape"
        />
        {label !== undefined ? (
            <Scrim
                width="auto"
                anchor="center"
                x={l(width / 2)}
                y={l(height / 2)}
                text={label}
            />
        ) : undefined}
        {children}
    </StyledRoot>
);

const RectangleVolume = ({
    x = 0,
    y = 0,
    width,
    height,
    label,
    color = '#808080',
    onClick = noop,
    className,
    angle,
    children,
    fontWeight = 'bold',
}: VolumeProps) => (
    <StyledRoot
        transform={useTransform(x, y, angle, width, height)}
        onClick={onClick}
        className={className}
        style={{ fontWeight: fontWeight }}
        fill={color}
    >
        <rect
            width={l(width)}
            height={l(height)}
            rx={2}
            ry={2}
            className="shape"
        />
        {label !== undefined ? (
            <Scrim
                width={l(width)}
                anchor="bottom-left"
                x={0}
                y={l(height)}
                text={label}
            />
        ) : undefined}
        {children}
    </StyledRoot>
);

export const Volume = (props: VolumeProps) => {
    const updatedProps: VolumeProps = {
        ...props,
        className: [
            props.className,
            props.onClick !== noop ? 'clickable' : undefined,
            props.active ? 'active' : undefined,
        ].join(' '),
        color: (() => {
            if (props.disabled) {
                return '#cccccc';
            }
            return props.color;
        })(),
        onClick: () => {
            if (props.disabled || props.onClick === undefined) {
                return;
            }
            props.onClick();
        },
    };
    return props.shape === 'ellipse' ? <EllipseVolume {...updatedProps} /> : <RectangleVolume {...updatedProps} />;
};
