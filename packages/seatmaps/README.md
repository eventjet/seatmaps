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

```tsx
import { Seatmap, Block, Row, Seat, Volume, SeatShape } from '@eventjet/react-seatmaps';

function MyVenue() {
    return (
        <Seatmap className="my-seatmap">
            <Block>
                <Row
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
                    <Seat
                        name="3"
                        x={200}
                        color="#ff9900"
                    />
                </Row>
                <Row
                    y={100}
                    leftLabel="B"
                    rightLabel="B"
                >
                    <Seat
                        name="1"
                        x={0}
                        color="#ff9900"
                        shape={SeatShape.CIRCLE}
                    />
                    <Seat
                        name="2"
                        x={100}
                        color="#ff9900"
                        shape={SeatShape.CIRCLE}
                    />
                    <Seat
                        name="3"
                        x={200}
                        color="#ff9900"
                        shape={SeatShape.CIRCLE}
                    />
                </Row>
            </Block>
            <Volume
                x={500}
                width={300}
                height={150}
                label="General Admission"
                color="#00ff99"
            />
        </Seatmap>
    );
}
```

## Components

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

**Props:** `x`, `y`, `width`, `height`, `label`, `color`, `shape` (`'rectangle'` | `'ellipse'`), `angle`, `active`, `disabled`, `fontWeight`, `onClick`, `children`

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
