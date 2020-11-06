import React, { useState, useRef, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import firebase from "firebase";

const uploadStory = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [timeline, setTimeline] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState();

  const getUserData = (uid) => {
    const docRef = firebase.firestore().collection("Users").doc(uid);

    docRef.get().then(function (doc) {
      if (doc.exists) {
        const userData = doc.data();
        setUserInfo(userData);
        setTitle(userData.title);
        setTimeout(() => {
          setLoading(false);
        }, 600);
      } else {
        setLoading(false);
        console.log("DOcument not exist!");
      }
    });
  };

  const addStory = () => {
    if (title === "") return;
    if (summary === "") return;
    if (timeline === "") return;
    if (category === "") return;

    firebase.firestore().collection("Users").doc(userInfo.uid).collection('Stories').add({
      title: title,
      summary: summary,
      timeline: timeline,
      category: category
    })

    navigation.navigate("Home");
  }

  useEffect(() => {
    const isFocused = navigation.addListener("focus", () => {
      setLoading(true);
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          getUserData(user.uid);
        } else {
          setUserInfo(null);
          setLoading(false);
          navigation.navigate("Login");
        }
      });
    }); 

    return isFocused;
  }, [userInfo, loading, navigation, title]);

  const titleRef = useRef(null);
  const summaryRef = useRef(null);
  const timeRef = useRef(null);
  const categoryRef = useRef(null);

  return (
    <View style={styles.container}>
    
    <KeyboardAvoidingView style={styles.keyboard} behavior="position" keyboardVerticalOffset={-90} enabled>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Upload Story</Text>
        <Text style={styles.labelText}>Story Name:</Text>
        <TextInput
          ref={titleRef}
          style={styles.input}
          placeholder="Story Title"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
          }}
          onSubmitEditing={()=> {
            console.log("Clicked");
            summaryRef.current.focus();
          }}
          />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.labelText}>Story Summary:</Text>
        <TextInput
          ref={summaryRef}
          style={styles.input}
          placeholder="Story Summary"
          value={summary}
          multiline
          onChangeText={(text) => {
            setSummary(text);
          }}
          onSubmitEditing={()=> {
            console.log("Clicked");
            timeRef.current.focus();
          }}
          />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.labelText}>Story Timeline:</Text>
        <TextInput
          ref={timeRef}
          style={styles.input}
          placeholder="Story Timeline"
          value={timeline}
          onChangeText={(text) => {
            setTimeline(text);
          }}
          onSubmitEditing={()=> {
            console.log("Clicked");
            categoryRef.current.focus();
          }}
          />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.labelText}>Story Category:</Text>
        <TextInput
          ref={categoryRef}
          style={styles.input}
          placeholder="Story Category"
          value={category}
          onChangeText={(text) => {
            setCategory(text);
          }}
          />
      </View>
      
      
      <TouchableOpacity style={styles.button} onPress={addStory}>
        <Text style={styles.buttonText}>Upload Story</Text>
      </TouchableOpacity>
      
      </KeyboardAvoidingView>
      
    </View>
  );
};

export default uploadStory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "royalblue",
    justifyContent: "center",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  keyboard:{
    position: "absolute",
    width: "100%",
  },
  textContainer: {
    position: "relative",
    width: "100%",
  },
  heading: {
    color: "whitesmoke",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    paddingBottom: 5,
  },
  labelText: {
    color: "whitesmoke",
    fontSize: 15,
    paddingBottom: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 40,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "mediumpurple",
    borderRadius: 40,
    marginBottom: 10,
    padding: 20,
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "700",
  },
});
