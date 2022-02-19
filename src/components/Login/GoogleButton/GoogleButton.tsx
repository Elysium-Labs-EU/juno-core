import { FcGoogle } from 'react-icons/fc'
import * as S from './GoogleButtonStyles'

const GOOGLE = 'Login with Google'

const GoogleButton = ({ renderProps }: { renderProps: any }) => (
    <S.StyledButton onClick={renderProps.onClick} disabled={renderProps.disabled} type="button">
        <S.IconContainer>
            <FcGoogle size={20} />
        </S.IconContainer>
        {GOOGLE}
    </S.StyledButton>
)

export default GoogleButton