import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import { l } from './length';
import { useTransform } from './useTransform';
import { noop } from './util/noop';
import './Volume.css';

const SCRIM_HEIGHT = 8;
const HORIZONTAL_SCRIM_PADDING = 3;

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
            <rect
                className="ej-seatmaps-volume__scrim"
                width={scrimWidth}
                height={SCRIM_HEIGHT}
                x={actualX}
                y={actualY}
            />
            <text
                className="ej-seatmaps-volume__name"
                x={actualX + HORIZONTAL_SCRIM_PADDING}
                y={actualY + SCRIM_HEIGHT / 2}
                ref={textRef}
            >
                {text}
            </text>
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
    <g
        className={className}
        transform={useTransform(x, y, angle, width, height)}
        onClick={onClick}
        style={{ fontWeight: fontWeight }}
        fill={color}
    >
        <ellipse
            rx={l(width / 2)}
            ry={l(height / 2)}
            cx={l(width / 2)}
            cy={l(height / 2)}
            className="ej-seatmaps-volume__shape"
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
    </g>
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
    <g
        className={className}
        transform={useTransform(x, y, angle, width, height)}
        onClick={onClick}
        style={{ fontWeight: fontWeight }}
        fill={color}
    >
        <rect
            width={l(width)}
            height={l(height)}
            rx={2}
            ry={2}
            className="ej-seatmaps-volume__shape"
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
    </g>
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
    const updatedProps: VolumeProps = {
        ...props,
        className: [
            'ej-seatmaps-volume',
            props.className,
            props.onClick !== noop && 'ej-seatmaps-volume--clickable',
            props.active && 'ej-seatmaps-volume--active',
        ]
            .filter(Boolean)
            .join(' '),
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
