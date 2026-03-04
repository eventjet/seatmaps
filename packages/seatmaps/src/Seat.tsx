import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import { textCss } from './textCss';
import { TextSize, useTextSize } from './textSize';
import { getTransform } from './transform';
import { noop } from './util/noop';
import { clsx } from 'clsx';

/**
 * Available shapes for seat rendering.
 * @public
 */
export enum SeatShape {
    /** Renders the seat as a square with slightly rounded corners. */
    SQUARE = 'square',
    /** Renders the seat as a circle. */
    CIRCLE = 'circle',
}

interface ShapeComponentProps {
    transform?: string;
    fill?: string;
}

const SquareSeat = ({ transform, fill }: ShapeComponentProps) => (
    <rect
        width={9.5}
        height={9.5}
        transform={transform}
        fill={fill}
    />
);

const CircularSeat = ({ transform, fill }: ShapeComponentProps) => (
    <circle
        r={9.5 / 2}
        cx={5}
        cy={5}
        transform={transform}
        fill={fill}
    />
);

const Name = styled('text')`
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

    rect,
    circle {
        stroke-width: 0.5;
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

    &.active rect,
    &.active circle {
        stroke-dasharray: 3, 4;
        animation: active-keyframes 1s linear infinite;
        stroke: black;
        stroke-width: 1;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    &:focus {
        outline: none;
    }

    &:focus rect,
    &:focus circle {
        stroke: #005fcc;
        stroke-width: 1.5;
    }
`;

/**
 * Props for the {@link Seat} component.
 * @public
 */
export interface SeatProps {
    /** Whether the seat is currently selected. Displays an animated dashed border when true. */
    active?: boolean;
    /** Fill color for the seat. Ignored when `disabled` is true. */
    color?: string;
    /** Whether the seat is disabled. Disabled seats appear grayed out and trigger `onDisabledClick` instead of `onClick`. */
    disabled?: boolean;
    /** Whether to hide the seat name by default. When true, the name only appears on hover. */
    hideName?: boolean;
    /** Seat identifier displayed inside the seat. Combined with area and row to form a unique identifier. Uses a smaller font for names longer than 2 characters. */
    name?: string;
    /** Accessible label for the seat. Overrides the default `aria-label` derived from `name`. */
    ariaLabel?: string;
    /** Callback fired when the seat is clicked (unless disabled). */
    onClick?: () => void;
    /** Callback fired when a disabled seat is clicked. */
    onDisabledClick?: () => void;
    /** Shape of the seat. Defaults to {@link SeatShape.SQUARE}. */
    shape?: SeatShape;
    /** X position of the seat in seatmap units. Defaults to `0`. */
    x?: number;
    /** Y position of the seat in seatmap units. Defaults to `0`. */
    y?: number;
    /**
     * Tab index for keyboard navigation. When provided, overrides the default behaviour of
     * `0` for enabled seats and `-1` for disabled seats. Used by {@link SeatmapLayout} to
     * implement the roving tabindex pattern.
     */
    tabIndex?: number;
    /**
     * Focus event handler. Used by {@link SeatmapLayout} to sync the roving focus position
     * when a user clicks directly on the seat.
     */
    onFocus?: React.FocusEventHandler<SVGGElement>;
}

/**
 * An individual bookable seat in the seatmap.
 *
 * Seats are addressable elements with identities meaningful to the ticketing system.
 * The `name` prop combines with the containing {@link Area} and {@link Row} to form
 * a unique seat identifier.
 *
 * Seats can be square or circular, display their name, and respond to click events.
 * When `active` is true, an animated dashed border indicates the selection state.
 * Disabled seats appear grayed out and can have a separate click handler.
 *
 * @example
 * ```tsx
 * <Seat
 *   name="1"
 *   color="#4a90d9"
 *   onClick={() => console.log('seat clicked')}
 * />
 * ```
 *
 * @public
 */
export const Seat = React.forwardRef<SVGGElement, SeatProps>(
    (
        {
            x = 0,
            y = 0,
            name,
            ariaLabel,
            hideName = false,
            color,
            disabled = false,
            onClick = noop,
            onDisabledClick = noop,
            active = false,
            shape = SeatShape.SQUARE,
            tabIndex: tabIndexProp,
            onFocus,
        },
        ref,
    ) => {
        const textSize = useTextSize((name?.length ?? 0) > 2 ? TextSize.SMALL : TextSize.NORMAL);
        const textTransform = getTransform(x, y);
        const handleClick = useCallback(
            () => (disabled ? onDisabledClick : onClick)(),
            [disabled, onClick, onDisabledClick],
        );
        const handleKeyDown = useCallback(
            (event: React.KeyboardEvent) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleClick();
                }
            },
            [handleClick],
        );
        const ShapeComponent = shape === SeatShape.CIRCLE ? CircularSeat : SquareSeat;
        const transform = getTransform(x + 2.5, y + 2.5);
        const resolvedTabIndex = tabIndexProp !== undefined ? tabIndexProp : disabled ? -1 : 0;
        return (
            <StyledSeat
                ref={ref}
                className={clsx({ nameHidden: hideName, clickable: onClick !== noop && !disabled, active: active })}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                onFocus={onFocus}
                tabIndex={resolvedTabIndex}
                role="button"
                aria-label={ariaLabel ?? name ?? 'Unnamed seat'}
                aria-pressed={active}
                aria-disabled={disabled}
            >
                <ShapeComponent
                    transform={transform}
                    fill={disabled ? '#cccccc' : color}
                />
                {name !== undefined ? (
                    <Name
                        transform={textTransform}
                        x="5"
                        y="5"
                        className="name"
                        style={textSize === TextSize.SMALL ? { fontSize: 4 } : undefined}
                        aria-hidden={true}
                    >
                        {name}
                    </Name>
                ) : undefined}
            </StyledSeat>
        );
    },
);

Seat.displayName = 'Seat';
