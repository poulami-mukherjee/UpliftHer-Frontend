import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';

type Props = {
  text?: string;
  visible: boolean;
  color?: string;
  onDismiss: () => void;
}

class Snack {
  message?: string;
  open: boolean;
  color?: string;

  constructor(data: Snack) {
    this.message = data.message || '';
    this.open = data.open;
    this.color = data.color;
  }
}

export { Snack };

const CustomSnackbar = (props: Props) => {
  console.log("displaying snackbar = ", props.visible);
  return (
    <View style={styles.container}>
      <Snackbar
        visible={props.visible}
        onDismiss={props.onDismiss} style={{ backgroundColor: props.color }}>
        {props.text}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99999
  },
});

export default CustomSnackbar;