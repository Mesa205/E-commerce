import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

//importamos el bottom tap

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Importamos el navigationContainer

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

//---------------------------------------//

//Screens stacknavigator
import HomeScreen from "../Screens/HomeScreen";
import CategoryScreen from "../Screens/CategoryScreen";
import RecipeDetailScreen from "../Screens/RecipeDetailScreen";
import CategoryActionScreen from "../Screens/CategoryActionScreen";

//Screen tapNavigator

import RecipesActionScreen from "../Screens/RecipesActionScreen";
import { StatusBar } from "expo-status-bar";

//const para navegar normalmente con buttoms
const Stack = createNativeStackNavigator();

//const para utilizar nuestra tabNavigator

const Tab = createBottomTabNavigator();

function MyStacks() {
  return (
    //la propiedad que le dimos aca solo va a afectar a las screens de aca pero no las de tab.Navigator
    <Stack.Navigator screenOptions={{ headerShown: false , contentStyle:{backgroundColor:"#93c5fd"}}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
    </Stack.Navigator>
  );
}

//TabsNavigations

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor:"#cbd5e1",
        tabBarStyle: {
          position: "absolute",
          marginBottom: 8,
          marginHorizontal: 10,
          elevation: 0,
          borderRadius: 15,
          height: 50,
          backgroundColor:"#60a5fa",
          ...style.shadow
        },
        
      }}
    >
      {/* en la homeScreen colocamos el MyStack por que si lo colocamos en el navigation debajo de la linea 66 mytabs se buguea  */}
      <Tab.Screen
        name="HomeScreen"
        component={MyStacks}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused,color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="RecipesActionScreen"
        component={RecipesActionScreen} 
        
        options={{
          headerShown: false,
          tabBarLabel: "Subir Receta",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pizza" color={color} size={size} />
          
            )}}
      />
      <Tab.Screen
        name="CategoryActionScreen"
        component={CategoryActionScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Subir Categoria",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="albums" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

//Esta funcion va a renderizar todo los navigator que hemos hecho , y lo colocamos en el app.js

export default function Navigation() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <MyTabs />
    </NavigationContainer>
  );
}

const style = StyleSheet.create({

  //Sombra para la tabBar

  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 7,
  },

  
});
