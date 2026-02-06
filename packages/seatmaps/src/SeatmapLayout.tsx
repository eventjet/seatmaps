import { Area } from './Area';
import { Block } from './Block';
import { Circle } from './Circle';
import { Ellipse } from './Ellipse';
import { Rectangle } from './Rectangle';
import { Row } from './Row';
import { Seat, SeatShape } from './Seat';
import { SeatCountBadge, SeatCountBadgeOnEllipse } from './SeatCountBadge';
import { Seatmap } from './Seatmap';
import { Text } from './Text';
import { Volume } from './Volume';

const MIN_WIDTH_BIG_ELLIPSE = 1000;

// ──────────────────────────────────────────────
// Data types
// ──────────────────────────────────────────────

/**
 * Data for an individual seat.
 * @public
 */
export interface SeatmapSeatData {
    /** Unique identifier passed to {@link SeatmapLayoutProps.onBookableClick}. */
    id: string;
    /** Display name shown inside the seat. */
    name?: string;
    /** X position in seatmap units. */
    x?: number;
    /** Y position in seatmap units. */
    y?: number;
    /** Shape of the seat. Defaults to {@link SeatShape.SQUARE}. */
    shape?: SeatShape;
    /** Fill color. Ignored when `disabled` is true. */
    color?: string;
    /** Whether the seat is currently selected. */
    active?: boolean;
    /** Whether the seat is disabled. */
    disabled?: boolean;
}

/**
 * Where to display the row name as a label.
 * @public
 */
export type SeatmapRowLabelMode = 'none' | 'left' | 'right' | 'both';

/**
 * Data for a row of seats.
 * @public
 */
export interface SeatmapRowData {
    /** X position in seatmap units. */
    x?: number;
    /** Y position in seatmap units. */
    y?: number;
    /** Row name, used for accessibility and as label text. */
    name?: string;
    /** Where to show the row name as a label. Defaults to `'none'`. */
    showLabels?: SeatmapRowLabelMode;
    /** Seats in this row. */
    seats: SeatmapSeatData[];
}

/**
 * Data for a block containing rows.
 * @public
 */
export interface SeatmapBlockData {
    /** X position in seatmap units. */
    x?: number;
    /** Y position in seatmap units. */
    y?: number;
    /** Width in seatmap units. Required when using `angle`. */
    width?: number;
    /** Height in seatmap units. Required when using `angle`. */
    height?: number;
    /** Rotation angle in degrees. */
    angle?: number;
    /** Rows in this block. */
    rows: SeatmapRowData[];
}

/**
 * Data for a general admission volume.
 * @public
 */
export interface SeatmapVolumeData {
    /** Unique identifier passed to {@link SeatmapLayoutProps.onBookableClick}. */
    id: string;
    /** Base label displayed on the volume (e.g. "Table 1"). */
    label?: string;
    /** X position in seatmap units. */
    x?: number;
    /** Y position in seatmap units. */
    y?: number;
    /** Width in seatmap units. */
    width: number;
    /** Height in seatmap units. */
    height: number;
    /** Shape of the volume. Defaults to `'rectangle'`. */
    shape?: 'rectangle' | 'ellipse';
    /** Fill color. Defaults to `'#808080'`. Ignored when `disabled` is true. */
    color?: string;
    /** Whether the volume is currently selected. */
    active?: boolean;
    /** Whether the volume is disabled. */
    disabled?: boolean;
    /** Rotation angle in degrees. */
    angle?: number;
    /**
     * Number of available seats. When provided, determines display automatically:
     * - Rectangle: shows a {@link SeatCountBadge}
     * - Small ellipse (width &lt; 1000): shows a {@link SeatCountBadgeOnEllipse}
     * - Big ellipse (width &ge; 1000): appends the count to the label
     */
    availableSeats?: number;
}

/**
 * Data for an area containing blocks and volumes.
 * @public
 */
export interface SeatmapAreaData {
    /** X position in seatmap units. */
    x?: number;
    /** Y position in seatmap units. */
    y?: number;
    /** Width in seatmap units. Required when using `angle`. */
    width?: number;
    /** Height in seatmap units. Required when using `angle`. */
    height?: number;
    /** Rotation angle in degrees. */
    angle?: number;
    /** Accessible name for the area. */
    name?: string;
    /** Blocks containing rows of seats. */
    blocks?: SeatmapBlockData[];
    /** General admission volumes. */
    volumes?: SeatmapVolumeData[];
}

/**
 * A decorative circle.
 * @public
 */
export interface SeatmapCircleDecoration {
    /** Discriminant for the decoration union. */
    type: 'circle';
    /** X coordinate of the circle center in seatmap units. */
    centerX?: number;
    /** Y coordinate of the circle center in seatmap units. */
    centerY?: number;
    /** Radius of the circle in seatmap units. */
    radius: number;
    /** Fill color. */
    color?: string;
}

/**
 * A decorative ellipse.
 * @public
 */
export interface SeatmapEllipseDecoration {
    /** Discriminant for the decoration union. */
    type: 'ellipse';
    /** X position in seatmap units. */
    x?: number;
    /** Y position in seatmap units. */
    y?: number;
    /** Width in seatmap units. */
    width: number;
    /** Height in seatmap units. */
    height: number;
    /** Fill color. */
    color?: string;
}

/**
 * A decorative rectangle.
 * @public
 */
export interface SeatmapRectangleDecoration {
    /** Discriminant for the decoration union. */
    type: 'rectangle';
    /** X position in seatmap units. */
    x?: number;
    /** Y position in seatmap units. */
    y?: number;
    /** Width in seatmap units. */
    width: number;
    /** Height in seatmap units. */
    height: number;
    /** Rotation angle in degrees. */
    angle?: number;
    /** Fill color. */
    color?: string;
}

/**
 * A decorative text label.
 * @public
 */
export interface SeatmapTextDecoration {
    /** Discriminant for the decoration union. */
    type: 'text';
    /** The text content to display. */
    text: string;
    /** X position in seatmap units. */
    x?: number;
    /** Y position in seatmap units. */
    y?: number;
    /** Rotation angle in degrees. */
    angle?: number;
}

/**
 * A decorative element in the seatmap.
 * @public
 */
export type SeatmapDecoration =
    | SeatmapCircleDecoration
    | SeatmapEllipseDecoration
    | SeatmapRectangleDecoration
    | SeatmapTextDecoration;

/**
 * Complete data structure describing an entire seatmap.
 * @public
 */
export interface SeatmapLayoutData {
    /** Areas containing blocks and volumes. */
    areas: SeatmapAreaData[];
    /** Top-level decorative elements (backgrounds, labels). */
    decorations?: SeatmapDecoration[];
}

/**
 * Event passed to {@link SeatmapLayoutProps.onBookableClick}.
 * @public
 */
export interface SeatmapBookableClickEvent {
    /** The `id` of the seat or volume that was clicked. */
    id: string;
    /** Whether the clicked element is a seat or a volume. */
    type: 'seat' | 'volume';
    /** Whether the clicked element is disabled. */
    disabled: boolean;
}

/**
 * Props for the {@link SeatmapLayout} component.
 * @public
 */
export interface SeatmapLayoutProps {
    /** The complete seatmap data structure. */
    data: SeatmapLayoutData;
    /** Callback when a seat or volume is clicked. Also fires for disabled elements. */
    onBookableClick?: (event: SeatmapBookableClickEvent) => void;
    /** CSS class name applied to the root SVG element. */
    className?: string;
    /** Accessible label for the seatmap. Defaults to `'Seat map'`. */
    ariaLabel?: string;
}

// ──────────────────────────────────────────────
// Rendering helpers
// ──────────────────────────────────────────────

const renderDecoration = (decoration: SeatmapDecoration, index: number) => {
    switch (decoration.type) {
        case 'circle':
            return (
                <Circle
                    key={index}
                    centerX={decoration.centerX}
                    centerY={decoration.centerY}
                    radius={decoration.radius}
                    color={decoration.color}
                />
            );
        case 'ellipse':
            return (
                <Ellipse
                    key={index}
                    x={decoration.x}
                    y={decoration.y}
                    width={decoration.width}
                    height={decoration.height}
                    color={decoration.color}
                />
            );
        case 'rectangle':
            return (
                <Rectangle
                    key={index}
                    x={decoration.x}
                    y={decoration.y}
                    width={decoration.width}
                    height={decoration.height}
                    angle={decoration.angle}
                    color={decoration.color}
                />
            );
        case 'text':
            return (
                <Text
                    key={index}
                    text={decoration.text}
                    x={decoration.x}
                    y={decoration.y}
                    angle={decoration.angle}
                />
            );
    }
};

const isTextDecoration = (d: SeatmapDecoration): d is SeatmapTextDecoration => d.type === 'text';

const shouldShowBadge = (volume: SeatmapVolumeData): boolean => {
    const shape = volume.shape ?? 'rectangle';
    if (shape === 'rectangle') return true;
    return volume.width < MIN_WIDTH_BIG_ELLIPSE;
};

const getVolumeLabel = (volume: SeatmapVolumeData): string | undefined => {
    if (volume.availableSeats === undefined || shouldShowBadge(volume)) {
        return volume.label;
    }
    if (volume.label === undefined) {
        return `${volume.availableSeats}`;
    }
    return `${volume.label} (${volume.availableSeats})`;
};

const renderVolumeBadge = (volume: SeatmapVolumeData) => {
    if (volume.availableSeats === undefined || !shouldShowBadge(volume)) {
        return undefined;
    }
    const containerProps = { width: volume.width, height: volume.height };
    const shape = volume.shape ?? 'rectangle';
    const color = volume.disabled ? '#cccccc' : volume.color;
    if (shape === 'ellipse') {
        return (
            <SeatCountBadgeOnEllipse
                containerProps={containerProps}
                count={volume.availableSeats}
                color={color}
            />
        );
    }
    return (
        <SeatCountBadge
            containerProps={containerProps}
            count={volume.availableSeats}
            color={color}
        />
    );
};

// ──────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────

/**
 * High-level component that renders an entire seatmap from a data structure.
 *
 * Instead of composing low-level components via JSX children, pass a
 * {@link SeatmapLayoutData} object describing the full seatmap. The component
 * handles all rendering, including badge placement and seat name visibility.
 *
 * @example
 * ```tsx
 * <SeatmapLayout
 *   data={seatmapData}
 *   onBookableClick={({ id, type, disabled }) => console.log('Clicked:', id, type, disabled)}
 * />
 * ```
 *
 * @public
 */
export const SeatmapLayout = ({ data, onBookableClick, className, ariaLabel }: SeatmapLayoutProps) => {
    const decorations = data.decorations ?? [];
    const nonTextDecorations = decorations.filter((d) => !isTextDecoration(d));
    const textDecorations = decorations.filter(isTextDecoration);

    return (
        <Seatmap
            className={className}
            ariaLabel={ariaLabel}
        >
            {nonTextDecorations.map(renderDecoration)}
            {data.areas.map((area, areaIndex) => (
                <Area
                    key={areaIndex}
                    x={area.x}
                    y={area.y}
                    width={area.width}
                    height={area.height}
                    angle={area.angle}
                    name={area.name}
                >
                    {area.blocks?.map((block, blockIndex) => (
                        <Block
                            key={blockIndex}
                            x={block.x}
                            y={block.y}
                            width={block.width}
                            height={block.height}
                            angle={block.angle}
                        >
                            {block.rows.map((row, rowIndex) => {
                                const showLabels = row.showLabels ?? 'none';
                                return (
                                    <Row
                                        key={rowIndex}
                                        x={row.x}
                                        y={row.y}
                                        name={row.name}
                                        leftLabel={
                                            showLabels === 'left' || showLabels === 'both' ? row.name : undefined
                                        }
                                        rightLabel={
                                            showLabels === 'right' || showLabels === 'both' ? row.name : undefined
                                        }
                                    >
                                        {row.seats.map((seat, seatIndex) => (
                                            <Seat
                                                key={seat.id}
                                                name={seat.name}
                                                x={seat.x}
                                                y={seat.y}
                                                shape={seat.shape}
                                                color={seat.color}
                                                active={seat.active}
                                                disabled={seat.disabled}
                                                hideName={seatIndex !== 0 && seatIndex !== row.seats.length - 1}
                                                onClick={
                                                    onBookableClick
                                                        ? () =>
                                                              onBookableClick({
                                                                  id: seat.id,
                                                                  type: 'seat',
                                                                  disabled: false,
                                                              })
                                                        : undefined
                                                }
                                                onDisabledClick={
                                                    onBookableClick
                                                        ? () =>
                                                              onBookableClick({
                                                                  id: seat.id,
                                                                  type: 'seat',
                                                                  disabled: true,
                                                              })
                                                        : undefined
                                                }
                                            />
                                        ))}
                                    </Row>
                                );
                            })}
                        </Block>
                    ))}
                    {area.volumes?.map((volume) => (
                        <Volume
                            key={volume.id}
                            label={getVolumeLabel(volume)}
                            x={volume.x}
                            y={volume.y}
                            width={volume.width}
                            height={volume.height}
                            shape={volume.shape}
                            color={volume.color}
                            active={volume.active ?? false}
                            disabled={volume.disabled}
                            angle={volume.angle}
                            fontWeight="normal"
                            onClick={
                                onBookableClick
                                    ? () => onBookableClick({ id: volume.id, type: 'volume', disabled: false })
                                    : undefined
                            }
                            onDisabledClick={
                                onBookableClick
                                    ? () => onBookableClick({ id: volume.id, type: 'volume', disabled: true })
                                    : undefined
                            }
                        >
                            {renderVolumeBadge(volume)}
                        </Volume>
                    ))}
                </Area>
            ))}
            {textDecorations.map(renderDecoration)}
        </Seatmap>
    );
};
