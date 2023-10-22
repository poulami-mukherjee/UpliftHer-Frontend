import '@passageidentity/passage-elements/passage-profile';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../../components/formComponents/CustomButton';
import { GestureResponderEvent, View } from 'react-native';
import { mainColor } from '../../constants/Colors';
import { useRouter } from 'expo-router';

function ProfilePage() {
  const navigation = useRouter();

  return (
    <ScrollView contentContainerStyle={{ minWidth: "100%", backgroundColor: mainColor }}>
      <passage-profile app-id={process.env.REACT_APP_PASSAGE_APP_ID}></passage-profile>
      <View style={{ padding: 30 }}>
        <CustomButton type='danger' text={'Log out'} onPress={async function (event: GestureResponderEvent): Promise<void> {
          const user = new PassageUser();
          if (user) {
            const _ = await user.signOut();
          }
          navigation.push("/");
        }} />
      </View>
    </ScrollView>
  );
}

export default ProfilePage;