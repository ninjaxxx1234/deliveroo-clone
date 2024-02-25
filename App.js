import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './screens/HomeScreen.js';
import RestaurantsScreen from './screens/RestaurantsScreen.js';
const Stack = createNativeStackNavigator();
import { store } from './store'
import { Provider } from 'react-redux'
import BasketScreen from './screens/BasketScreen.js';
import PreparingOrderScreen from './screens/PreparingOrderScreen.js';
import DeliveryScreen from './screens/DeliveryScreen.js';


export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurants" component={RestaurantsScreen} />
          <Stack.Screen 
            name="Basket" 
            component={BasketScreen} 
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen name="PreparingOrderScreen" component={PreparingOrderScreen} 
            options={{ presentation: "fullScreenModal", headerShown: false }}
          />
          <Stack.Screen name="Delivery" component={DeliveryScreen} 
            options={{ presentation: "fullScreenModal", headerShown: false }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

