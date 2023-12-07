import { ReactNode, useCallback, useEffect, useState } from 'react';
import { TextSizeController } from './textSize';

const measureContentSize = (node: SVGSVGElement): [number, number, number, number] => {
    if (!('getBBox' in node)) {
        return [0, 0, 0, 0];
    }
    const box = node.getBBox();
    return [box.x, box.y, box.x + box.width, box.y + box.height];
};

export interface SeatmapProps {
    className?: string;
    children?: ReactNode;
}

export const Seatmap = ({ children, className }: SeatmapProps) => {
    const [[minX, minY, maxX, maxY], setContentSize] = useState<[number, number, number, number]>([0, 0, 0, 0]);
    const [rootNode, setRootNode] = useState<SVGSVGElement>();
    const measuredRef = useCallback((node: SVGSVGElement) => {
        if (node === null) {
            return;
        }
        setRootNode(node);
    }, []);
    useEffect(() => {
        if (rootNode === undefined) {
            return;
        }
        setContentSize(measureContentSize(rootNode));
        if (!('MutationObserver' in window)) {
            return;
        }
        const observer = new window.MutationObserver(() => {
            setContentSize(measureContentSize(rootNode));
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
        >
            <TextSizeController>{children}</TextSizeController>
        </svg>
    );
};
