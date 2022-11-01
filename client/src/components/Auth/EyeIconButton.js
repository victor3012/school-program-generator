import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import InputIconButton from '../InputIconButton';

export default function EyeIconButton({ passwordShown, setPasswordShown }) {
    return (
        <InputIconButton
            Icon={(args) => <Icon {...args} name={passwordShown ? 'eye-outline' : 'eye-off-outline'} />}
            onPress={() => setPasswordShown(ps => !ps)} />
    )
}