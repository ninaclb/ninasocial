import React, { useState } from "react";
import { Button, Image, View, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();

      // Upload the blob to Firebase Storage

      const storageRef = ref(storage, "images/" + Date.now()); // Update the path as needed
      const uploadTask = uploadBytes(storageRef, blob);

      // Wait for the upload to complete

      await uploadTask;

      // Get the download URL and store it in Firestore

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
      }); // Store the post data in Firestore

      setImage(null);
      setTitle("");
      console.log("Post added to Firestore");
    } catch (error) {
      console.error("Error adding post to Firestore: ", error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter post title"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Pick an image from camera roll" onPress={pickImage} />

      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}

      <Button title="Upload image" onPress={uploadImage} disabled={!image} />
    </View>
  );
}
