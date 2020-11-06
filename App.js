import React from "react";

import { YellowBox } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./screens/Home";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import uploadStory from "./screens/uploadStory";
import StoriesList from "./screens/StoriesList";

import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOckg5aY5jMioiW9ZkcW0Ku8WBdyqPLC8",
  authDomain: "voltindustriproject2.firebaseapp.com",
  databaseURL: "https://voltindustriproject2.firebaseio.com",
  projectId: "voltindustriproject2",
  storageBucket: "voltindustriproject2.appspot.com",
  messagingSenderId: "540803518942",
  appId: "1:540803518942:web:06ff3db4bc6ac1342b4d4f"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

YellowBox.ignoreWarnings([
  "Non-serializable values were found in the navigation state",
]);

const Drawer = createDrawerNavigator();
const uploadStack = createStackNavigator();
const viewStack = createStackNavigator();

const uploadStackNavigator = () => {
  return (
    <uploadStack.Navigator>
      <uploadStack.Screen name="Upload Story" component={uploadStory} />
    </uploadStack.Navigator>
  );
};

const viewStackNavigator = () => {
  return (
    <viewStack.Navigator>
      <viewStack.Screen name="Stories List" component={StoriesList} />
    </viewStack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Signup" component={Signup} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen
        name="uploadStack"
        component={uploadStackNavigator}
        options={{ title: "Upload Story" }}
      />
      <Drawer.Screen
        name="viewStack"
        component={viewStackNavigator}
        options={{ title: "Stories" }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
