import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { EmptyCart } from '../assets';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { removeFromCart, fetchCartItems } from '../context/actions/cartActions';

const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);

  const cartItems = useSelector((state) => state.cartItems.cart);
  const feeds = useSelector((state) => state.feeds.feeds);

  useEffect(() => {
    const fetchCartData = async () => {
      await dispatch(fetchCartItems());
      calculateTotal();
    };
    fetchCartData();
  }, []);

  const calculateTotal = () => {
    let mainTotal = 0;
    if (cartItems?.length > 0) {
      cartItems.forEach((item) => {
        const feedItem = feeds.find((feed) => feed._id === item.itemID);
        console.log("Feed Item inside of calculate total: ", feedItem);
        if (feedItem  && feedItem.price) {
          mainTotal += feedItem.price * item.qty;
          console.log("Incrementing main total price inside of loop: ", mainTotal);
        }
      });
      console.log("main total price: ", mainTotal);
    }
    setTotal(mainTotal);
  };

  const removeFromCartHandler = async (_id) => {
    try {
      console.log("THIS IS INSIDE OF removeFromCartHandler TO SHOW THE VALUE: ", _id);
      await dispatch(removeFromCart(_id));
      await dispatch(fetchCartItems());
      calculateTotal();
    } catch (error) {
      console.log('Error removing from cart in cart screen:', error);
    }
  };

  const renderCartItem = ({ item }) => {
    const feedItem = feeds.find((feed) => feed._id === item.itemID);
    if (!feedItem || !item.qty || !feedItem.price) {
      return null;
    }

    return (
      <CartItemCard
        item={feedItem}
        qty={item.qty}
        removeFromCartHandler={() => removeFromCartHandler(feedItem._id)}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EBEAEF', padding: 16 }}>
      <GestureHandlerRootView>
        {/* top section */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={24} color={'#555'} />
          </TouchableOpacity>

          <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#555' }}>
            Shopping Bag
          </Text>

          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'pink', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <FontAwesome5 name="shopping-bag" size={16} color="purple" />
            <View style={{ width: 16, height: 16, backgroundColor: 'red', borderRadius: 10, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, right: 0 }}>
              <Text style={{ color: 'white', fontSize: 12 }}>{cartItems?.length}</Text>
            </View>
          </View>
        </View>

        {cartItems.length === 0 || !cartItems ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 16 }}>
            <Image
              source={EmptyCart}
              style={{ width: 128, height: 128 }}
              resizeMode="contain"
            />
          </View>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.itemID}
            renderItem={renderCartItem}
          />
        )}

        {/* promo code section */}
        <View style={{ paddingVertical: 16 }}>
          <View style={{ padding: 7, height: 60, borderRadius: 20, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <TextInput
              placeholder="Promo Code"
              style={{ fontSize: 16, paddingHorizontal: 14, fontWeight: 'bold', color: '#555', flex: 1 }}
            />
            <TouchableOpacity style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: 'black' }}>
              <Text style={{ fontSize: 16, color: 'white' }}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* total calculation */}
        <View style={{ paddingHorizontal: 16, marginVertical: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#555' }}>
              Subtotal ({cartItems?.length} {cartItems?.length === 1 ? 'item' : 'items'})
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                ${parseFloat(total).toFixed(2)}
              </Text>
              <Text style={{ fontSize: 12, textTransform: 'uppercase', color: '#888' }}>USD</Text>
            </View>
          </View>
          <View style={{ width: '100%', height: 2, backgroundColor: 'white', marginVertical: 8 }} />

          {/* shipping */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#555' }}>
              Shipping Cost
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                $ 5.0
              </Text>
              <Text style={{ fontSize: 12, textTransform: 'uppercase', color: '#888' }}>USD</Text>
            </View>
          </View>
          <View style={{ width: '100%', height: 2, backgroundColor: 'white', marginVertical: 8 }} />

          {/* grand total */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#555' }}>
              Grand Total
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                ${parseFloat(total + 5.0).toFixed(2)}
              </Text>
              <Text style={{ fontSize: 12, textTransform: 'uppercase', color: '#888' }}>USD</Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 16, marginVertical: 16 }}>
          <TouchableOpacity style={{ padding: 16, borderRadius: 20, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
              Proceed to checkout
            </Text>
          </TouchableOpacity>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const CartItemCard = ({ item, qty, removeFromCartHandler }) => {
  return (
    <Swipeable
      renderRightActions={() => rightSwipeActions(item, removeFromCartHandler)}
      onSwipeableRightOpen={() => removeFromCartHandler(item)}
    >
      <View style={{ flexDirection: 'row', paddingHorizontal: 8, alignItems: 'center', marginVertical: 8 }}>
        {/* Image */}
        <View style={{ backgroundColor: 'white', borderRadius: 25, alignItems: 'center', justifyContent: 'center', padding: 8, width: 80, height: 80, position: 'relative' }}>
          <Image
            source={{ uri: item?.bgImage }}
            resizeMode="cover"
            style={{ width: '100%', height: '100%', opacity: 0.4, borderRadius: 20 }}
          />
          <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={{ uri: item?.mainImage }}
              resizeMode="contain"
              style={{ width: 50, height: 50 }}
            />
          </View>
        </View>

        {/* Text Section */}
        <View style={{ flex: 1, marginLeft: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#555', flex: 1 }}>
              {item?.title}
            </Text>
          </View>

          {/* Short Description */}
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#777', marginTop: 4 }}>
            {item?.shortDescription}
          </Text>

          {/* Price and Quantity */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
              $ {parseFloat(item?.price * qty).toFixed(2)}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>
              Qty: {qty}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

const rightSwipeActions = (item, removeFromCartHandler) => {
  return (
    <View style={{ height: '100%', width: 80, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      {/* Step 1: Call removeFromCartHandler when delete icon is pressed */}
      <TouchableOpacity onPress={() => removeFromCartHandler(item)}>
        <FontAwesome5 name="trash" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;
