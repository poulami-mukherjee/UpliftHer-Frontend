import { Text, View } from 'react-native';

import React from 'react';
import { useSession } from '../../services/authContext';

export default function Index() {
  const session = useSession();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          if (session) session.signOut();
        }}>
        Sign Out
      </Text>
    </View>
  );
}
