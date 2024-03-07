/**
 * @jest-environment jsdom
 */

// Integration testing

import Home from '../app/page.js';
import { screen, render, waitFor } from '@testing-library/react';
import { employeesMockData } from './mock_data.js';
import { TEST_IDS } from '../app/enums/test-id.js';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';

describe('Home page integration testing', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  jest.spyOn(console, 'error').mockImplementation(() => {});

  it('Should render home page and perform actions on sidebar', async () => {

    // To mock next js endpoints
    fetchMock.mockOnce(JSON.stringify(employeesMockData));

    render(<Home />);

    await waitFor(() => {
        // Check if sidebar and main content are rendered, Also check the sidebar list items count
      expect(screen.getByTestId(TEST_IDS.SIDE_BAR)).toBeInTheDocument();
      expect(screen.getByTestId(TEST_IDS.MAIN_CONTENT)).toBeInTheDocument();
      expect(screen.queryAllByTestId(TEST_IDS.LIST_ITEM).length).toBe(5);
    });

    // Type something in the filter and check for sidebar list count again
    const searchElem = screen.getByRole("textbox");
    await userEvent.click(searchElem);
    await userEvent.keyboard('CEO');

    expect(screen.queryAllByTestId(TEST_IDS.LIST_ITEM).length).toBe(1);
  });
});
