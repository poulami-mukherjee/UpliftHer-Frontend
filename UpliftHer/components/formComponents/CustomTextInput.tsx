import { TextInput, NativeSyntheticEvent, TextInputFocusEventData, Text, View } from "react-native";
import { ErrorMessage } from "formik";
import { styles } from "./styles";

type Props = {
    label: string,
    valueName: string,
    value: string,
    handleChange: (text: string) => void,
    handleBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void,
    isSecureTextEntry?: boolean,
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
}

export default function CustomTextInput(props: Props) {
    return (
        <View style={styles.formGroup}>
            <Text style={styles.label}>{props.label}</Text>

            <TextInput
                style={styles.input}
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


