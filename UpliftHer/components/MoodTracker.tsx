import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-paper';
import { FlatList, TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native';
import IMood from '../services/models/IMood';
import { useContext, useEffect, useState } from 'react';
import { MoodTrackingApi } from '../services/mood-tracking-service';
import { contentBackground, headerBackground, secondaryColor } from '../constants/Colors';
import CustomButton from './formComponents/CustomButton';
import { Snack } from './CustomSnackbar';
import processRequest from '../helpers/processRequest';
import { SnackbarContext } from '../app/(home)/home';


type ItemProps = {
  item: IMood;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
};

const MoodItem = ({ item, onPress, backgroundColor, textColor, borderColor }: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor, borderWidth: 4, borderColor }]}>
    <Icon size={42} color={textColor} source={item.icon} />
    <Text style={[styles.title, { color: textColor }]}>{item.text}</Text>
  </TouchableOpacity>
);

type MoodTrackerProps = {
  onClose: () => void;
}

export default function MoodTracker({ onClose }: MoodTrackerProps) {
  const [moods, setMoods] = useState<IMood[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [updateVersion, setUpdateVersion] = useState(0);
  const loading = false;
  const { snack, setSnack } = useContext(SnackbarContext);

  useEffect(() => {
    const moods = MoodTrackingApi.getMoods();
    setMoods(moods);
  }, []);


  function handleClick(text: string): void {
    console.log(text);
    let userMoods = selectedMoods;
    if (userMoods.includes(text)) {
      userMoods = userMoods.filter(um => um !== text);
    } else {
      userMoods.push(text);
    }

    setSelectedMoods(userMoods);
    setUpdateVersion(updateVersion + 1);
    console.log(selectedMoods);
  }

  const item = ({ item }: { item: IMood }) => {
    const isSelected = selectedMoods.includes(item.text);
    const backgroundColor = '#fff';
    const color = item.color;
    const borderColor = isSelected ? secondaryColor : backgroundColor;

    return (
      <MoodItem
        item={item}
        onPress={() => handleClick(item.text)}
        backgroundColor={backgroundColor}
        textColor={color}
        borderColor={borderColor}
      />
    );
  };

  const header = <View style={styles.modalTitle}>
    <Text style={styles.modalTitleText}>How are you feeling today?</Text>
    <Text style={styles.modalTitleSubText}>Select all that applies.</Text>
  </View>;

  const validate = async () => {
    console.log("sending ", selectedMoods.length);
    if (selectedMoods.length === 0) {
      return;
    }

    console.log("processing ");
    await processRequest({
      loading: loading,
      request: () => MoodTrackingApi.sendMoodsAsync(selectedMoods),
      onSuccess: function (data: boolean): void {
        console.log("success");
        setSnack(new Snack({message: 'Moods saved!', open: true}));
        onClose();
      },
      onError: function (error: string): void {
        console.log("error ", error);
        setSnack(new Snack({message: error, open: true}));

      }
    });
  };

  const footer = <View style={styles.modalFooter}>
    <CustomButton type='dark' onPress={() => validate()} text={'Validate'} />
  </View>;

  return (
    <ScrollView style={styles.container}>
      {header}
      <View style={styles.app}>
        <FlatList extraData={updateVersion}
          data={moods}
          numColumns={4}
          renderItem={item}
          keyExtractor={item => item.text}
        />
      </View>
      {footer}
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  container: {
    maxWidth: 700,
    flex: 1,
    backgroundColor:
      Platform.OS === "ios" ? contentBackground : headerBackground,
  },
  app: {
    marginHorizontal: "auto",
    marginVertical: 25,
    maxWidth: 700
  },
  title: {
    fontSize: 16,
  },
  item: {
    flex: 1,
    width: 120,
    alignItems: "center",
    padding: 10,
    margin: 10
  },
  modalTitle: {
    marginBottom: 15,
    padding: 15,
    color: "#3498db",
    backgroundColor: "white",
    width: "100%",
  },
  modalFooter: {
    marginTop: 15,
    padding: 15,
    color: "#3498db",
    width: "100%",
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalTitleSubText: {
  },
});
