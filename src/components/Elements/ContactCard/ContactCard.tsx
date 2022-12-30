import CardContent from '@mui/material/CardContent'
import Popper from '@mui/material/Popper'
import { Box } from '@mui/system'
import { Children, useRef, useState } from 'react'

import { QiCompose, QiMail } from 'images/svgIcons/quillIcons'
import { useAppDispatch } from 'store/hooks'
import * as GS from 'styles/globalStyles'
import createComposeViaURL from 'utils/createComposeViaURL'
import getRandomColor from 'utils/getRandomColor'
import getUserInitials from 'utils/getUserInitials'

import CustomButton from '../Buttons/CustomButton'
import CustomIconButton from '../Buttons/CustomIconButton'
import * as S from './ContactCardStyles'
import type { IContactCard } from './ContactCardTypes'

const NO_EMAIL = 'No address available'
const NO_NAME = 'No display name'

const ContactCard = ({
  userEmail,
  contact,
  offset = [20, 10],
  children,
  placement = 'bottom-start',
}: IContactCard) => {
  const [isHovering, setIsHovering] = useState(false)
  const cardDelay = useRef<ReturnType<typeof setTimeout> | null>(null)
  const contactCardWrapper = useRef<HTMLElement | null>(null)
  const dispatch = useAppDispatch()

  const { name, emailAddress } = contact

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
        <S.ContactCard>
          <S.ContactCardAvatar $randomColor={getRandomColor(staticInitials)}>
            <span>{staticInitials}</span>
          </S.ContactCardAvatar>
          <CardContent>
            <S.ContactCardName title={name}>
              {name || NO_NAME}
            </S.ContactCardName>
            <S.ContactCardDetails>
              <S.ContactCardEmailButton
                disabled={!emailAddress}
                $randomColor={getRandomColor(staticInitials)}
              >
                <QiMail size={20} />
              </S.ContactCardEmailButton>
              <Box
                display="flex"
                sx={{
                  flexDirection: 'column',
                  marginLeft: '0.6rem',
                  overflow: 'hidden',
                }}
              >
                <GS.Span small>Email</GS.Span>
                <S.ContactCardEmail title={emailAddress}>
                  {emailAddress || NO_EMAIL}
                </S.ContactCardEmail>
                <CustomButton
                  icon={<QiCompose />}
                  label="Compose"
                  title="Compose email to this user"
                  onClick={() => {
                    createComposeViaURL({
                      dispatch,
                      mailToLink: `mailto:${userEmail}`,
                    })
                  }}
                />
              </Box>
            </S.ContactCardDetails>
          </CardContent>
        </S.ContactCard>
      </Popper>
    </Box>
  )
}

export default ContactCard
