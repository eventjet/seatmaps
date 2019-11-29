import styled from '@emotion/styled';
import React, { FC } from 'react';
import { textCss } from './text';
import { useTransform } from './useTransform';
import { noop } from './util/noop';

const Name = styled.text`
    ${textCss}
    text-anchor: middle;
    alignment-baseline: central;
    cursor: inherit;
    fill: white;
    dominant-baseline: mathematical;
    display: block;
`;

const StyledSeat = styled.g`
    @keyframes active-keyframes {
        from {
            stroke-dashoffset: 0;
        }
        to {
            stroke-dashoffset: 7;
        }
    }

    cursor: default;

    rect {
        stroke-width: .5;
        stroke: white;
    }

    &.clickable {
        cursor: pointer;
    }

    &.nameHidden .name {
        display: none;
    }

    &.nameHidden:hover .name {
        display: block;
    }

    &.active .name {
        display: block;
    }

    &.active rect {
        stroke-dasharray: 3, 4;
        animation: active-keyframes 1s linear infinite;
        stroke: black;
        stroke-width: 1;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
`;

export interface SeatProps {
    active?: boolean;
    color?: string;
    disabled?: boolean;
    hideName?: boolean;
    name?: string;
    onClick?: () => void;
    x?: number;
    y?: number;
}

export const Seat: FC<SeatProps> = ({x = 0, y = 0, name, hideName = false, color, disabled = false, onClick = noop, active = false}) => {
    const textTransform = useTransform(x, y);
    const fill = (() => {
        if (disabled) {
            return '#808080';
        }
        return color;
    })();
    const classNames = [
        hideName ? 'nameHidden' : undefined,
        onClick !== noop && !disabled ? 'clickable' : undefined,
        active ? 'active' : undefined,
    ];
    const handleClick = () => {
        if (disabled) {
            return;
        }
        onClick();
    };
    return (
        <StyledSeat className={classNames.join(' ')} onClick={handleClick}>
            <rect width={9.5} height={9.5} transform={useTransform(x + 2.5, y + 2.5)} fill={fill}/>
            {name !== undefined ? (
                <Name transform={textTransform} x="5" y="5" className="name">{name}</Name>
            ) : undefined}
        </StyledSeat>
    );
};
