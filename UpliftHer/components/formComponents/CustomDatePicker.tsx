import { Text, View } from "react-native";
import { ErrorMessage } from "formik";
import { styles } from "./styles";
import { DatePickerInput } from "react-native-paper-dates";

type Props = {
  label: string,
  valueName: string,
  value: Date,
  handleChange: (date: Date | undefined) => void,
}

export default function CustomTextInput(props: Props) {
  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>{props.label}</Text>
      <DatePickerInput
        locale="en"
        label="Date of birth"
        value={props.value}
        onChange={(d: Date | undefined) => props.handleChange(d)}
        inputMode="start"
      />
      <ErrorMessage name={props.valueName} />
    </View>
  )
}


