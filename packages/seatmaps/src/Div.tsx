import { ReactNode } from 'react';

/**
 * Props for the {@link Div} component.
 * @public
 */
export interface DivProps {
    /** Child elements to render inside the wrapper SVG. */
    children?: ReactNode;
}

/**
 * A structural wrapper that renders children inside an SVG element.
 *
 * This is a structural element with no identity in the ticketing system.
 * Unlike {@link Block} and {@link Area}, Div does not support positioning or rotation.
 * Useful for nesting SVG content without creating a full {@link Seatmap} container.
 *
 * @public
 */
export const Div = ({ children }: DivProps) => <svg>{children}</svg>;
