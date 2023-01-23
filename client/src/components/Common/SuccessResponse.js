import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { REQUEST_STATUS } from '../../services/util'
import styleVar from '../../styles/styleVar'
import Loader from './Loader'

export default function SuccessResponse({
    requestStatus = REQUEST_STATUS.FULFILLED,
    style,
    ...props }) {
    return (
        <View
            {...props}
            style={[{
                flex: 1,
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: styleVar.white,
                position: 'absolute',
                borderRadius: 20
            }, style]}>
            <ResponseIcon requestStatus={requestStatus} />
        </View>
    )
}

function ResponseIcon({ requestStatus }) {
    switch (requestStatus) {
        case REQUEST_STATUS.FAILED:
            return <Icon name='circle-with-cross' size={2 * styleVar.largeIconSize} color='red' />
        case REQUEST_STATUS.FULFILLED:
            return <Icon name='check' size={2 * styleVar.largeIconSize} color='green' />
        case REQUEST_STATUS.LOADING:
            return <Loader />
        default:
            return <Loader />
    }
}