import styled from '@emotion/styled';
import React, { CSSProperties, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { l } from './length';
import { textCss } from './textCss';
import { getTransform } from './transform';
import { noop } from './util/noop';
import { clsx } from 'clsx';

const SCRIM_HEIGHT = 8;
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

    &:focus {
        outline: none;
    }

    &:focus .shape {
        stroke: #005fcc;
        stroke-width: 2;
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

/**
 * Props for the {@link Volume} component.
 * @public
 */
export interface VolumeProps {
    /** Whether the volume is currently selected. Displays an animated dashed border when true. */
    active?: boolean;
    /** Rotation angle in degrees. Rotates the volume and its children around the center point `(x + width/2, y + height/2)`. */
    angle?: number;
    /** CSS class name to apply to the volume group element. */
    className?: string;
    /** Fill color for the volume shape. Defaults to `#808080`. Ignored when `disabled` is true. */
    color?: string;
    /** Whether the volume is disabled. Disabled volumes appear grayed out and don't respond to clicks. */
    disabled?: boolean;
    /** Height of the volume in seatmap units. */
    height: number;
    /** Volume identifier. Must be unique within the containing {@link Area}. Displayed at the bottom with a semi-transparent background. */
    label?: string;
    /** Callback fired when the volume is clicked (unless disabled). */
    onClick?: () => void;
    /** Shape of the volume. Defaults to `'rectangle'`. */
    shape?: 'rectangle' | 'ellipse';
    /** Width of the volume in seatmap units. */
    width: number;
    /** X position of the volume's top-left corner in seatmap units. Defaults to `0`. */
    x?: number;
    /** Y position of the volume's top-left corner in seatmap units. Defaults to `0`. */
    y?: number;
    /** Child elements to render inside the volume (e.g., badges). */
    children?: ReactNode;
    /** Font weight for the label text. Defaults to `'bold'`. */
    fontWeight?: CSSProperties['fontWeight'];
}

type InternalVolumeProps = Omit<VolumeProps, 'name'> & {
    'tabIndex'?: number;
    'role'?: string;
    'aria-label'?: string;
    'aria-pressed'?: boolean;
    'aria-disabled'?: boolean;
    'onKeyDown'?: (event: React.KeyboardEvent) => void;
};

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
    tabIndex,
    role,
    'aria-label': ariaLabelAttr,
    'aria-pressed': ariaPressed,
    'aria-disabled': ariaDisabled,
    onKeyDown,
}: InternalVolumeProps) => (
    <StyledRoot
        transform={getTransform(x, y, angle, width, height)}
        onClick={onClick}
        className={className}
        style={{ fontWeight: fontWeight }}
        fill={color}
        tabIndex={tabIndex}
        role={role}
        aria-label={ariaLabelAttr}
        aria-pressed={ariaPressed}
        aria-disabled={ariaDisabled}
        onKeyDown={onKeyDown}
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
    tabIndex,
    role,
    'aria-label': ariaLabelAttr,
    'aria-pressed': ariaPressed,
    'aria-disabled': ariaDisabled,
    onKeyDown,
}: InternalVolumeProps) => (
    <StyledRoot
        transform={getTransform(x, y, angle, width, height)}
        onClick={onClick}
        className={className}
        style={{ fontWeight: fontWeight }}
        fill={color}
        tabIndex={tabIndex}
        role={role}
        aria-label={ariaLabelAttr}
        aria-pressed={ariaPressed}
        aria-disabled={ariaDisabled}
        onKeyDown={onKeyDown}
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

/**
 * A general admission zone where guests can use any seat within the zone.
 *
 * Volumes are addressable elements with identities meaningful to the ticketing system.
 * The `label` identifies the volume and must be unique within the containing {@link Area}.
 * Unlike individual {@link Seat}s, volumes represent zones where specific seat assignments
 * are not tracked.
 *
 * Volumes can be rectangular or elliptical, support click interactions, and can display
 * a label with a semi-transparent background. When `active` is true, an animated dashed
 * border indicates the selection state.
 *
 * @example
 * ```tsx
 * <Volume
 *   width={200}
 *   height={150}
 *   label="General Admission"
 *   color="#4a90d9"
 *   onClick={() => console.log('clicked')}
 * />
 * ```
 *
 * @public
 */
export const Volume = (props: VolumeProps) => {
    const { onClick = noop, disabled } = props;
    const handleClick = useCallback(() => {
        if (disabled) {
            return;
        }
        onClick();
    }, [disabled, onClick]);
    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleClick();
            }
        },
        [handleClick],
    );
    const updatedProps: InternalVolumeProps = {
        ...props,
        'className': clsx(props.className, { clickable: onClick !== noop, active: props.active }),
        'color': props.disabled ? '#cccccc' : props.color,
        'onClick': handleClick,
        'tabIndex': props.disabled ? -1 : 0,
        'role': 'button',
        'aria-label': props.label ?? 'Volume',
        'aria-pressed': props.active,
        'aria-disabled': props.disabled,
        'onKeyDown': handleKeyDown,
    };
    return props.shape === 'ellipse' ? <EllipseVolume {...updatedProps} /> : <RectangleVolume {...updatedProps} />;
};
