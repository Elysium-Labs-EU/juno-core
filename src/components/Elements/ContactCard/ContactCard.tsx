import CardContent from '@mui/material/CardContent'
import Popper from '@mui/material/Popper'
import { Box } from '@mui/system'
import { Children, useRef, useState } from 'react'

import { Span } from 'styles/globalStyles'
import getRandomColor from 'utils/getRandomColor'
import getUserInitials from 'utils/getUserInitials'

import * as S from './ContactCardStyles'
import type {
  ContactCardProps,
  ContactCardPopperProps,
} from './ContactCardTypes'
import Stack from '../Stack/Stack'

const EMAIL_HEADER = 'Email'
const NO_NAME = 'No display name'

export const ContactCardContent = ({
  staticInitials,
  contact,
}: Pick<ContactCardPopperProps, 'contact' | 'staticInitials'>) => {
  const { name } = contact

  return (
    <S.ContactCard>
      <S.ContactCardAvatar $randomColor={getRandomColor(staticInitials)}>
        <Span>{staticInitials}</Span>
      </S.ContactCardAvatar>
      <CardContent>
        <S.ContactCardName title={name ?? ''}>
          {name || NO_NAME}
        </S.ContactCardName>
        <Stack direction="vertical">
          <Stack align="center">
            <Stack
              direction="vertical"
              spacing="none"
              style={{ overflow: 'hidden' }}
            >
              <Span small="true">{EMAIL_HEADER}</Span>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </S.ContactCard>
  )
}

const ContactCardPopper = ({
  contact,
  contactCardPopperId,
  contactCardWrapper,
  isHovering,
  offset = [20, 10],
  placement = 'bottom-start',
  staticInitials,
}: ContactCardPopperProps) => (
  <Popper
    id={contactCardPopperId}
    open={isHovering}
    sx={{
      zIndex: 2000,
    }}
    modifiers={[
      {
        name: 'offset',
        options: {
          offset: [offset[0], offset[1]],
        },
      },
    ]}
    anchorEl={contactCardWrapper.current}
    placement={placement}
  >
    <ContactCardContent contact={contact} staticInitials={staticInitials} />
  </Popper>
)

const ContactCard = ({
  userEmail,
  contact,
  offset,
  children,
  placement,
}: ContactCardProps) => {
  const [isHovering, setIsHovering] = useState(false)
  const cardDelay = useRef<ReturnType<typeof setTimeout> | null>(null)
  const contactCardWrapper = useRef<HTMLElement | null>(null)

  const contactCardPopperId = isHovering ? 'contact-popper' : undefined

  const showContactCard = (hover: boolean) => {
    if (cardDelay.current) {
      clearTimeout(cardDelay.current)
    }
    cardDelay.current = setTimeout(() => setIsHovering(hover), 500)
  }

  const staticInitials = getUserInitials(userEmail)

  return (
    <Box
      onMouseOver={() => {
        showContactCard(true)
      }}
      onMouseOut={() => {
        showContactCard(false)
      }}
      ref={contactCardWrapper}
      sx={{
        cursor: 'pointer',
        display: 'inherit',
      }}
    >
      {Children.only(children)}
      <ContactCardPopper
        contact={contact}
        contactCardPopperId={contactCardPopperId}
        contactCardWrapper={contactCardWrapper}
        isHovering={isHovering}
        offset={offset}
        placement={placement}
        staticInitials={staticInitials}
      />
    </Box>
  )
}

export default ContactCard
