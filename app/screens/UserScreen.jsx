import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getUserData, logoutUser } from "../context/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { userPool } from "../utils/cognito";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import the MaterialCommunityIcons component

const UserScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const currentUser = userPool.getCurrentUser();
      if (currentUser) {
        currentUser.signOut();
      }
      dispatch(logoutUser());
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* Icon and Attractive Font */}
      <MaterialCommunityIcons name="account-circle" size={80} color="black" />
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginVertical: 16,
        }}
      >
        User Profile
      </Text>

      <Card style={{ margin: 16, padding: 16, width: "90%" }}>
        <Card.Content>
          <Title style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Login Info</Title>
          <Paragraph style={{ fontSize: 16, fontWeight: "bold" }}>Username: {user.username}</Paragraph>
          <Paragraph style={{ fontSize: 16, fontWeight: "bold" }}>Email: {user.email}</Paragraph>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={{ marginTop: 16, width: "80%", fontWeight: "bold", backgroundColor: "red" }}
      >
        Logout
      </Button>
    </View>
  );
};

export default UserScreen;
