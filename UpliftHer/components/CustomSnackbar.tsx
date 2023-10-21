import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

type Props = {
  text?: string;
  visible: boolean;
  onDismiss: () => void;
}

class Snack {
  message?: string;
  open: boolean;

  constructor(data: Snack) {
    this.message = data.message || '';
    this.open = data.open;
  }
}

export {Snack};

const CustomSnackbar = (props: Props) => {
  return (
    <View style={styles.container}>
      <Snackbar
        visible={props.visible}
        onDismiss={props.onDismiss}>
        {props.text}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default CustomSnackbar;