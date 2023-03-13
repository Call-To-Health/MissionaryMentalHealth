import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

const DailyModal = () => {

    const navigation = useNavigation();

    const [isModalVisible, setIsModalVisible] = React.useState(true);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    const route = useRoute();
    const { selectedDate } = route.params;

    return (
            <Modal isVisible={isModalVisible}>
                <View>
                    <Text>{selectedDate}</Text>
                    <RectButton
                        onPress={() => navigation.navigate("Checkin")}>
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