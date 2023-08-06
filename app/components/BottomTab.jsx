import { View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BottomTab = ({ activeScreen }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        position: "absolute",
        bottom: 16,
        width: "100%",
        paddingHorizontal: 16,
        backgroundColor: "rgba(19, 13, 45, 0.6)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 24,
        paddingVertical: 8,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("UserScreen")}>
        <FontAwesome name="user" size={24} color={activeScreen === "UserScreen" ? "#fff" : "rgba(92, 85, 118, 0.6)"} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("WishlistScreen")}>
        <MaterialCommunityIcons
          name="heart-circle"
          size={24}
          color={activeScreen === "WishlistScreen" ? "#fff" : "rgba(92, 85, 118, 0.6)"}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
        <FontAwesome
          name="home"
          size={24}
          color={activeScreen === "HomeScreen" ? "#fff" : "rgba(92, 85, 118, 0.6)"}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
        <MaterialIcons
          name="shopping-cart"
          size={24}
          color={activeScreen === "CartScreen" ? "#fff" : "rgba(92, 85, 118, 0.6)"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomTab;
