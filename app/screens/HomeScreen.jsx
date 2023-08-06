import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Screen3 } from "../assets";
import { fetchFeeds } from "../utils/supports";
import { useDispatch, useSelector } from "react-redux";
import { SET_FEEDS } from "../context/actions/feedsActions";

import { Feeds } from "../components";

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const feeds = useSelector((state) => state.feeds);
  const [filtered, setFiltered] = useState(null);

  const dispatch = useDispatch();

  const handleSearchTerm = (text) => {
    setSearchTerm(text);

    setFiltered(feeds?.feeds.filter((item) => item.title.includes(text)));
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      fetchFeeds().then((res) => {
        // console.log(res);
        dispatch(SET_FEEDS(res));
        // console.log("Feeds from Store : ", feeds?.feeds);
        setInterval(() => {
          setIsLoading(false);
        }, 2000);
        console.log("After dispatch: ",feeds);
      });
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-[#EBEAEF]">
      <View className="w-full flex-row items-center justify-between px-4 py-2">
      <Text
          style={{
            fontStyle:"italic",
            fontWeight: "bold",
            fontSize: 30,
            color: "red",
          }}
        >
          B~Store
        </Text>
      </View>

      {/* Search Box starts here */}
      <View className="flex-row items-center justify-between px-4 py-2 w-full space-x-6">
        <View className="px-4 py-2 bg-white rounded-xl flex-1 flex-row items-center justify-center space-x-2">
          <MaterialIcons name="search" size={24} color="#7f7f7f" />
          <TextInput
            className="text-base font-semibold text=[#555] flex-1 py-1 -mt-1 "
            placeholder="Search Here..."
            value={searchTerm}
            onChangeText={handleSearchTerm}
          />
        </View>
      </View>
      {/* search box ends here */}

      {/* scrollable container starts */}
      <ScrollView className="flex1 w-full">
        {isLoading ? (
          <View className="flex-1 h-80 items-center justify-center">
            <ActivityIndicator size={"large"} color={"teal"} />
          </View>
        ) : (
          <Feeds
            feeds={filtered || filtered?.length > 0 ? filtered : feeds?.feeds}
          />
        )}
      </ScrollView>
      {/* scrollable container ends */}
    </SafeAreaView>
  );
};

export default HomeScreen;
