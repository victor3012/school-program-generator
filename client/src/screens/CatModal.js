import { useState } from 'react';
import { StyleSheet, Text, View, Image, Modal } from 'react-native';
import OpacityButton from '../components/OpacityButton';
import globalStyles from '../styles/globalStyles';
import styleVar from '../styles/styleVar';


export default function CatModal() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View>
                            <Text style={globalStyles.text}>
                                Nice Cat
                            </Text>
                            <Image style={styles.logo} resizeMethod='resize' resizeMode='center' source={{
                                uri: 'https://media.wired.co.uk/photos/60c8730fa81eb7f50b44037e/3:2/w_3329,h_2219,c_limit/1521-WIRED-Cat.jpeg'
                            }} />
                        </View>
                        <OpacityButton onPress={() => setModalVisible(mv => false)}>
                            Hide Modal
                        </OpacityButton>
                    </View>
                </View>
            </Modal >

            <OpacityButton onPress={() => setModalVisible(mv => true)}>
                {modalVisible ? 'Hide Modal' : 'Show Modal'}
            </OpacityButton>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        opacity: 1,
        width: 200,
        height: 200,
        zIndex: -1
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: styleVar.white,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
});
