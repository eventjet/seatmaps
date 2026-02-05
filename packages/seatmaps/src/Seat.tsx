import styled from '@emotion/styled';
import { textCss } from './textCss';
import { TextSize, useTextSize } from './textSize';
import { useTransform } from './useTransform';
import { noop } from './util/noop';

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
export const Seat = ({
    x = 0,
    y = 0,
    name,
    hideName = false,
    color,
    disabled = false,
    onClick = noop,
    onDisabledClick = noop,
    active = false,
    shape = SeatShape.SQUARE,
}: SeatProps) => {
    const textSize = useTextSize((name?.length ?? 0) > 2 ? TextSize.SMALL : TextSize.NORMAL);
    const textTransform = useTransform(x, y);
    const fill = (() => {
        if (disabled) {
            return '#cccccc';
        }
        return color;
    })();
    const classNames = [
        hideName ? 'nameHidden' : undefined,
        onClick !== noop && !disabled ? 'clickable' : undefined,
        active ? 'active' : undefined,
    ];
    const handleClick = () => (disabled ? onDisabledClick : onClick)();
    const ShapeComponent = shape === SeatShape.CIRCLE ? CircularSeat : SquareSeat;
    const transform = useTransform(x + 2.5, y + 2.5);
    return (
        <StyledSeat
            className={classNames.join(' ')}
            onClick={handleClick}
        >
            <ShapeComponent
                transform={transform}
                fill={fill}
            />
            {name !== undefined ? (
                <Name
                    transform={textTransform}
                    x="5"
                    y="5"
                    className="name"
                    style={textSize === TextSize.SMALL ? { fontSize: 4 } : undefined}
                >
                    {name}
                </Name>
            ) : undefined}
        </StyledSeat>
    );
};
