import * as React from "react";
import { Image, Platform, ScrollView, TextInput, View } from "react-native";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";
import { Text } from "~/components/ui/text";

export default function Screen() {
  return (
    <ScrollView contentContainerClassName="flex-1 justify-center items-center">
      {/* Login Successful */}
      <View className="web:max-w-xs min-h-screen w-full">
        <View className="flex flex-col justify-center items-center h-1/2">
          <Image
            source={require("../../assets/images/icon.png")}
            style={{ width: 240, height: 240 }}
          />
          <Text className="text-center font-bold text-2xl">
            Login Successful!
          </Text>
        </View>
        <View className="flex h-1/2 bg-red-600 px-12 gap-2">
          <View className="-mt-20">
            <Image
              source={require("../../assets/images/food.png")}
              style={{ width: 240, height: 240 }}
            />
          </View>
          <Text className="text-3xl font-bold text-white">Selamat Datang!</Text>
          <Text className="text-lg font-medium text-white max-w-64">
            Mari kita lestarikan lingkungan dari limbah makanan sisa bersama
            Salur.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
