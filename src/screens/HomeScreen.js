import { View, Text, ScrollView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { StatusBar } from 'expo-status-bar'
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import axios from 'axios'
import Recipes from '../components/Recipes'

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Beef')
  const [categories, setCategories] = useState([])
  const [meals, setMeals] = useState([])

  // Get mount
  useEffect(() => {
    getCategories()
    getRecipes()
  }, [])

  // Handle Category Change
  const handleChangeCategory = category => {
    getRecipes(category)
    setActiveCategory(category)
    setMeals([])
  }

  // get categories from api with axios
  const getCategories = async () => {
    try {
      const response = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/categories.php'
      )
      // console.log('got categories', response.data)
      setCategories(response.data.categories)
    } catch (error) {
      console.log('There was an error fetching data', error.message)
    }
  }

  // get Recipes from api with axios
  const getRecipes = async (category = 'Beef') => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      )
      // console.log('got recipes', response.data)
      setMeals(response.data.meals)
    } catch (error) {
      console.log('There was an error fetching data', error.message)
    }
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* Avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require('../../assets/images/avatar.png')}
            style={{ width: hp(5.5), height: hp(5) }}
          />
          <BellIcon size={hp(4)} color={'gray'} />
        </View>

        {/* greetings and punchline */}
        <View className="space-y-2 mx-4 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Hello, Martin!
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-600"
            >
              Make your own food,
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            stay at <Text className="text-amber-400">home</Text>.
          </Text>
        </View>

        {/* Search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            style={{ fontSize: hp(1.7) }}
            placeholder="Search"
            placeholderTextColor="gray"
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />

          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon
              size={hp(2.5)}
              strokeWidth={3}
              color={'gray'}
            />
          </View>
        </View>

        {/* Categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
              categories={categories}
            />
          )}
        </View>

        {/* Recipes */}
        <View>
          <Recipes categories={categories} meals={meals} />
        </View>
      </ScrollView>
    </View>
  )
}
