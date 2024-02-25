import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";


const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);
  const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] = formatCurrency({ amount: basketTotal.toFixed(2), code: "INR" })

  if (items.length === 0) return null;

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity 
        onPress={() => navigation.navigate("Basket")}
        className="mx-5 bg-[#00ccbb] p-4 rounded-lg flex-row items-center space-x-1"
      >
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">{items.length}</Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">View Bakset</Text>
        <Text className="text-lg text-white font-extrabold">
          <Text>{valueFormattedWithSymbol}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon