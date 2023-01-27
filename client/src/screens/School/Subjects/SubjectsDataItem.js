import { StyleSheet, Text } from "react-native"
import Option from "../../../components/Common/OptionsMenu/Option"
import OptionsMenu from "../../../components/Common/OptionsMenu/OptionsMenu"
import DeleteIcon from "../../../components/Icons/DeleteIcon"
import EditIcon from "../../../components/Icons/EditIcon"
import globalStyles from "../../../styles/globalStyles"
import styleVar from "../../../styles/styleVar"
import DataItemContainer from "../DataItemContainer"

export default function SubjectsDataItem({ data, actions }) {
    return (
        <DataItemContainer key={data.id}>
            <Text style={[globalStyles.text, styles.centered, styles.type]}>{data.roomType || '-'}</Text>
            <Text style={[globalStyles.text, styles.centered, styles.name]}>{data.name}</Text>
            <OptionsMenu containerStyle={styles.optionsButton}>
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
    centered: {
        textAlign: 'center'
    },
    type: {
        flex: 1,
        color: styleVar.gray
    },
    name: {
        flex: 2
    },
    optionsButton: {
        flex: 1
    }
})