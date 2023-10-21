import '@passageidentity/passage-elements/passage-profile';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../../components/formComponents/CustomButton';
import { GestureResponderEvent } from 'react-native';

function ProfilePage() {
  return (
    <ScrollView>
      <passage-profile app-id={process.env.REACT_APP_PASSAGE_APP_ID}></passage-profile>

      <CustomButton type='danger' text={'Log out'} onPress={async function (event: GestureResponderEvent): Promise<void> {
        const user = new PassageUser()
        const _ = await user.signOut()
      }} />
    </ScrollView>
  );
}

export default ProfilePage;