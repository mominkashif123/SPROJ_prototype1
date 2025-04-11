import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import More from "../More";
import ChangePasswordScreen from "../ChangePass";

const Stack = createStackNavigator();

const MoreStack = ({ user, setUser, navigation }) => {
  // console.log('MoreStack received user:', user); // Debug log
  // console.log('MoreStack has setUser:', !!setUser); // Debug log
  
  return (
    <Stack.Navigator initialRouteName="MoreScreen">
      <Stack.Screen
        name="MoreScreen"
        options={{ headerShown: false }}
      >
        {(props) => <More {...props} user={user} setUser={setUser} />}
      </Stack.Screen>
      <Stack.Screen
        name="ChangePassword"
        options={{ title: "Change Password" }}
      >
        {(props) => <ChangePasswordScreen {...props} user={user} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default MoreStack;