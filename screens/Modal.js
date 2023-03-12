import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

const DailyModal = () => {

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    return (
        <Modal isVisible={isModalVisible}>
            <View>
                <RectButton
                    onPress={() => {handleModal}}>
                    <Text>Hide Modal</Text>
                </RectButton>
            </View>
        </Modal>
    )


};

const style = StyleSheet.create ({
    // header: {
    //   paddingVertical:20,
    //   flexDirection:'row',
    //   justifyContent: 'space-between',
    //   backgroundColor: COLORS.primary,
    // },
    // headerTitle: {
    //   color:COLORS.white,
    //   fontWeight:'bold',
    //   fontSize: 23,
    // }
  });

export default DailyModal;