import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

it('there is only one selected date', () => {
    const {container} = render(<App/>);
    expect(container.getElementsByClassName('scheduler-date selected').length).toBe(1);
});






