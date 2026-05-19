import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InputScreen from '../screens/InputScreen';
import InsightsScreen from '../screens/InsightsScreen';
import ActionPlanScreen from '../screens/ActionPlanScreen';
import OutcomeScreen from '../screens/OutcomeScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="InputScreen" component={InputScreen} />
      <Stack.Screen name="InsightsScreen" component={InsightsScreen} />
      <Stack.Screen name="ActionPlanScreen" component={ActionPlanScreen} />
      <Stack.Screen name="OutcomeScreen" component={OutcomeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
