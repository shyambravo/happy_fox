/**
 * @jest-environment jsdom
 */

import { ListComponent } from '../app/components/ListComponent.js';
import { screen, render, waitFor } from '@testing-library/react';
import { TEST_IDS } from '../app/enums/test-id';
import { listMockData } from './mock_data.js';

it('Should render the list properly', async () => {
  render(<ListComponent person={listMockData} />);

  await waitFor(() => {
    expect(screen.getByTestId(TEST_IDS.LIST_ITEM)).toBeInTheDocument();
  });

  Object.values(listMockData).forEach((val) => {
    const elem = screen.getByText(val);

    expect(elem).toBeInTheDocument();
  });

  expect(screen.getByRole("img")).toBeInTheDocument();
});
