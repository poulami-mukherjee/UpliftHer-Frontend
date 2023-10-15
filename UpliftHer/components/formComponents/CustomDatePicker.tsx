import { Text, View } from "react-native";
import { ErrorMessage } from "formik";
import { styles } from "./styles";
import DatePicker from "react-native-datepicker";

type Props = {
    label: string,
    valueName: string,
    value: string | Date | moment.Moment | undefined,
    handleChange: (text: string) => void,
}

export default function CustomTextInput(props: Props) {
    return (
        <View style={styles.formGroup}>
            <Text style={styles.label}>{props.label}</Text>

            <DatePicker
                style={styles.datePickerStyle}
                date={props.value} //initial date from state
                mode="date" 
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate="01-01-2016"
                maxDate="01-01-2019"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    //display: 'none',
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                }}
                onDateChange={props.handleChange}
              />

            <ErrorMessage name={props.valueName} />

        </View>
    )
}


