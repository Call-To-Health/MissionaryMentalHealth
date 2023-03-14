import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { COLORS, SIZES, FONTS, assets } from "../constants";
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
                <View style={style.container}>
                    <View style={style.header}>
                        <Text style={style.text}>{selectedDate}</Text>
                    </View>
                    <View style={style.body}>
                        <Text>This is where check-in results for this day will go.</Text>
                    </View>
                    <View style={style.footer}>
                        <TouchableOpacity
                            style={style.button}
                            onPress={() => navigation.navigate("Checkin")}>
                            <Text style={style.buttonText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
    )


};

const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#000",
      borderStyle: "solid",
      padding: SIZES.medium,
      marginVertical: SIZES.extraLarge

    },
    header: {
      alignItems: "center",
      justifyContent: "center",
      padding: SIZES.medium,
      paddingTop: SIZES.large
    },
    buttonText: {
      textAlign: "center",
      fontSize: FONTS.large,
      fontFamily: FONTS.semiBold,
      color: COLORS.white
    },
    body: {
      paddingHorizontal: 15,
      padding: SIZES.medium,
      justifyContent: 'space-between',
      flex: 1,
    },
    footer: {
      justifyContent: "left",
      alignItems: "left",
      padding: SIZES.medium,
      paddingBottom: SIZES.large,
    },
    button:{
      backgroundColor: COLORS.primary,
      borderRadius: SIZES.small,
      padding: SIZES.small
    },
    text:{
        textAlign: 'center',
        color: COLORS.primary,
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.large
      },
  });

export default DailyModal;