import { fireEvent, render } from '@testing-library/react';
import { Seat } from './Seat';

it('reports clicks', () => {
    const handleClick = jest.fn();
    const {getByText} = render(<svg><Seat name="23" onClick={handleClick}/></svg>);

    fireEvent.click(getByText('23'));

    expect(handleClick).toHaveBeenCalled();
});

it('does not report a click if it is disabled', () => {
    const handleClick = jest.fn();
    const {getByText} = render(<svg><Seat name="23" disabled={true} onClick={handleClick}/></svg>);

    fireEvent.click(getByText('23'));

    expect(handleClick).not.toHaveBeenCalled();
});
