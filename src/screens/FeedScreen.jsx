import React, { useEffect, useState } from "react";
import { FlatList, Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { List, Title } from "react-native-paper";
import { collection, getDocs, onSnapshot, doc, updateDoc } from "firebase/firestore";
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
    width: 100,
    height: 100,
    borderRadius: 25,
    marginRight: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

const FeedScreen = () => {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const unsubscribe = fetchPostsFromFirestore();

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchPostsFromFirestore = () => {
    const postCollectionRef = collection(db, "posts");

    return onSnapshot(postCollectionRef, (querySnapshot) => {
      const postList = [];

      querySnapshot.forEach((doc) => {
        const post = doc.data();
        postList.push({ id: doc.id, ...post });
      });

      setPosts(postList);

      const likesData = {};
      postList.forEach((post) => {
        likesData[post.id] = post.likes || 0;
      });
      setLikes(likesData);
    });
  };

  const handleLike = (postId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: prevLikes[postId] + 1,
    }));

    const postRef = doc(db, "posts", postId);
    updateDoc(postRef, {
      likes: likes[postId] + 1,
    });
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.imageURL }} style={styles.postImage} />
      <View>
        <List.Item
          title={item.title}
          titleStyle={styles.postTitle}
        />
        <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.likeButton}>
          <Image
            source={require("../img/coracao.png")} // Substitua pelo caminho da sua imagem de coração
            style={styles.likeIcon}
          />
          <Text>{likes[item.id]} curtidas</Text>
        </TouchableOpacity>
      </View>
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