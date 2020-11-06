import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
} from "react-native";
import firebase from "firebase";

const StoriesList = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState();

 

  const getUserData = (uid) => {
    const docRef = firebase.firestore().collection("Users").doc(uid);

    /*docRef.get().then(function (doc) {
      if (doc.exists) {
        const userData = doc.data();
        setUserInfo(userData);
        setTimeout(() => {
          setLoading(false);
        });
      } else {
        setLoading(false);
        console.log("DOcument not exist!");
      }
    });*/

  };


  useEffect(() => {
    const isFocused = navigation.addListener("focus", () => {
      setLoading(true);
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          getUserData(user.uid);

          firebase.firestore().collection("Users").doc(user.uid).collection('Stories').get()
          .then(response => {
          const allStories = [];
          response.docs.forEach(document => {
            const selectStory = {
              id: document.id,
              ...document.data()
            };
            allStories.push(selectStory);
          });
          setStories(allStories);
          })

        } else {
          setUserInfo(null);
          setLoading(false);
          navigation.navigate("Login");
        }

        
      });

    });

    return isFocused;

  }, [userInfo, loading, navigation, stories]);

  return (
    <View style={styles.container}>
      
      <ScrollView style={styles.scrollView}>
        {stories.map(story => (
          <View style={styles.entry}>
             <Text style={styles.titleText}>Story Title: {story.title}</Text>
             <Text style={styles.storyText}>Summary: {story.summary}</Text>
             <Text style={styles.storyText}>Timeline: {story.timeline}</Text>
             <Text style={styles.storyText}>Category: {story.category}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default StoriesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "royalblue",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  entry: {
    marginVertical: 10,
    borderWidth: 2,
    backgroundColor: "darkslateblue",
    borderColor: "yellow",
    borderRadius: 10,
    width: "100%"
  },
  pageTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "blue",
    marginTop: 20,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "royalblue",
    paddingVertical: 20,
    marginBottom: 10,
  },
  story: {
    margin: 5,
    borderWidth: 2,
    backgroundColor: "blue",
    borderColor: "yellow",
    borderRadius: 10,
  },
  titleText: {
    fontSize: 18,
    marginHorizontal: 15,
    paddingVertical: 10,
    color: "yellow",
    fontWeight: "700",
  },
  storyText: {
    fontSize: 18,
    marginHorizontal: 15,
    paddingVertical: 10,
    color: "white",
    fontWeight: "700",
  }
});
