import styled from '@emotion/styled';
import { Check } from '@material-ui/icons';
import React, { FC, useEffect, useRef, useState } from 'react';
import { ACTIVE_BOOKABLE_COLOR, ACTIVE_BOOKABLE_ICON_SIZE } from './constants';
import { l } from './length';
import { textCss } from './text';
import { useTransform } from './useTransform';
import { noop } from './util/noop';

const CHECK_SIZE = ACTIVE_BOOKABLE_ICON_SIZE;
const SCRIM_HEIGHT = 10;
const HORIZONTAL_SCRIM_PADDING = 3;

const StyledRoot = styled.g`
    cursor: default;
    color: white;

    &.clickable {
        cursor: pointer;
    }
`;

const Name = styled.text`
    ${textCss}
    dominant-baseline: central;
    fill: black;
`;

const StyledScrim = styled.rect`
    fill: rgba(255, 255, 255, .54);
`;

interface ScrimProps {
    anchor?: 'center' | 'bottom-left';
    text: string;
    width?: number | 'auto';
    x: number;
    y: number;
}

const Scrim: FC<ScrimProps> = ({width = 'auto', x, y, text, anchor = 'bottom-left'}) => {
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
        return textWidth + (HORIZONTAL_SCRIM_PADDING * 2);
    })();
    const actualX = anchor === 'bottom-left' ? x : x - (scrimWidth / 2);
    const actualY = anchor === 'bottom-left' ? y - SCRIM_HEIGHT : y - (SCRIM_HEIGHT / 2);
    return (
        <>
            <StyledScrim width={scrimWidth} height={SCRIM_HEIGHT} x={actualX} y={actualY}/>
            <Name x={actualX + HORIZONTAL_SCRIM_PADDING} y={actualY + (SCRIM_HEIGHT / 2)} ref={textRef}>
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
}

const EllipseVolume: FC<VolumeProps> = ({x = 0, y = 0, width, height, label, color = '#808080', onClick = noop, className, angle, active}) => (
    <StyledRoot
        transform={useTransform(x, y, angle, width, height)}
        onClick={onClick}
        className={className}
    >
        <ellipse
            rx={l(width / 2)}
            ry={l(height / 2)}
            cx={l(width / 2)}
            cy={l(height / 2)}
            fill={color}
            className="shape"
        />
        {active ? (
            <Check
                width={CHECK_SIZE}
                height={CHECK_SIZE}
                x={(l(width) - CHECK_SIZE) / 2}
                y={l(height / 2) - (SCRIM_HEIGHT / 2) - (CHECK_SIZE / 1.5)}
            />
        ) : undefined}
        {label !== undefined ? (
            <Scrim
                width="auto"
                anchor="center"
                x={l(width / 2)}
                y={l(height / 2) + (active ? CHECK_SIZE / 2 : 0)}
                text={label}
            />
        ) : undefined}
    </StyledRoot>
);

const RectangleVolume: FC<VolumeProps> = ({x = 0, y = 0, width, height, label, color = '#808080', onClick = noop, className, angle, active}) => (
    <StyledRoot
        transform={useTransform(x, y, angle, width, height)}
        onClick={onClick}
        className={className}
    >
        <rect width={l(width)} height={l(height)} rx={2} ry={2} fill={color} className="shape"/>
        {label !== undefined ? (
            <Scrim width={l(width)} anchor="bottom-left" x={0} y={l(height)} text={label}/>
        ) : undefined}
        {active ? (
            <Check
                width={CHECK_SIZE}
                height={CHECK_SIZE}
                x={(l(width) - CHECK_SIZE) / 2}
                y={(l(height) - SCRIM_HEIGHT - CHECK_SIZE) / 2}
                color="inherit"
            />
        ) : undefined}
    </StyledRoot>
);

export const Volume: FC<VolumeProps> = (props) => {
    const updatedProps: VolumeProps = {
        ...props,
        className: [
            props.className,
            props.onClick !== noop ? 'clickable' : undefined,
            props.active ? 'active' : undefined,
        ].join(' '),
        color: (() => {
            if (props.active) {
                return ACTIVE_BOOKABLE_COLOR;
            }
            if (props.disabled) {
                return '#808080';
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
