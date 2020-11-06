import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textTitle}>Dynamic Story App</Text>
        <Text style={styles.textHeader}>Drawing information about stories from Firebase</Text>
      </View>
      
      <View style={styles.body}>
        <Text style={[styles.text, styles.textBody]}>This app will take information from a Firebase database and place it inside.</Text>
        <Text style={[styles.text, styles.textBody]}>Once it does, the user will be able to see a list of all the entered stories.</Text>
        <Text style={[styles.text, styles.textBody]}>Feel free to add all of your story ideas here!</Text>
      </View>

      <View style={styles.body}>
        <Text style={[styles.text, styles.textBody]}>Dynamic Story App aims to make adding data for stories quick and easy right from
        your phone.</Text>
        <Text style={[styles.text, styles.textBody]}>In doing so, it allows you to quickly gather your thoughts and return to them when
        you need to.</Text>
        <Text style={[styles.text, styles.textBody]}>This can also help organize your ideas together to write a much larger story should
        you want to do this.</Text>
      </View>
      <View style={styles.header}>
        <Text style={[styles.textHeader]}>Dynamic Story App aims to make adding data for stories quick and easy right from
        your phone.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
  },
  header: {
    height: 100,
    width: "100%",
    backgroundColor: "blue",
  },
  textTitle: {
    color: "white",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    paddingTop: 30,
  },
  textHeader: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    paddingTop: 5,
  },
  body: {
    backgroundColor: "lightgray",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 30,
    borderColor: "black",
    borderRadius: 1,
    borderWidth: 3,
  },
  textBody: {
    color: "red",
    fontSize: 20,
    paddingBottom: 5,
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: "blue",
    marginTop: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    paddingTop: 10,
  }
});
