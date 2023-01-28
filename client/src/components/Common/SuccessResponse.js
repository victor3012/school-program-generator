import { View } from 'react-native'
import { REQUEST_STATUS } from '../../services/util'
import styleVar from '../../styles/styleVar'
import Loader from './Loader'
import SuccessIcon from '../Icons/SuccessIcon'
import CancelIcon from '../Icons/CancelIcon'

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
            return <CancelIcon size={2 * styleVar.largeIconSize} />
        case REQUEST_STATUS.FULFILLED:
            return <SuccessIcon size={2 * styleVar.largeIconSize} />
        case REQUEST_STATUS.LOADING:
            return <Loader />
        default:
            return <Loader />
    }
}