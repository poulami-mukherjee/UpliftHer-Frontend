import { Modal, StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import CustomButton from './formComponents/CustomButton';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
  title: string;
  show: boolean;
  onClose: () => void
}

export default function ModalComponent(props: PropsWithChildren<Props>) {
  return <Modal
    animationType="slide"
    transparent={false}
    visible={props.show}
    statusBarTranslucent={true}
    style={{ margin: 0 }}
    onRequestClose={() => props.onClose}>

    <ScrollView>

      {props.children}

      <CustomButton type="link" onPress={props.onClose} text="Annuler" />
    </ScrollView>
  </Modal>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
