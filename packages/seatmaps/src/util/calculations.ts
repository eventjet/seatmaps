type Vector = [number, number];

const calculateEllipseCenter = (width: number, height: number, x: number, y: number): [number, number] => {
    const Cx = x + width / 2;
    const Cy = y + height / 2;
    return [Cx, Cy];
};

export const calculateBadgePosition = (position: Vector, dimensions: Vector): Vector => {
    const [x_p, y_p] = position;
    const [width, height] = dimensions;
    const [x_c, y_c] = calculateEllipseCenter(width, height, x_p, y_p);

    // Calculate the radii (half of width and height)
    const a = width / 2;
    const b = height / 2;

    // Calculate the intersection point
    const x = (-a * y_c + a * ((Math.sqrt(2) * b) / 2 + y_c) + b * x_c) / b;
    const y = (Math.sqrt(2) * -b) / 2 + y_c;

    return [x, y];
};
