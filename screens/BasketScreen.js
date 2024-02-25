import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, Touchable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { XCircleIcon } from 'react-native-heroicons/solid';
import urlFor from '../urlFor';
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";


const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();
  const [basketTotalWithSymbol, valueFormattedWithoutSymbol, symbol] = formatCurrency({ amount: basketTotal.toFixed(2), code: "INR" });
  const [deliverFeeWithSymbol, deliverFeeWithoutSymbol, symbol2] = formatCurrency({ amount: (basketTotal * 0.07).toFixed(2), code: "INR" });
  const [orderTotalWithSymbol, orderTotalWithoutSymbol, symbol3] = formatCurrency({ amount: (basketTotal * 1.07).toFixed(2), code: "INR" });
            
  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);


  return (
    <SafeAreaView className="flex-1 bg-white pt-10">
      <View className=" flex-1  bg-gray-100">
        <View className="p-5 border-b border-[#00ccbb] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">{restaurant.title}</Text>
          </View>

          <TouchableOpacity 
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00ccbb" size={50}/>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 py-3 bg-white my-5 p-3">
          <Image 
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => {
            const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] = formatCurrency({ amount: (items[0]?.price).toFixed(2), code: "INR" });
            return (
              <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
                <Text className="text-[#00CCBB]">{items.length} x</Text>
                <Image
                  source={{ uri: urlFor(items[0]?.image).url() }}
                  className="h-12 w-12 rounded-full"
                />
                <Text className="flex-1">{items[0]?.name}</Text>
                <Text className="text-gray-600">
                  <Text>{valueFormattedWithSymbol}</Text>
                </Text>

                <TouchableOpacity>
                  <Text 
                    className="text-[#00ccbb] text-xs"
                    onPress={() => dispatch(removeFromBasket({id: key}))}
                  >
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
              );
            })}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              <Text>{basketTotalWithSymbol}</Text>
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              <Text>{deliverFeeWithSymbol}</Text>
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="">Order Total</Text>
            <Text className="font-extrabold">
              <Text>{orderTotalWithSymbol}</Text>
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("PreparingOrderScreen")} className="rounded-lg bg-[#00CCBB] p-4">
            <Text className="text-center text-white font-bold">Place Order</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen