/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'


it('renders header correctly', () => {
  const {getByTestId} = render(
      <SetHeader data-testid="setheader" />,
      expect(getByTestId('setheader')).toHave
  );
})

// const linkElement = screen.getByText(/learn react/i)
// expect(linkElement).toBeInTheDocument()
