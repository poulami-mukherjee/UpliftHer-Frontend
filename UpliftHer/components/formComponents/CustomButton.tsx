import { GestureResponderEvent, Text, Pressable } from "react-native";
import { styles } from "./styles";
import { ActivityIndicator } from "react-native-paper";

type Props = {
    text: string,
    loading?: boolean;
    type?: "primary" | "transparent" | "link" | "dark" | "danger";
    onPress: (event: GestureResponderEvent) => void
}

export default function CustomButton(props: Props) {
    function getStyle() {
        let style: {} = styles.buttonPrimary;
        switch (props.type) {
            case "transparent":
                style = styles.buttonTransparent;
                break;
            case "link":
                style = styles.buttonLink;
                break;
            case "dark":
                style = styles.buttonDark;
                break;
            case "danger":
                style = styles.buttonDanger;
                break;
            default:
                break;
        }

        return style;
    }

    function getTextStyle() {
        let style: {} = styles.buttonTextPrimary;
        switch (props.type) {
            case "transparent":
                style = styles.buttonTextTransparent;
                break;
            case "link":
                style = styles.buttonTextLink;
                break;
            case "dark":
                style = styles.buttonTextDark;
                break;
            case "danger":
                style = styles.buttonTextDanger;
                break;
            default:
                break;
        }

        return style;
    }

    return (
        <Pressable style={[styles.button, getStyle()]} onPress={(e) => props.onPress(e)}>
            <ActivityIndicator style={{ marginRight: 5 }} animating={props.loading ?? false} />
            <Text style={[styles.buttonText, getTextStyle()]}>{props.text}</Text>
        </Pressable>
    )
}