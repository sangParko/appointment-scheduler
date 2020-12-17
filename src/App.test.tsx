import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

test('there are only two selected dates', () => {
    const {container} = render(<App/>);
    expect(container.getElementsByClassName('scheduler-date selected').length).toBe(2);
});






