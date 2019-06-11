/**
 * https://github.com/sapegin/jest-cheat-sheet
 */

import React from 'react';
import { fireEvent, cleanup, render, prettyDOM } from 'react-testing-library';

import DataPage from '..';

describe('<DataPage />', () => {
    // beforeAll(async () => {
    // });
    // beforeEach(async () => {
    // });
    afterEach(async () => {
        cleanup();
    });
    it('renders itself', async () => {
        const { getByText, getByTestId, container } = render(<DataPage />);

        console.dir(prettyDOM(container));

        expect(getByText('Some text')).toBeInstanceOf(HTMLElement);
        expect(getByTestId('some_id')).toBeInstanceOf(HTMLElement);

        const inner = container.querySelector('[class^="style_some-class"]');
        expect(inner).toBeInstanceOf(HTMLElement);

        expect(container.outerHTML).toMatchSnapshot();

        const input = container.querySelector('input[type="text"]');
        fireEvent.change(input, { target: { value: 'hello' } });
    });
});
