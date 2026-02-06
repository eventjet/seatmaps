# @eventjet/react-seatmaps

React component library for rendering interactive SVG-based seatmaps in ticketing systems.

## Installation

```bash
npm install @eventjet/react-seatmaps
```

or

```bash
pnpm add @eventjet/react-seatmaps
```

### Peer Dependencies

```bash
npm install react react-dom @emotion/react @emotion/styled
```

or

```bash
pnpm add react react-dom @emotion/react @emotion/styled
```

## Quick Start

The easiest way to render a seatmap is with the `SeatmapLayout` component, which takes a plain data object:

```tsx
import { SeatmapLayout, SeatmapLayoutData, SeatShape } from '@eventjet/react-seatmaps';

const data: SeatmapLayoutData = {
    areas: [
        {
            name: 'Main Hall',
            blocks: [
                {
                    rows: [
                        {
                            name: 'A',
                            showLabels: 'both',
                            seats: [
                                { id: 'a-1', name: '1', x: 0, color: '#ff9900', shape: SeatShape.CIRCLE },
                                { id: 'a-2', name: '2', x: 100, color: '#ff9900', shape: SeatShape.CIRCLE },
                                { id: 'a-3', name: '3', x: 200, color: '#ff9900', shape: SeatShape.CIRCLE },
                            ],
                        },
                    ],
                },
            ],
            volumes: [
                {
                    id: 'ga-1',
                    label: 'Standing Area',
                    x: 500,
                    width: 300,
                    height: 150,
                    color: '#00ff99',
                    availableSeats: 250,
                },
            ],
        },
    ],
};

function MyVenue() {
    return (
        <SeatmapLayout
            data={data}
            onBookableClick={({ id, type, disabled }) => {
                if (disabled) {
                    alert('This is no longer available');
                    return;
                }
                console.log(`${type} clicked:`, id);
            }}
        />
    );
}
```

`SeatmapLayout` handles seat name visibility, badge placement, row labels, and decorations automatically. For full control, compose the low-level components directly (see below).

## Components

### SeatmapLayout

High-level component that renders an entire seatmap from a `SeatmapLayoutData` object.

```tsx
<SeatmapLayout
    data={data}
    onBookableClick={({ id, type, disabled }) => console.log(id, type, disabled)}
    className="my-seatmap"
    ariaLabel="Venue seating"
/>
```

**Props:** `data`, `onBookableClick`, `className`, `ariaLabel`

The `onBookableClick` callback receives a `SeatmapBookableClickEvent` with `id` (string), `type` (`'seat'` | `'volume'`), and `disabled` (boolean). It fires for both enabled and disabled elements, so you can show a message like "this seat is no longer available" when a disabled element is clicked.

**Data types:** `SeatmapLayoutData`, `SeatmapAreaData`, `SeatmapBlockData`, `SeatmapRowData`, `SeatmapSeatData`, `SeatmapVolumeData`, `SeatmapDecoration`

### Low-Level Components

For cases where `SeatmapLayout` doesn't provide enough flexibility, compose the individual components directly:

### Seatmap

Root SVG container that auto-calculates viewBox based on children.

```tsx
<Seatmap className="venue-map">{/* child components */}</Seatmap>
```

### Seat

Individual seat with optional name label.

```tsx
<Seat
    name="12"
    x={100}
    y={0}
    color="#ff9900"
    shape={SeatShape.CIRCLE}
    active={false}
    disabled={false}
    hideName={false}
    onClick={() => console.log('clicked')}
/>
```

**Props:** `name`, `x`, `y`, `color`, `shape` (`SeatShape.SQUARE` | `SeatShape.CIRCLE`), `active`, `disabled`, `hideName`, `onClick`, `onDisabledClick`

### Row

Groups seats horizontally with optional row labels.

```tsx
<Row
    x={0}
    y={100}
    leftLabel="A"
    rightLabel="A"
>
    <Seat
        name="1"
        x={0}
        color="#ff9900"
    />
    <Seat
        name="2"
        x={100}
        color="#ff9900"
    />
</Row>
```

**Props:** `x`, `y`, `leftLabel`, `rightLabel`, `children`

### Block

Generic grouping container with transform support.

```tsx
<Block
    x={100}
    y={200}
    angle={45}
    width={300}
    height={200}
>
    {/* rows, seats, etc. */}
</Block>
```

**Props:** `x`, `y`, `angle`, `width`, `height`, `children`

### Volume

General admission area (rectangle or ellipse).

```tsx
<Volume
    x={0}
    y={0}
    width={400}
    height={200}
    label="Standing Area"
    color="#ff9900"
    shape="rectangle"
    onClick={() => console.log('clicked')}
/>
```

**Props:** `x`, `y`, `width`, `height`, `label`, `color`, `shape` (`'rectangle'` | `'ellipse'`), `angle`, `active`, `disabled`, `fontWeight`, `onClick`, `onDisabledClick`, `children`

### SeatCountBadge

Badge for displaying seat counts on rectangular volumes.

```tsx
<Volume
    width={400}
    height={200}
    color="#ff9900"
>
    <SeatCountBadge
        containerProps={{ width: 400, height: 200 }}
        count={150}
        color="#ff9900"
    />
</Volume>
```

### SeatCountBadgeOnEllipse

Badge for displaying seat counts on ellipse volumes.

```tsx
<Volume
    width={400}
    height={200}
    shape="ellipse"
    color="#ff9900"
>
    <SeatCountBadgeOnEllipse
        containerProps={{ width: 400, height: 200 }}
        count={150}
        color="#ff9900"
    />
</Volume>
```

### Badge

Generic circular badge component.

```tsx
<Badge
    x={100}
    y={100}
    count={99}
    color="#ff0000"
/>
```

## Coordinate System

All coordinates are scaled by a factor of 10 internally. For example, `x={100}` becomes `10` in the rendered SVG.

## License

MIT
