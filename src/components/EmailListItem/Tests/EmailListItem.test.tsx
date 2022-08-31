// import renderer from 'react-test-renderer'
import { screen } from '@testing-library/react'
import testEmail from '../../../utils/ForTesting/testEmail'
import testDraftEmail from '../../../utils/ForTesting/testDraftEmail'
import renderWithProviders from '../../../utils/ForTesting/testUtils'
// import { render, screen } from '../../../utils/ForTesting/testUtils'
// import toJson from '../../../utils/toJSONforTest'
import EmailListItem from '../EmailListItem'

describe('EmailListItem regular tests', () => {
  test('should always show an avatar', () => {
    renderWithProviders(
      <EmailListItem
        email={testEmail}
        showLabel={false}
        index={0}
        activeIndex={0}
      />
    )

    expect(screen.getByTestId('avatar')).toBeDefined()
  })

  test('should render a sender name if email is not a draft', () => {
    renderWithProviders(
      <EmailListItem
        email={testEmail}
        showLabel={false}
        index={0}
        activeIndex={0}
      />
    )

    expect(screen.getByTestId('email-sender')).toBeDefined()
  })

  test('should render labels if showLabel is true', () => {
    renderWithProviders(
      <EmailListItem email={testEmail} showLabel index={0} activeIndex={0} />
    )

    expect(screen.getByTestId('email-label')).toBeDefined()
  })

  test('should not render message count if number of messages is 1', () => {
    renderWithProviders(
      <EmailListItem email={testEmail} showLabel index={0} activeIndex={0} />
    )

    expect(screen.queryByTestId('email-message-count')).toBe(null)
  })

  test('should always render a snippet', () => {
    renderWithProviders(
      <EmailListItem
        email={testEmail}
        showLabel={false}
        index={0}
        activeIndex={0}
      />
    )

    expect(screen.getByTestId('email-snippet')).toBeDefined()
  })

  test('should not render an attachment icon if number of attachents is 0', () => {
    renderWithProviders(
      <EmailListItem email={testEmail} showLabel index={0} activeIndex={0} />
    )

    expect(screen.getByTestId('email-has-no-attachment')).toBeDefined()
  })

  // test('should render an attachment icon if number of attachents is greater than 0', () => {
  //   renderWithProviders(<EmailListItem email={testEmail} showLabel index={0} activeIndex={0} />)

  //   expect(screen.queryByTestId('email-has-attachment')).toBe(null)
  // })

  test('should render an timestamp if threadTimestamp is available', () => {
    renderWithProviders(
      <EmailListItem email={testEmail} showLabel index={0} activeIndex={0} />
    )

    expect(screen.getByTestId('email-timestamp')).toBeDefined()
  })

  test('should render regular inline thread actions if email is not a draft', () => {
    renderWithProviders(
      <EmailListItem email={testEmail} showLabel index={0} activeIndex={0} />
    )

    expect(screen.getByTestId('email-regular-inline-actions')).toBeDefined()
  })
})

describe('EmailListItem draft tests', () => {
  test('should render a recipient name if email is a draft', () => {
    renderWithProviders(
      <EmailListItem
        email={testDraftEmail}
        showLabel={false}
        index={0}
        activeIndex={0}
      />
    )

    expect(screen.findByTestId('email-recipient')).toBeDefined()
  })

  test('should render a draft snippet indicator when the email is a draft', () => {
    renderWithProviders(
      <EmailListItem
        email={testDraftEmail}
        showLabel={false}
        index={0}
        activeIndex={0}
      />
    )

    expect(screen.findByTestId('email-draft-snippet-indicator')).toBeDefined()
  })
})
