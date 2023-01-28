import Icon from './Icon'
import styleVar from '../../styles/styleVar'

export default function EditIcon({
    color = styleVar.darkBlue,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='file-edit' color={color} size={size} {...props} />
    )
}