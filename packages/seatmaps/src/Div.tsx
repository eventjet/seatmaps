import React, { ReactNode } from 'react';

interface DivProps {
    children?: ReactNode;
}

export const Div = ({children}: DivProps) => (
    <svg>{children}</svg>
);
