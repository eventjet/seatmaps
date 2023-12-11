## @eventjet/react-seatmaps

This package provides react components to render seatmaps in a ticketing system.

### Installation

```bash
  yarn add @eventjet/react-seatmaps
```

### Simple Usage Example - Volume

```javascript
import React from 'react';
import { Volume } from '@eventjet/react-seatmaps';
const component = () => (
    <Volume
      x={0},
      y={0},
      width={400},
      height={400},
      color='#808080',
      disabled={false}
      active={false}
      label="Seat 1"
  />);
```

### Usage Example - Volumes + SeatCountBadge

SeatCountBadge only works with Volumes at the moment

```javascript
import React from 'react';
import { Volume } from '@eventjet/react-seatmaps';
const component = () => (
    <Volume
        x={0},
        y={0},
        width={400},
        height={400},
        color='#808080',
        disabled={false}
        active={false}
        label="Seat 1"
    />
        <SeatCountBadge containerWidth={400} count={200} />
    </Volume>
  );
```
