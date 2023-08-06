import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { EmptyCart } from '../assets';
import { useNavigation } from '@react-navigation/native';
import { removeFromWishlist, fetchWishlistItems } from '../context/actions/wishlistActions';
import { FlatList } from 'react-native';

const WishlistScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlistItems.wishlist);
  const feeds = useSelector((state) => state.feeds.feeds);
  console.log('this is the feeds data!: ', feeds);

  const [isLoading, setIsLoading] = useState(true);
  const [isFeedsLoaded, setIsFeedsLoaded] = useState(false);

  useEffect(() => {
    const fetchWishlistData = async () => {
      setIsLoading(true);
      await dispatch(fetchWishlistItems());
      setIsFeedsLoaded(true); // Set feeds data loaded
      setIsLoading(false);
    };

    fetchWishlistData();
  }, []);

  const removeFromWishlistHandler = async (_id) => {
    try {
      await dispatch(removeFromWishlist(_id));
      await dispatch(fetchWishlistItems());
    } catch (error) {
      console.log('Error removing from wishlist in wishlist screen:', error);
    }
  };

  const renderWishlistItem = ({ item }) => {
    const feedItem = feeds.find((feed) => feed._id === item);
    console.log('this is inside of renderwishlistItem for feedItem', feedItem);
    if (!feedItem) {
      return null; // Skip rendering if matching feed item is not found
    }

    return (
      <View style={styles.itemContainer} key={item}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: feedItem.bgImage }} resizeMode="cover" style={styles.bgImage} />
          <View style={styles.mainImageContainer}>
            <Image source={{ uri: feedItem.mainImage }} resizeMode="contain" style={styles.mainImage} />
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{feedItem.title}</Text>
          <Text style={styles.shortDescription}>{feedItem.shortDescription}</Text>
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={() => removeFromWishlistHandler(item)}>
          <FontAwesome5 name="trash-alt" size={18} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {console.log('wish list items inside wishlist screen: ', wishlistItems)}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Entypo name="chevron-left" size={32} color={'#555'} />
            </TouchableOpacity>

            <Text style={styles.titleText}>Wishlist</Text>

            <View style={styles.wishlistIcon}>
              <FontAwesome5 name="heart" size={16} color="white" />
              <View style={styles.wishlistCount}>
                <Text style={styles.wishlistCountText}>{wishlistItems?.length}</Text>
              </View>
            </View>
          </View>

          {wishlistItems?.length !== 0 && wishlistItems && isFeedsLoaded && !isLoading ? (
            <View style={styles.wishlistContainer}>
              <FlatList
                data={wishlistItems}
                keyExtractor={(item) => item}
                renderItem={renderWishlistItem}
              />
            </View>
          ) : (
            <View style={styles.emptyWishlistContainer}>
              <Image source={EmptyCart} style={styles.emptyWishlistImage} resizeMode="contain" />
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEAEF',
    paddingTop: Platform.OS === 'android' ? 50 : 0, // Adjust top padding for Android to avoid clashes with status bar
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 20, // Add padding top to avoid clashes with phone's charger icons and headers
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  wishlistIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistCount: {
    position: 'absolute',
    width: 16,
    height: 16,
    backgroundColor: 'white',
    top: 0,
    right: 0,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistCountText: {
    color: 'black',
  },
  emptyWishlistContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyWishlistImage: {
    width: 150,
    height: 150,
  },
  wishlistContainer: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 4, // Add elevation for Android shadow
  },
  imageContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  mainImageContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: 50,
    height: 50,
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  shortDescription: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#777',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default WishlistScreen;
