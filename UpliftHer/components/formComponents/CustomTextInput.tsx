import { TextInput, NativeSyntheticEvent, TextInputFocusEventData, Text, View, TextStyle, StyleProp } from "react-native";
import { ErrorMessage } from "formik";
import { styles } from "./styles";

type Props = {
    label: string,
    valueName: string,
    value: string,
    disabled?: boolean;
    handleChange: (text: string) => void,
    handleBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void,
    isSecureTextEntry?: boolean,
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
    labelStyle?: StyleProp<TextStyle>;
}

export default function CustomTextInput(props: Props) {
    return (
        <View style={styles.formGroup}>
            <Text style={props.labelStyle ?? styles.label}>{props.label}</Text>

            <TextInput
                editable={!props.disabled}
                style={[styles.input, { backgroundColor: ( props.disabled ? "#e6e6e6" : "#fff") }]}
                value={props.value}
                onChangeText={props.handleChange}
                onBlur={props.handleBlur}
                autoCapitalize={props.autoCapitalize}
                secureTextEntry={props.isSecureTextEntry ?? false}
            />

            <ErrorMessage name={props.valueName} />

        </View>
    )
}


