import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./context/store";

import {
  CartScreen,
  LoginScreen,
  OnBoardingScreen,
  PasswordResetScreen,
  ProductScreen,
  RegisterScreen,
  WishlistScreen,
  UserScreen,
} from "./screens";
import HomeScreen from "./screens/HomeScreen";
import { BottomTab } from "./components";

const Stack = createNativeStackNavigator();

const MyComponent = ({ setActiveScreen }) => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      const currentScreen = navigation.getCurrentRoute().name;
      setActiveScreen(currentScreen);
      console.log("Active Screen: ", currentScreen);
    });

    return () => unsubscribe();
  }, [navigation]);

  return null;
};

const App = () => {
  const [activeScreen, setActiveScreen] = useState("");

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyComponent setActiveScreen={setActiveScreen} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="PasswordResetScreen" component={PasswordResetScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ProductScreen" component={ProductScreen} />
          <Stack.Screen name="WishlistScreen" component={WishlistScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="UserScreen" component={UserScreen} />
        </Stack.Navigator>

        {activeScreen !== "OnBoardingScreen" && activeScreen !== "LoginScreen" && activeScreen !== "RegisterScreen" && activeScreen !== "PasswordResetScreen" && (
          <BottomTab activeScreen={activeScreen} />
        )}
      </NavigationContainer>
    </Provider>
  );
};

export default App;

