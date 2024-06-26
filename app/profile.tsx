import * as React from "react";
import { Image, View } from "react-native";
import { Link } from "expo-router";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { PencilIcon, Star } from "lucide-react-native";
import { getAuth } from "firebase/auth";
import { getSelf } from "~/lib/api";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  profile: undefined;
  "auth/login": undefined;
};

type ProfileScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "profile"
>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenProp>();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      getSelf().then((data) => {
        setUser(data as any);
      });
    }
  }, []);

  return (
    <View className="flex-1 items-center gap-5 mt-12 p-6">
      {user ? (
        // Profile
        <View className="flex flex-col items-center gap-2">
          <Image
            source={{
              uri: `https://ui-avatars.com/api/?name=${
                user?.username ?? "G"
              }&background=${
                user?.username ? "d92f2f" : "random"
              }&color=fff&size=128&rounded=true&bold=true&length=1&font-size=0.33`,
            }}
            style={{ width: 120, height: 120, borderRadius: 100 }}
          />
          <View className="flex flex-row justify-between items-center bg-[#D92F2F] px-3 py-2 gap-4 rounded-full">
            <Star size={24} fill="white" color="none" />
            <Text className="text-center text-white font-bold">
              {user?.peringkat}
            </Text>
            <Star disabled size={24} color="none" />
          </View>
          <View className="flex flex-row justify-between items-center gap-5">
            {/* <View aria-disabled className="bg-none p-2 rounded-full">
              <PencilIcon disabled size={16} color="none" />
            </View> */}
            <Text className="font-bold text-center">
              {user?.username ?? "Guest"}
            </Text>
            {/* <View className="bg-[#D92F2F] p-2 rounded-full">
              <PencilIcon size={16} color="white" />
            </View> */}
          </View>
          <View className="flex flex-col">
            <Text className="text-center text-sm text-gray-400">
              {user?.email ?? ""}
            </Text>
          </View>
        </View>
      ) : (
        // No user available
        <View className="flex-1 items-center justify-center">
          <Text className="text-center text-lg font-bold">
            Anda harus login terlebih dahulu untuk melihat profil.
          </Text>
          <Button
            className="mt-4 bg-blue-400"
            onPress={() => navigation.navigate("auth/login")}
          >
            <Text className="font-bold text-white">Login</Text>
          </Button>
        </View>
      )}

      {user && (
        <View>
          <View className="border-gray-400 rounded-md border">
            <View className="bg-red-300 rounded-md p-3">
              <Text className="text-left font-bold text-black min-w-full">
                Dampak yang telah kamu buat
              </Text>
            </View>
            <View className="flex flex-col gap-2 px-3 pt-2 pb-3">
              <Text className="text-left text-gray-400 font-medium min-w-full">
                Kamu telah menyelamatkan{" "}
                <Text className="font-bold text-red-700">
                  {user?.impactSaving} makanan
                </Text>
              </Text>
              <Text className="text-left text-gray-400 font-medium min-w-full">
                Kamu menghemat{" "}
                <Text className="font-bold text-red-700">
                  Rp
                  {user?.impactTotal
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </Text>
              </Text>
              <Text className="text-left text-gray-400 font-medium min-w-full">
                Kamu mengurangi{" "}
                <Text className="font-bold text-red-700">
                  {
                    // 2 decimal places
                    parseFloat(user?.impactReduce).toFixed(2)
                  }{" "}
                  kgCo
                </Text>
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
