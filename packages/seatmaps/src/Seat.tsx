import styled from '@emotion/styled';
import { Check } from '@material-ui/icons';
import React, { FC } from 'react';
import { ACTIVE_BOOKABLE_COLOR, ACTIVE_BOOKABLE_ICON_SIZE } from './constants';
import { l } from './length';
import { textCss } from './text';
import { TextSize, useTextSize } from './textSize';
import { useTransform } from './useTransform';
import { noop } from './util/noop';

export enum SeatShape {
    SQUARE = 'square',
    CIRCLE = 'circle',
}

interface ShapeComponentProps {
    transform?: string;
    fill?: string;
}

const SquareSeat: FC<ShapeComponentProps> = ({transform, fill}) => (
    <rect width={9.5} height={9.5} transform={transform} fill={fill}/>
);

const CircularSeat: FC<ShapeComponentProps> = ({transform, fill}) => (
    <circle r={9.5 / 2} cx={5} cy={5} transform={transform} fill={fill}/>
);

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
    cursor: default;
    color: white;

    rect, circle {
        stroke-width: .5;
        stroke: white;
    }
    
    .check {
        width: 100%;
        height: 100%;
    }

    &.clickable {
        cursor: pointer;
    }

    &.nameHidden .name, &.active:not(:hover) .name {
        display: none;
    }

    &.nameHidden:hover .name {
        display: block;
    }

    &.active rect, &.active circle {
        fill: ${ACTIVE_BOOKABLE_COLOR};
    }
    
    &:hover {
        .check {
            display: none;
        }
    }
`;

export interface SeatProps {
    active?: boolean;
    color?: string;
    disabled?: boolean;
    hideName?: boolean;
    name?: string;
    onClick?: () => void;
    shape?: SeatShape;
    x?: number;
    y?: number;
}

export const Seat: FC<SeatProps> = ({x = 0, y = 0, name, hideName = false, color, disabled = false, onClick = noop, active = false, shape = SeatShape.SQUARE}) => {
    const textSize = useTextSize((name?.length ?? 0) > 2 ? TextSize.SMALL : TextSize.NORMAL);
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
    const ShapeComponent = shape === SeatShape.CIRCLE ? CircularSeat : SquareSeat;
    const transform = useTransform(x + 2.5, y + 2.5);
    return (
        <StyledSeat className={classNames.join(' ')} onClick={handleClick}>
            <ShapeComponent transform={transform} fill={fill}/>
            {name !== undefined ? (
                <Name
                    transform={textTransform}
                    x="5"
                    y="5"
                    className="name"
                    style={textSize === TextSize.SMALL ? {fontSize: 4} : undefined}
                >
                    {name}
                </Name>
            ) : undefined}
            {active ? (
                <Check
                    color="inherit"
                    className="check"
                    width={ACTIVE_BOOKABLE_ICON_SIZE}
                    height={ACTIVE_BOOKABLE_ICON_SIZE}
                    x={l(x) + 1}
                    y={l(y) + 1}
                />
            ) : undefined}
        </StyledSeat>
    );
};
