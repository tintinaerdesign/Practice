import {
        View,
        Text,
        Pressable,
        TextInput,
        StyleSheet,
        Image,
        Modal } from 'react-native'
import LoginPad from '../components/LoginPad';

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useState } from 'react'
import { PIN } from '../utils/PIN';


export default function Login() {
    const insets = useSafeAreaInsets();

    const [pin, setPin] = useState('');
    const [showPinModal,  setShowPinModal] = useState(false);
    return(
        <SafeAreaView style={{ flex: 1,
            paddingTop: insets.top + 14 }}>

        <View style={{ paddingHorizontal: 40 }}>
            <Text style={{ fontSize: 24 }}>Nickname</Text>
        </View>
        <TextInput style={styles.nameContainer} />
        <Pressable style={[styles.setPinTextDiv, { marginTop: 40 }]}
            onPress={() => setShowPinModal(true)}>
            <Text style={{ fontSize: 22, paddingVertical: 10, }}>Set PIN
            </Text>
        </Pressable>
        <Modal
                visible={showPinModal}
                animationType="slide"
                >
            <LoginPad pin={pin}
                      setPin={setPin}
                      onClose={() => setShowPinModal(false)}
                      />
        </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create ({
    idInput: { height: 60,
        width: "80%",

        alignSelf: "center",
        marginBottom: 32,
        marginHorizontal: 3,
        paddingHorizontal: 20,
        borderWidth: 1.5,
        borderColor: "#000000",
        borderRadius: 16,
        backgroundColor: "#EEEEEE",
        fontSize: 24,
        },
    setPinTextDiv:{
        alignSelf: "center",
        alignItems: "center",
        borderWidth: 1.5,
        borderRadius: 8,
        paddingHorizontal: 30,
        width: "80%",

        },
    nameContainer:{
        marginTop: 10,
        alignSelf: "center",
        borderRadius: 8,
        borderWidth: 1.5,
        width: "80%",

        },
        })