import React, { useCallback, useEffect, useRef, useState } from 'react';
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
    SeatmapCircleDecoration | SeatmapEllipseDecoration | SeatmapRectangleDecoration | SeatmapTextDecoration;

/**
 * Complete data structure describing an entire seatmap.
 * @public
 */
export interface SeatmapLayoutData {
    /** Areas containing blocks and volumes. */
    areas: SeatmapAreaData[];
    /**
     * Top-level decorative elements (backgrounds, labels).
     *
     * Non-text decorations are rendered behind all areas; text decorations are
     * rendered in front so that labels stay visible on top of seats and volumes.
     */
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
    /** Formats the area name for its accessible label. Defaults to using the name as-is. */
    formatAreaName?: (area: { name: string }) => string;
    /** Formats the row name for its accessible label. Does not affect the visual row labels. Defaults to using the name as-is. */
    formatRowName?: (row: { name: string }) => string;
    /**
     * Formats the accessible label for a seat. Does not affect the visual name inside the seat. Defaults to using
     * the name as-is.
     *
     * Use the `active` and `disabled` state to append status information to the label — for example to communicate
     * cart membership to screen reader users:
     * `({ name, active }) => active ? name + " – in your cart" : name`.
     */
    formatSeatName?: (seat: { name: string; active: boolean; disabled: boolean }) => string;
    /**
     * Formats the accessible label for a volume. Does not affect the visual label on the volume. Defaults to using
     * the label as-is.
     *
     * Use the `active` and `disabled` state to append status information to the label — for example to communicate
     * cart membership to screen reader users:
     * `({ name, active }) => active ? name + " – in your cart" : name`.
     */
    formatVolumeLabel?: (volume: { name: string; active: boolean; disabled: boolean }) => string;
}

// ──────────────────────────────────────────────
// Roving tabindex types and helpers
// ──────────────────────────────────────────────

/**
 * Identifies which element in the seatmap tree currently holds roving focus.
 *
 * {@link SeatmapLayout} uses the roving tabindex pattern: only the single "current"
 * element holds `tabIndex=0`; all others hold `tabIndex=-1`. This type tracks
 * the current focus position across three levels:
 * - `'area'`: focus is on an area group (Tab cycles here)
 * - `'seat'`: focus is on a specific seat within an area
 * - `'volume'`: focus is on a specific general admission volume within an area
 * @internal
 */
type FocusPosition =
    | { level: 'area'; areaIndex: number }
    | { level: 'seat'; areaIndex: number; blockIndex: number; rowIndex: number; seatIndex: number }
    | { level: 'volume'; areaIndex: number; volumeIndex: number };

type SeatPos = Extract<FocusPosition, { level: 'seat' }>;

/** Converts a FocusPosition to the Map key used in elementRefs. */
const positionKey = (pos: FocusPosition): string => {
    switch (pos.level) {
        case 'area':
            return `a${pos.areaIndex}`;
        case 'seat':
            return `s${pos.areaIndex}:${pos.blockIndex}:${pos.rowIndex}:${pos.seatIndex}`;
        case 'volume':
            return `v${pos.areaIndex}:${pos.volumeIndex}`;
    }
};

type FlatRow = { blockIndex: number; rowIndex: number; seats: SeatmapSeatData[] };

/** Flattens all blocks/rows in an area into an ordered array for row-based navigation. */
const getFlatRows = (area: SeatmapAreaData): FlatRow[] => {
    const result: FlatRow[] = [];
    area.blocks?.forEach((block, blockIndex) => {
        block.rows.forEach((row, rowIndex) => {
            result.push({ blockIndex, rowIndex, seats: row.seats });
        });
    });
    return result;
};

/**
 * Returns the FocusPosition for the first enabled item in the given area.
 * Prefers seats (scans all blocks/rows in order) over volumes; returns null if
 * no enabled item exists.
 */
const firstEnabledItemInArea = (areas: SeatmapAreaData[], areaIndex: number): FocusPosition | null => {
    const area = areas[areaIndex];
    if (!area) return null;
    for (const { blockIndex, rowIndex, seats } of getFlatRows(area)) {
        for (let seatIndex = 0; seatIndex < seats.length; seatIndex++) {
            if (!seats[seatIndex].disabled) {
                return { level: 'seat', areaIndex, blockIndex, rowIndex, seatIndex };
            }
        }
    }
    const volumes = area.volumes ?? [];
    for (let volumeIndex = 0; volumeIndex < volumes.length; volumeIndex++) {
        if (!volumes[volumeIndex].disabled) {
            return { level: 'volume', areaIndex, volumeIndex };
        }
    }
    return null;
};

/**
 * Returns the previous enabled seat in reading order across all blocks/rows of the area,
 * or null if already at (or before) the first seat. Disabled seats are skipped.
 */
const prevSeat = (areas: SeatmapAreaData[], pos: SeatPos): SeatPos | null => {
    const area = areas[pos.areaIndex];
    if (!area) return null;
    const entries: Array<{ blockIndex: number; rowIndex: number; seatIndex: number; seat: SeatmapSeatData }> = [];
    area.blocks?.forEach((block, blockIndex) => {
        block.rows.forEach((row, rowIndex) => {
            row.seats.forEach((seat, seatIndex) => entries.push({ blockIndex, rowIndex, seatIndex, seat }));
        });
    });
    const currentIdx = entries.findIndex(
        (e) => e.blockIndex === pos.blockIndex && e.rowIndex === pos.rowIndex && e.seatIndex === pos.seatIndex,
    );
    if (currentIdx <= 0) return null;
    for (let i = currentIdx - 1; i >= 0; i--) {
        const { blockIndex, rowIndex, seatIndex, seat } = entries[i];
        if (!seat.disabled) {
            return { level: 'seat', areaIndex: pos.areaIndex, blockIndex, rowIndex, seatIndex };
        }
    }
    return null;
};

/**
 * Returns the next enabled seat in reading order across all blocks/rows of the area,
 * or null if already at (or past) the last seat. Disabled seats are skipped.
 */
const nextSeat = (areas: SeatmapAreaData[], pos: SeatPos): SeatPos | null => {
    const area = areas[pos.areaIndex];
    if (!area) return null;
    const entries: Array<{ blockIndex: number; rowIndex: number; seatIndex: number; seat: SeatmapSeatData }> = [];
    area.blocks?.forEach((block, blockIndex) => {
        block.rows.forEach((row, rowIndex) => {
            row.seats.forEach((seat, seatIndex) => entries.push({ blockIndex, rowIndex, seatIndex, seat }));
        });
    });
    const currentIdx = entries.findIndex(
        (e) => e.blockIndex === pos.blockIndex && e.rowIndex === pos.rowIndex && e.seatIndex === pos.seatIndex,
    );
    if (currentIdx === -1 || currentIdx >= entries.length - 1) return null;
    for (let i = currentIdx + 1; i < entries.length; i++) {
        const { blockIndex, rowIndex, seatIndex, seat } = entries[i];
        if (!seat.disabled) {
            return { level: 'seat', areaIndex: pos.areaIndex, blockIndex, rowIndex, seatIndex };
        }
    }
    return null;
};

/**
 * Returns the enabled seat at the same column index in the nearest row above,
 * clamping to that row's length. Continues searching upward if the clamped
 * position is disabled.
 */
const seatAbove = (areas: SeatmapAreaData[], pos: SeatPos): SeatPos | null => {
    const area = areas[pos.areaIndex];
    if (!area) return null;
    const flatRows = getFlatRows(area);
    const currentFlatRowIdx = flatRows.findIndex((r) => r.blockIndex === pos.blockIndex && r.rowIndex === pos.rowIndex);
    if (currentFlatRowIdx <= 0) return null;
    for (let i = currentFlatRowIdx - 1; i >= 0; i--) {
        const { blockIndex, rowIndex, seats } = flatRows[i];
        const clampedIdx = Math.min(pos.seatIndex, seats.length - 1);
        if (clampedIdx >= 0 && !seats[clampedIdx].disabled) {
            return { level: 'seat', areaIndex: pos.areaIndex, blockIndex, rowIndex, seatIndex: clampedIdx };
        }
    }
    return null;
};

/**
 * Returns the enabled seat at the same column index in the nearest row below,
 * clamping to that row's length. Continues searching downward if the clamped
 * position is disabled.
 */
const seatBelow = (areas: SeatmapAreaData[], pos: SeatPos): SeatPos | null => {
    const area = areas[pos.areaIndex];
    if (!area) return null;
    const flatRows = getFlatRows(area);
    const currentFlatRowIdx = flatRows.findIndex((r) => r.blockIndex === pos.blockIndex && r.rowIndex === pos.rowIndex);
    if (currentFlatRowIdx === -1 || currentFlatRowIdx >= flatRows.length - 1) return null;
    for (let i = currentFlatRowIdx + 1; i < flatRows.length; i++) {
        const { blockIndex, rowIndex, seats } = flatRows[i];
        const clampedIdx = Math.min(pos.seatIndex, seats.length - 1);
        if (clampedIdx >= 0 && !seats[clampedIdx].disabled) {
            return { level: 'seat', areaIndex: pos.areaIndex, blockIndex, rowIndex, seatIndex: clampedIdx };
        }
    }
    return null;
};

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

const identityName = ({ name }: { name: string }) => name;

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
 * ## Keyboard navigation (roving tabindex)
 *
 * Only one element holds `tabIndex=0` at a time. Tab/Shift-Tab move between seatmaps
 * on the page; within a seatmap, arrow keys navigate the hierarchy:
 *
 * | Level | Key | Effect |
 * |---|---|---|
 * | **Area** | `↓` / `→` | Next area |
 * | | `↑` / `←` | Previous area |
 * | | `Enter` | Enter area — first enabled seat, or first enabled volume |
 * | **Seat** | `←` / `→` | Previous / next seat; crosses row boundaries |
 * | | `↑` / `↓` | Same-column seat in adjacent row (clamped) |
 * | | `Escape` | Back to area |
 * | | `Enter` / `Space` | Activate seat |
 * | **Volume** | `←` / `↑` | Previous volume in area |
 * | | `→` / `↓` | Next volume in area |
 * | | `Escape` | Back to area |
 * | | `Enter` / `Space` | Activate volume |
 *
 * Disabled seats and volumes are skipped during navigation.
 *
 * ## Screen reader announcements
 *
 * - Moving to an area: area name announced via `role="group"` + `aria-label`
 * - Moving to a seat: row name announced via nested `role="group"`, then seat
 *   `aria-label` (formatted by `formatSeatName`)
 * - Moving to a volume: volume `aria-label` (formatted by `formatVolumeLabel`)
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
export const SeatmapLayout = ({
    data,
    onBookableClick,
    className,
    ariaLabel,
    formatAreaName = identityName,
    formatRowName = identityName,
    formatSeatName = identityName,
    formatVolumeLabel = identityName,
}: SeatmapLayoutProps) => {
    const decorations = data.decorations ?? [];
    const nonTextDecorations = decorations.filter((d) => !isTextDecoration(d));
    const textDecorations = decorations.filter(isTextDecoration);

    // ── Roving tabindex state ────────────────────────────────────────────────
    const [focusPosition, setFocusPosition] = useState<FocusPosition>({ level: 'area', areaIndex: 0 });
    const elementRefs = useRef<Map<string, SVGGElement>>(new Map());
    // When true, the effect below will programmatically focus the element at focusPosition.
    const needsAutoFocus = useRef(false);

    /** Registers an element in the ref map by key; cleans up on unmount. */
    const registerRef = (key: string) => (el: SVGGElement | null) => {
        if (el) elementRefs.current.set(key, el);
        else elementRefs.current.delete(key);
    };

    /** Moves roving focus to `pos` and schedules a DOM `.focus()` call. */
    const moveFocus = useCallback((pos: FocusPosition) => {
        needsAutoFocus.current = true;
        setFocusPosition(pos);
    }, []);

    // After focusPosition changes (via moveFocus), focus the target DOM element.
    useEffect(() => {
        if (!needsAutoFocus.current) return;
        needsAutoFocus.current = false;
        elementRefs.current.get(positionKey(focusPosition))?.focus({ preventScroll: false });
    }, [focusPosition]);

    const areas = data.areas;

    // ── Keyboard handler ─────────────────────────────────────────────────────
    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            const { key } = event;
            const pos = focusPosition;

            if (pos.level === 'area') {
                if (key === 'ArrowDown' || key === 'ArrowRight') {
                    event.preventDefault();
                    if (pos.areaIndex + 1 < areas.length) {
                        moveFocus({ level: 'area', areaIndex: pos.areaIndex + 1 });
                    }
                } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
                    event.preventDefault();
                    if (pos.areaIndex - 1 >= 0) {
                        moveFocus({ level: 'area', areaIndex: pos.areaIndex - 1 });
                    }
                } else if (key === 'Enter') {
                    event.preventDefault();
                    const first = firstEnabledItemInArea(areas, pos.areaIndex);
                    if (first !== null) moveFocus(first);
                }
            } else if (pos.level === 'seat') {
                if (key === 'ArrowLeft') {
                    event.preventDefault();
                    const prev = prevSeat(areas, pos);
                    if (prev !== null) moveFocus(prev);
                } else if (key === 'ArrowRight') {
                    event.preventDefault();
                    const next = nextSeat(areas, pos);
                    if (next !== null) moveFocus(next);
                } else if (key === 'ArrowUp') {
                    event.preventDefault();
                    const above = seatAbove(areas, pos);
                    if (above !== null) moveFocus(above);
                } else if (key === 'ArrowDown') {
                    event.preventDefault();
                    const below = seatBelow(areas, pos);
                    if (below !== null) moveFocus(below);
                } else if (key === 'Escape') {
                    event.preventDefault();
                    moveFocus({ level: 'area', areaIndex: pos.areaIndex });
                }
                // Enter/Space: handled by Seat's own onKeyDown; the wrapper ignores them.
            } else if (pos.level === 'volume') {
                if (key === 'ArrowLeft' || key === 'ArrowUp') {
                    event.preventDefault();
                    const volumes = areas[pos.areaIndex]?.volumes ?? [];
                    for (let i = pos.volumeIndex - 1; i >= 0; i--) {
                        if (!volumes[i].disabled) {
                            moveFocus({ level: 'volume', areaIndex: pos.areaIndex, volumeIndex: i });
                            return;
                        }
                    }
                } else if (key === 'ArrowRight' || key === 'ArrowDown') {
                    event.preventDefault();
                    const volumes = areas[pos.areaIndex]?.volumes ?? [];
                    for (let i = pos.volumeIndex + 1; i < volumes.length; i++) {
                        if (!volumes[i].disabled) {
                            moveFocus({ level: 'volume', areaIndex: pos.areaIndex, volumeIndex: i });
                            return;
                        }
                    }
                } else if (key === 'Escape') {
                    event.preventDefault();
                    moveFocus({ level: 'area', areaIndex: pos.areaIndex });
                }
                // Enter/Space: handled by Volume's own onKeyDown; the wrapper ignores them.
            }
        },
        [areas, focusPosition, moveFocus],
    );

    // ── tabIndex helpers ─────────────────────────────────────────────────────
    const areaTabIndex = (areaIndex: number): number =>
        focusPosition.level === 'area' && focusPosition.areaIndex === areaIndex ? 0 : -1;

    const seatTabIndex = (areaIndex: number, blockIndex: number, rowIndex: number, seatIndex: number): number =>
        focusPosition.level === 'seat' &&
        focusPosition.areaIndex === areaIndex &&
        focusPosition.blockIndex === blockIndex &&
        focusPosition.rowIndex === rowIndex &&
        focusPosition.seatIndex === seatIndex
            ? 0
            : -1;

    const volumeTabIndex = (areaIndex: number, volumeIndex: number): number =>
        focusPosition.level === 'volume' &&
        focusPosition.areaIndex === areaIndex &&
        focusPosition.volumeIndex === volumeIndex
            ? 0
            : -1;

    // ── Render ───────────────────────────────────────────────────────────────
    return (
        <Seatmap
            className={className}
            ariaLabel={ariaLabel}
        >
            {nonTextDecorations.map(renderDecoration)}
            <g onKeyDown={handleKeyDown}>
                {data.areas.map((area, areaIndex) => (
                    <Area
                        key={areaIndex}
                        ref={registerRef(`a${areaIndex}`)}
                        tabIndex={areaTabIndex(areaIndex)}
                        onFocus={(e) => {
                            // Only sync when the area <g> itself is focused (not a child element).
                            if (e.target === e.currentTarget) {
                                setFocusPosition({ level: 'area', areaIndex });
                            }
                        }}
                        x={area.x}
                        y={area.y}
                        width={area.width}
                        height={area.height}
                        angle={area.angle}
                        name={area.name !== undefined ? formatAreaName({ name: area.name }) : undefined}
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
                                            name={
                                                row.name !== undefined ? formatRowName({ name: row.name }) : undefined
                                            }
                                            leftLabel={
                                                showLabels === 'left' || showLabels === 'both' ? row.name : undefined
                                            }
                                            rightLabel={
                                                showLabels === 'right' || showLabels === 'both' ? row.name : undefined
                                            }
                                        >
                                            {row.seats.map((seat, seatIndex) => {
                                                const seatAriaLabel =
                                                    seat.name !== undefined
                                                        ? formatSeatName({
                                                              name: seat.name,
                                                              active: seat.active ?? false,
                                                              disabled: seat.disabled ?? false,
                                                          })
                                                        : undefined;
                                                return (
                                                    <Seat
                                                        key={seat.id}
                                                        ref={registerRef(
                                                            `s${areaIndex}:${blockIndex}:${rowIndex}:${seatIndex}`,
                                                        )}
                                                        tabIndex={seatTabIndex(
                                                            areaIndex,
                                                            blockIndex,
                                                            rowIndex,
                                                            seatIndex,
                                                        )}
                                                        onFocus={() =>
                                                            setFocusPosition({
                                                                level: 'seat',
                                                                areaIndex,
                                                                blockIndex,
                                                                rowIndex,
                                                                seatIndex,
                                                            })
                                                        }
                                                        name={seat.name}
                                                        ariaLabel={seatAriaLabel}
                                                        x={seat.x}
                                                        y={seat.y}
                                                        shape={seat.shape}
                                                        color={seat.color}
                                                        active={seat.active ?? false}
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
                                                );
                                            })}
                                        </Row>
                                    );
                                })}
                            </Block>
                        ))}
                        {area.volumes?.map((volume, volumeIndex) => {
                            const volumeAriaLabel =
                                volume.label !== undefined
                                    ? formatVolumeLabel({
                                          name: volume.label,
                                          active: volume.active ?? false,
                                          disabled: volume.disabled ?? false,
                                      })
                                    : undefined;
                            return (
                                <Volume
                                    key={volume.id}
                                    ref={registerRef(`v${areaIndex}:${volumeIndex}`)}
                                    tabIndex={volumeTabIndex(areaIndex, volumeIndex)}
                                    onFocus={() => setFocusPosition({ level: 'volume', areaIndex, volumeIndex })}
                                    label={getVolumeLabel(volume)}
                                    aria-label={volumeAriaLabel}
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
                            );
                        })}
                    </Area>
                ))}
            </g>
            {textDecorations.map(renderDecoration)}
        </Seatmap>
    );
};
