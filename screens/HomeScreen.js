import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';
import { useState } from 'react';
import { useEffect } from 'react';


const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation])

  useEffect(() => {
    sanityClient.fetch(`
    *[_type == "featured"] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->{
          ...
        }
      }      
    }`).then((data) => {
      setFeaturedCategories(data)
    })
  }, [])


  
  return (
    <SafeAreaView className="bg-white pt-3">
      <View className="pt-9 flex-row">
        <View className="flex-row pb-3 items-center mx-2 space-x-2">
          <Image 
            source={{
              uri: "https://images.prismic.io/dbhq-deliveroo-riders-website/ed825791-0ba4-452c-b2cb-b5381067aad3_RW_hk_kit_importance.png?auto=compress,format&rect=0,0,1753,1816&w=1400&h=1450"
            }}
            className="h-7 w-9 justify-center items-center bg-gray-300 pt-9 rounded-full"
          />
        </View>
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs ">Deliver Now!</Text>
          <Text className="font-bold text-xl pb-3">Current Location
            <ChevronDownIcon size={20} color="#00ccbb"/>
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB"/>
        
      </View>
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-4 items-center bg-gray-200 p-3 h-10">

          <MagnifyingGlassIcon color="gray" size={20}/>
          <TextInput 
            placeholder="Restraunts and cuisines"
            keyboardType='default'
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB"/>
      </View>

      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <Categories />

        {featuredCategories?.map((category) => (
          <FeaturedRow 
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}

        
      </ScrollView>
    </SafeAreaView>
  )
}
export default HomeScreen