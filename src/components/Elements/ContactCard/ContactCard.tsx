import { Children, useRef, useState } from 'react'
import { MdMailOutline } from 'react-icons/md'
import Popper, { PopperPlacementType } from '@mui/material/Popper'
import { Box } from '@mui/system'
import CardContent from '@mui/material/CardContent'
import getUserInitials from '../../../utils/getUserInitials'
import getRandomColor from '../../../utils/getRandomColor'
import { IContact } from '../../../store/storeTypes/contactsTypes'
import * as CS from './ContactCardStyles'

interface IContactCard {
  contact: IContact
  avatarURL: string
  offset?: [number, number]
  children: JSX.Element
}

const NO_EMAIL = 'No address available'
const NO_NAME = 'No display name'

const ContactCard = ({
  avatarURL,
  contact,
  offset = [20, 10],
  children,
}: IContactCard) => {
  const [isHovering, setIsHovering] = useState(false)
  const [placement, setPlacement] = useState<PopperPlacementType>()
  const [cardDelay, setCardDelay] = useState<ReturnType<
    typeof setTimeout
  > | null>(null)

  const { name, emailAddress } = contact

  const contactCardPopperId = isHovering ? 'contact-popper' : undefined

  const handleMouseOver = () => {
    setIsHovering(true)
    setPlacement('bottom-start')
  }
  const handleMouseOut = () => {
    setIsHovering(false)
  }

  const contactCardWrapper = useRef<HTMLElement>(null)
  const staticInitials = getUserInitials(avatarURL)

  return (
    <>
      <Box
        onMouseOver={() => {
          cardDelay && !isHovering && clearTimeout(cardDelay)
          setCardDelay(setTimeout(() => handleMouseOver(), 500))
        }}
        onMouseOut={() => {
          setIsHovering(false)
          cardDelay && clearTimeout(cardDelay)
          handleMouseOut()
        }}
        ref={contactCardWrapper}
        sx={{
          cursor: 'pointer',
        }}
      >
        {Children.only(children)}
      </Box>
      <Popper
        id={contactCardPopperId}
        open={isHovering}
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
        <CS.ContactAvatarCard sx={{ maxWidth: 345 }}>
          <CS.ContactCardAvatar $randomColor={getRandomColor(staticInitials)}>
            <span>{staticInitials}</span>
          </CS.ContactCardAvatar>
          <CardContent>
            <CS.ContactCardName>{name || NO_NAME}</CS.ContactCardName>
            <CS.ContactCardDetails>
              <CS.ContactCardEmailButton
                disabled={!emailAddress}
                $randomColor={getRandomColor(staticInitials)}
              >
                <MdMailOutline size="20" />
              </CS.ContactCardEmailButton>
              <Box
                display="flex"
                sx={{
                  flexDirection: 'column',
                  marginLeft: '0.6rem',
                  overflow: 'hidden',
                }}
              >
                <span style={{ fontSize: '0.8rem' }}>Email</span>
                <CS.ContactCardEmail>
                  {emailAddress || NO_EMAIL}
                </CS.ContactCardEmail>
              </Box>
            </CS.ContactCardDetails>
          </CardContent>
        </CS.ContactAvatarCard>
      </Popper>
    </>
  )
}

export default ContactCard
