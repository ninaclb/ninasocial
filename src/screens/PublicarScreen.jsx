import React, { useState } from "react";
import { Button, Image, View, TextInput, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 20,
  },
  input: {
    height: 50,
    fontSize: 16,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#16337E",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  imagePreview: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 5,
  },
  uploadButton: {
    backgroundColor: "#16337E",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: "center",
  },
});

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const storageRef = ref(storage, "images/" + Date.now());
      const uploadTask = uploadBytes(storageRef, blob);

      await uploadTask;

      const imageURL = await getDownloadURL(storageRef);

      addPostToFirestore(imageURL);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const addPostToFirestore = async (imageURL) => {
    try {
      const postRef = collection(db, "posts");

      await addDoc(postRef, {
        title,
        imageURL,
        timestamp: serverTimestamp(),
      });

      setImage(null);
      setTitle("");
      console.log("Post added to Firestore");
    } catch (error) {
      console.error("Error adding post to Firestore: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título da publicação"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <Button
        title="Pick an image from camera roll"
        onPress={pickImage}
        color="#16337E"
      />

      {image && (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      )}

      <Button
        title="Upload image"
        onPress={uploadImage}
        disabled={!image}
        color="#16337E"
      />
    </View>
  );
}