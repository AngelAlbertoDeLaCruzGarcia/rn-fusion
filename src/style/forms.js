import {StyleSheet} from "react-native";
import colors from "./colors";
const formStyle = StyleSheet.create({
    input: {
        marginBottom: 20,
    },
    btnPrimary: {
        padding: 5,
        backgroundColor: colors.primary,
    },
    btnSuccess: {
        padding: 5,
        backgroundColor: colors.success,
    },
    btnUpdate: {
        padding: 5,
        backgroundColor: colors.indigo,
    },
    btnDelete: {
        padding: 5,
        backgroundColor: colors.danger,
    },
    btnText: {
        marginTop:10,
        backgroundColor: colors.bgLight,   
    },
    btnTextLabel: {
        color: colors.dark,
    },
    btnTextLabel: {
        color: colors.dark,
    }
})
export default formStyle;