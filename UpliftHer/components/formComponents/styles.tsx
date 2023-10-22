import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    formGroup: {
        marginBottom: 10,
    },
    input: {
        height: 50,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#e3e3e3",
        backgroundColor: "#fff",
    },
    label: {
        color: "#7d7e79",
        fontSize: 16,
        lineHeight: 30,
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
    },
    button: {
        marginTop: 20,
        padding: 15,
        borderRadius: 15, display: "flex", flexDirection: "row", justifyContent: "center"
    },
    buttonPrimary: {
        backgroundColor: "#2980b9",
    },
    buttonTransparent: {
        backgroundColor: 'transparent',
    },
    buttonLink: {
        backgroundColor: "transparent",
        paddingTop: 2,
        paddingBottom: 2,
        marginTop: 4
    },
    buttonDark: {
        backgroundColor: "#000",
    },
    buttonDanger: {
        backgroundColor: "#ed4236",
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
    },
    buttonTextPrimary: {
        color: "#fff",
    },
    buttonTextTransparent: {
        color: "rgb(76, 77, 73)",
    },
    buttonTextLink: {
        color: "rgb(76, 77, 73)",
        fontSize: 12,
        fontWeight: "normal"
    },
    buttonTextDark: {
        color: "#fff",
    },
    buttonTextDanger: {
        color: "#fff",
    }
});
