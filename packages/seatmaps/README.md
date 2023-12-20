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
  />
);
```

### Usage Example - Volumes + SeatCountBadge

SeatCountBadge only works with Volumes at the moment

#### SeatCountBadge on Rectangular Volume

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
  >
      <SeatCountBadge containerProps={{ width: 400 }} count={200} />
  </Volume>
);
```

#### SeatCountBadge on Ellipse Volume

```javascript
import React from 'react';
import { Volume } from '@eventjet/react-seatmaps';
const component = () => (
  <Volume
      x={0},
      y={0},
      width={400},
      height={200},
      color='#808080',
      disabled={false}
      active={false}
      label="Seat 1"
      shape={'ellipse'}
  >
      <SeatCountBadgeOnEllipse
          containerProps={{ width: 400 }}
          count={200}
          color="#ff9900"
      />
  </Volume>
);

```

#### SeatCountBadge on Circle Volume

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
      shape={'ellipse'}
  >
      <SeatCountBadgeOnCircle
          containerProps={{ width: 400 }}
          count={200}
          color="#ff9900"
      />
  </Volume>
);

```
