import React, { useEffect, useState } from "react";
import { FlatList, Image, View, StyleSheet } from "react-native";
import { List, Title } from "react-native-paper"; // Certifique-se de ter o React Native Paper instalado
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  postContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  postImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

const FeedScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPostsFromFirestore();
  }, []);

  const fetchPostsFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postList = [];

      querySnapshot.forEach((doc) => {
        const post = doc.data();
        postList.push({ id: doc.id, ...post });
      });

      setPosts(postList);
    } catch (error) {
      console.error("Error fetching posts from Firestore: ", error);
    }
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.imageURL }} style={styles.postImage} />
      <List.Item
        title={item.title}
        titleStyle={styles.postTitle}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPostItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default FeedScreen;
