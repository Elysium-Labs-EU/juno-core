import CardContent from '@mui/material/CardContent'
import Popper from '@mui/material/Popper'
import { Box } from '@mui/system'
import { Children, useRef, useState } from 'react'

import { QiMail, QiSearch } from 'images/svgIcons/quillIcons'
import { useAppDispatch } from 'store/hooks'
import * as GS from 'styles/globalStyles'
import createComposeViaURL from 'utils/createComposeViaURL'
import createSearchViaUrl from 'utils/createSearchViaUrl'
import getRandomColor from 'utils/getRandomColor'
import getUserInitials from 'utils/getUserInitials'

import * as S from './ContactCardStyles'
import type { IContactCard, IContactCardPopper } from './ContactCardTypes'
import CustomButton from '../Buttons/CustomButton'

const NO_EMAIL = 'No address available'
const NO_NAME = 'No display name'

export const ContactCardContent = ({
  staticInitials,
  contact,
}: Pick<IContactCardPopper, 'contact' | 'staticInitials'>) => {
  const dispatch = useAppDispatch()
  const { name, emailAddress } = contact

  return (
    <S.ContactCard>
      <S.ContactCardAvatar $randomColor={getRandomColor(staticInitials)}>
        <span>{staticInitials}</span>
      </S.ContactCardAvatar>
      <CardContent>
        <S.ContactCardName title={name}>{name || NO_NAME}</S.ContactCardName>
        <S.ContactCardDetails>
          <S.ContactCardEmailContainer>
            <S.ContactCardEmailButton
              disabled={!emailAddress}
              $randomColor={getRandomColor(staticInitials)}
              onClick={() => {
                createComposeViaURL({
                  dispatch,
                  mailToLink: `mailto:${emailAddress}`,
                })
              }}
              title="Create email to this user"
            >
              <QiMail size={20} />
            </S.ContactCardEmailButton>
            <S.EmailContainer>
              <GS.Span small>Email</GS.Span>
              <S.ContactCardEmail
                title={emailAddress}
                onClick={() => {
                  createComposeViaURL({
                    dispatch,
                    mailToLink: `mailto:${emailAddress}`,
                  })
                }}
              >
                {emailAddress || NO_EMAIL}
              </S.ContactCardEmail>
            </S.EmailContainer>
          </S.ContactCardEmailContainer>
          <S.AdditionalButtonsContainer>
            <CustomButton
              icon={<QiSearch />}
              label="Search for emails"
              title="Search for emails with this user"
              onClick={() => {
                createSearchViaUrl({
                  dispatch,
                  searchQuery: emailAddress,
                })
              }}
            />
          </S.AdditionalButtonsContainer>
        </S.ContactCardDetails>
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
}: IContactCardPopper) => (
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
}: IContactCard) => {
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
