/**
 * @jest-environment jsdom
 */

import { Card } from '../app/components/Card.js';
import { screen, render, waitFor } from '@testing-library/react';
import { TEST_IDS } from '../app/enums/test-id';
import { cardMockData } from './mock_data.js';

it('Should render the card properly', async () => {
  render(<Card person={cardMockData} editManager={() => {}} />);

  await waitFor(() => {
    expect(screen.getByTestId(TEST_IDS.CARD)).toBeInTheDocument();
  });

  Object.values(cardMockData).forEach((val) => {
    const elem = screen.getByText(val);

    expect(elem).toBeInTheDocument();
  });

  expect(screen.getByRole("img")).toBeInTheDocument();
});
