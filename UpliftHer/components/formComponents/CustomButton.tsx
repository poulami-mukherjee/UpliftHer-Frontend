import { GestureResponderEvent, Text, Pressable } from "react-native";
import { styles } from "./styles";

type Props = {
    text: string,
    type?: "primary" | "transparent" | "link";
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
            default:
                break;
        }

        return style;
    }

    return (
        <Pressable style={[styles.button, getStyle()]} onPress={(e) => props.onPress(e)}>
            <Text style={[styles.buttonText, getTextStyle()]}>{props.text}</Text>
        </Pressable>
    )
}