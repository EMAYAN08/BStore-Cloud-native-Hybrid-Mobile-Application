import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../context/actions/wishlistActions';
import { getUserData } from '../context/actions/userActions';
import { fetchWishlistItems } from '../context/actions/wishlistActions';


const FeedDetail = ({ data }) => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const cardWidth = screenWidth / 2 - 20;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const handleClick = () => {
    navigation.navigate('ProductScreen', { _id: data?._id });
  };

  const handleAddToWishlist = async () => {
    try {
      dispatch(addToWishlist(data));
      console.log('After dispatch addtowishlist in feed detail')
       // Fetch updated wishlist items after adding to the wishlist
      console.log('After dispatch fetchwishlist items in feed detail')
      //navigation.navigate('WishlistScreen');
    } catch (error) {
      console.log('Error adding to wishlist inside Feed Detail:', error);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleClick}
      className="p-4 m-2 rounded-xl bg-white flex items-center justify-center"
      style={{ width: cardWidth }}
    >
      <Image
        source={{ uri: data?.mainImage }}
        resizeMode="contain"
        className="w-32 h-52"
      />

      <View className="flex items-start justify-start space-y-1 w-full">
        <Text className="text-base font-semibold text-[#555]">
          {data?.title}
        </Text>
        <Text className="text-sm text-[#777]">{data?.description}</Text>
      </View>

      <View className="flex-row items-center justify-between space-y-1 w-full">
        <Text className="text-base font-semibold text-[#555]">
          $ {data?.price}
        </Text>

        <TouchableOpacity
          onPress={handleAddToWishlist}
          className="bg-black w-8 h-8 rounded-full flex items-center justify-center"
        >
          <AntDesign name="heart" size={16} color={'#fbfbfb'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default FeedDetail;