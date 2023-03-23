import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from '../constants';

const TagButton = ({ onPress, isSelected, children }) => {
    return (
      <TouchableOpacity onPress={onPress} style={[style.tagButton, isSelected && style.selectedTagButton]}>
        <Text style={[style.tagButtonText, isSelected && style.selectedTagButtonText]}>{children}</Text>
      </TouchableOpacity>
    )
  }

  export default TagButton;
  
  const style = StyleSheet.create({
    tagButton: {
      backgroundColor: COLORS.lightgray,
      borderRadius: 20,
      padding: 10,
      marginRight: 10,
      marginBottom: 10,
      elevation: 12,
    },
    selectedTagButton: {
      backgroundColor: COLORS.primary,
    },
    tagButtonText: {
      color: "black",
      fontWeight: 'bold',
      fontSize: 13.5,
    },
    selectedTagButtonText: {
      color: '#fff',
    },
  });
  