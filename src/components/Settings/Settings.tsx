import React, { useEffect } from 'react'
import Switch from '@mui/material/Switch'
import Modal from '@mui/material/Modal'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { isAvatarVisible, selectIsSettingsOpen, setIsSettingsOpen, setShowAvatar } from '../../Store/utilsSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import * as S from './SettingsStyle'


const handleClose = (dispatch : Function) => dispatch(setIsSettingsOpen(false))

const Settings = () =>{
    const dispatch = useAppDispatch()
    const isSettingsOpen = useAppSelector(selectIsSettingsOpen)
    const avatarVisible = useAppSelector(isAvatarVisible)

    useEffect(() => {
        if(localStorage.getItem('showAvatar') === null || (localStorage.getItem('showAvatar') !== "true" && localStorage.getItem('showAvatar') !== "false" )) {
            localStorage.setItem('showAvatar', "true")
            dispatch(setShowAvatar(localStorage.getItem("showAvatar") === "true"))
        }
    }, [])

    const switchAvatarView = () => {
        if(localStorage.getItem('showAvatar') === "true") {
            localStorage.setItem('showAvatar', "false")
            dispatch(setShowAvatar(false))
        } 
        else {
            localStorage.setItem('showAvatar', "true")
            dispatch(setShowAvatar(true))
        }
    }

    return (
        <Modal
            open={ isSettingsOpen }
            onClose={() => handleClose(dispatch)}
            aria-labelledby="modal-search"
            aria-describedby="modal-search-box"
        >
            <S.Dialog>
                <S.SettingsHeader>
                    Settings
                </S.SettingsHeader>
                <S.SettingsDiv>
                    <FormGroup>
                    <FormControlLabel label="Do you want to see Avatars?  " control={<Switch value='Show Avatar' onClick={()=>switchAvatarView()} defaultChecked={avatarVisible}/>}/>
                    </FormGroup>
                </S.SettingsDiv>
            </S.Dialog>
        </Modal>
    )
}

export default Settings


