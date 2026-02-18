import { ReactNode, useEffect, useState } from 'react';
import { TextSizeController } from './textSize';

type ContentSize = [number, number, number, number];

const measureContentSize = (node: SVGSVGElement): ContentSize => {
    if (!('getBBox' in node)) {
        return [0, 0, 0, 0];
    }
    const box = node.getBBox();
    return [box.x, box.y, box.x + box.width, box.y + box.height];
};

const updateContentSize =
    (node: SVGSVGElement) =>
    (prev: ContentSize): ContentSize => {
        const next = measureContentSize(node);
        if (prev[0] === next[0] && prev[1] === next[1] && prev[2] === next[2] && prev[3] === next[3]) {
            return prev;
        }
        return next;
    };

/**
 * Props for the {@link Seatmap} component.
 * @public
 */
export interface SeatmapProps {
    /** CSS class name to apply to the root SVG element. */
    className?: string;
    /** Child elements to render inside the seatmap. */
    children?: ReactNode;
    /** Accessible label for the seatmap. Defaults to 'Seat map'. */
    ariaLabel?: string;
}

/**
 * Root container component for rendering a seatmap as an SVG.
 *
 * Automatically calculates the viewBox based on its content using a MutationObserver,
 * so the SVG scales to fit all child elements. Wraps children in a TextSizeController
 * for responsive text sizing.
 *
 * @example
 * ```tsx
 * <Seatmap>
 *   <Block x={100} y={100}>
 *     <Row>
 *       <Seat name="A1" />
 *       <Seat name="A2" x={100} />
 *     </Row>
 *   </Block>
 * </Seatmap>
 * ```
 *
 * @public
 */
export const Seatmap = ({ children, className, ariaLabel }: SeatmapProps) => {
    const [[minX, minY, maxX, maxY], setContentSize] = useState<[number, number, number, number]>([0, 0, 0, 0]);
    const [rootNode, setRootNode] = useState<SVGSVGElement>();
    const measuredRef = (node: SVGSVGElement) => {
        if (node === null) {
            return;
        }
        setRootNode(node);
    };
    useEffect(() => {
        if (rootNode === undefined) {
            return;
        }
        // Initial DOM measurement after mount — intentional synchronous setState
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setContentSize(updateContentSize(rootNode));
        if (!('MutationObserver' in window)) {
            return;
        }
        const observer = new window.MutationObserver(() => {
            setContentSize(updateContentSize(rootNode));
        });
        observer.observe(rootNode, { attributes: false, childList: true, subtree: true });
        return () => {
            observer.disconnect();
        };
    }, [rootNode]);
    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`}
            ref={measuredRef}
            className={className}
            role="group"
            aria-label={ariaLabel ?? 'Seat map'}
        >
            <TextSizeController>{children}</TextSizeController>
        </svg>
    );
};
