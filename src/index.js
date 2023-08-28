import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import LoginScreen from "./screens/LoginScreen";
import RegistroScreen from "./screens/RegistroScreen";
import FeedScreen from "./screens/FeedScreen";
import PublicarScreen from "./screens/PublicarScreen";



const Stack = createNativeStackNavigator();
export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="TabsNavigation"
          component={TabsNavigation}
          options={{ headerShown: false,}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false, title: "Login"}}
        />
        <Stack.Screen
          name="RegistroScreen"
          component={RegistroScreen}
          options={{ headerShown: false, title: "Registro"}}
        />
        <Stack.Screen
          name="FeedScreen"
          component={FeedScreen}
          options={{ headerShown: false, title: "Feed"}}
        />
        <Stack.Screen
          name="PublicarScreen"
          component={PublicarScreen}
          options={{ headerShown: false, title: "Publicar" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tabes = createMaterialBottomTabNavigator();
function TabsNavigation() {
  return (
    <Tabes.Navigator
      initialRouteName="Feed"
      activeColor="#e91e63"
      labelStyle={{ fontSize: 12 }}
    >
         <Tabes.Screen
        name="RegistroScreen"
        component={RegistroScreen}
        options={{
          tabBarLabel: "Registro",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="dog" color={color} size={26} />
          ),
        }}
      />
      <Tabes.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          tabBarLabel: "Login",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
     
      <Tabes.Screen
        name="FeedScreen"
        component={FeedScreen}
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cat" color={color} size={26} />
          ),
        }}
      />
      <Tabes.Screen
        name="PublicarScreen"
        component={PublicarScreen}
        options={{
          tabBarLabel: "Publicar",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="flower" color={color} size={26} />
          ),
        }}
      />
    </Tabes.Navigator>
  );
}