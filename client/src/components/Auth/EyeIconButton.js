import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import globalStyles from '../../styles/globalStyles';

import IconButton from '../Common/IconButton';

export default function EyeIconButton({ passwordShown, setPasswordShown }) {
    return (
        <IconButton
            style={globalStyles.InputIconButton}
            Icon={(args) => <Icon {...args} name={passwordShown ? 'eye-outline' : 'eye-off-outline'} />}
            onPress={() => setPasswordShown(ps => !ps)} />
    )
}