import globalStyles from '../../styles/globalStyles';
import { EyeIcon, EyeCrossedIcon } from '../Icons/Eye';
import IconButton from '../Common/IconButton';

export default function EyeIconButton({ passwordShown, setPasswordShown }) {
    return (
        <IconButton
            style={globalStyles.InputIconButton}
            Icon={passwordShown ? EyeIcon : EyeCrossedIcon}
            onPress={() => setPasswordShown(ps => !ps)} />
    )
}