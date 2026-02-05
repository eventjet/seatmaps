/**
 * React component library for rendering interactive SVG-based seatmaps.
 *
 * Components fall into two categories:
 *
 * **Addressable elements** have identities meaningful to the ticketing system:
 * - {@link Area} - A section containing rows, seats, and volumes (identity tracked externally)
 * - {@link Row} - A row within an area (identified by its label)
 * - {@link Seat} - An individual bookable seat (identified by its name)
 * - {@link Volume} - A general admission zone (identified by its label)
 *
 * Naming constraints:
 * - Each combination of area + row + seat name must be unique
 * - Volume labels must be unique within their containing area
 *
 * **Structural elements** are for layout without ticketing identity:
 * - {@link Block} - Groups rows within an area for positioning/rotation
 * - {@link Div} - SVG wrapper for nesting
 * - {@link Circle}, {@link Ellipse}, {@link Rectangle}, {@link Text} - Decorative shapes
 *
 * @packageDocumentation
 */

export { Area, type AreaProps } from './Area';
export { Badge, type BadgeProps } from './Badge';
export { Block, type BlockProps } from './Block';
export { Circle, type CircleProps } from './Circle';
export { Div, type DivProps } from './Div';
export { Ellipse, type EllipseProps } from './Ellipse';
export { Rectangle, type RectangleProps } from './Rectangle';
export { Row, type RowProps } from './Row';
export { Seat, SeatShape, type SeatProps } from './Seat';
export {
    SeatCountBadge,
    SeatCountBadgeOnEllipse,
    type Dimensions,
    type LegacySeatCountBadgeProps,
    type NewSeatCountBadgeProps,
    type SeatCountBadgeProps,
} from './SeatCountBadge';
export { Seatmap, type SeatmapProps } from './Seatmap';
export { Text, type TextProps } from './Text';
export { Volume, type VolumeProps } from './Volume';
