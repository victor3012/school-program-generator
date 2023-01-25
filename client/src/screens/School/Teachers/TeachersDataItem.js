import { StyleSheet, Text } from "react-native"
import Option from "../../../components/Common/OptionsMenu/Option"
import OptionsMenu from "../../../components/Common/OptionsMenu/OptionsMenu"
import DeleteIcon from "../../../components/Icons/DeleteIcon"
import EditIcon from "../../../components/Icons/EditIcon"
import { TEACHER_ROLES_NAMES } from "../../../services/util"
import globalStyles from "../../../styles/globalStyles"
import styleVar from "../../../styles/styleVar"
import DataItemContainer from "../DataItemContainer"

export default function TeachersDataItem({ data, actions }) {
    return (
        <DataItemContainer style={{ cursor: 'default' }}>
            <Text style={[globalStyles.text, styles.nonselectable, styles.role]}>{TEACHER_ROLES_NAMES[data.role] || data.role}</Text>
            <Text style={[globalStyles.text, styles.nonselectable, styles.name]}>{data.firstName} {data.lastName}</Text>
            <OptionsMenu containerStyle={styles.optionsButton}>
                <Option>
                    <Text style={[globalStyles.text, styles.emailTitle]}>
                        Email
                    </Text>
                    <Text style={[globalStyles.text, styles.emailText]}>
                        {data.email}
                    </Text>
                </Option>
                <Option onPress={() => actions.edit(data)}>
                    <Text style={globalStyles.text}>
                        Edit
                    </Text>
                    <EditIcon />
                </Option>
                <Option last onPress={() => actions.delete(data)}>
                    <Text style={globalStyles.text}>
                        Delete
                    </Text>
                    <DeleteIcon />
                </Option>
            </OptionsMenu>
        </DataItemContainer>
    )
}

const styles = StyleSheet.create({
    nonselectable: {
        userSelect: 'none'
    },
    role: {
        flex: 1,
        color: styleVar.gray
    },
    name: {
        flex: 1.5
    },
    optionsButton: {
        flex: 1
    },
    emailTitle: {
        fontSize: styleVar.smallFontSize,
        marginRight: 5
    },
    emailText: {
        color: styleVar.gray,
        fontSize: styleVar.smallFontSize
    }
})