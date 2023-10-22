import { Icon } from 'react-native-paper';
import { FlatList, TouchableOpacity, View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import IMood from '../services/interfaces/IMood';
import { useEffect, useState } from 'react';
import { MoodTrackingApi } from '../services/mood-tracking-service';
import { contentBackground, headerBackground, secondaryColor } from '../constants/Colors';
import CustomButton from './formComponents/CustomButton';
import { Snack } from './CustomSnackbar';
import processRequest from '../helpers/processRequest';
import CustomTextInput from './formComponents/CustomTextInput';
import { Formik } from 'formik';
import * as Yup from "yup";
import * as Device from 'expo-device';
import { AlertColor } from '../constants/Colors';
import { useSnackbarContext } from '../services/contexts/snackbarContext';

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
  const [device, setDevice] = useState<Device.DeviceType | null>(null);
  const [loading, setIsLoading] = useState(false);
  const { snack, setSnack } = useSnackbarContext();

  useEffect(() => {
    const fetchData = async () => {
      const device = await Device.getDeviceTypeAsync();
      console.log(device);

      const moods = MoodTrackingApi.getMoods();
      setMoods(moods);
      setDevice(device);
    }

    fetchData().catch(console.error);
  }, []);


  function handleClick(text: string): void {
    let userMoods = selectedMoods;
    if (userMoods.includes(text)) {
      userMoods = userMoods.filter(um => um !== text);
    } else {
      userMoods.push(text);
    }

    setSelectedMoods(userMoods);
    setUpdateVersion(updateVersion + 1);
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

  const validate = async (notes: string) => {
    if (selectedMoods.length === 0) {
      setSnack(new Snack({ color: AlertColor.error, message: 'Please select at least one mood.', open: true }));
      return;
    }

    setSnack(new Snack({ open: false }));

    console.log("processing ");
    await processRequest({
      loading: setIsLoading,
      request: async () => await MoodTrackingApi.sendMoodsAsync(selectedMoods, notes),
      onSuccess: function (data: unknown): void {
        setSnack(new Snack({ color: AlertColor.success, message: 'Moods saved!', open: true }));
        onClose();
      },
      onError: function (error: string): void {
        setSnack(new Snack({ color: AlertColor.error, message: error, open: true }));
      }
    });
  };


  return (
    <ScrollView style={styles.container}>
      {header}
      <View style={styles.app}>
        <View style={{ paddingBottom: 25 }}>
          {device &&
            <FlatList extraData={updateVersion}
              data={moods}
              numColumns={device === Device.DeviceType.DESKTOP ? 4 : 2}
              renderItem={item}
              keyExtractor={item => item.text}
            />
          }
        </View>

        {/* https://formik.org/docs/overview */}
        <Formik
          initialValues={{
            notes: "",
          }}
          onSubmit={(values) => {
            validate(values.notes);
          }}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            values,
            handleSubmit,
            handleBlur,
          }) => (
            <View style={{ padding: 15, backgroundColor: "#c5cdd361" }}>
              <CustomTextInput
                labelStyle={styles.inputLabel}
                label="Is there a specific event that triggered these emotions? *"
                valueName="notes"
                handleChange={handleChange("notes")}
                handleBlur={handleBlur("notes")}
                value={values.notes} />

              <Text>
                * Please don't enter sensitive information in this text box, as it may be processed by machine learning
                algorithms to provide you with personalized resources.
                Rest assured, other secure features of this app will be available for you to enter sensitive information confidently and securely.
              </Text>
              <CustomButton loading={loading} onPress={(e) => handleSubmit()} text="SUBMIT" />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}


// https://github.com/jquense/yup
export const validationSchema = Yup.object().shape({
  notes: Yup.string().max(200),
});


export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor:
      Platform.OS === "ios" ? contentBackground : headerBackground,
  },
  app: {
    marginHorizontal: "auto",
    marginVertical: 25,
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
  inputLabel: {
    padding: 5,
    color: "#0f0e0e"
  }
});

