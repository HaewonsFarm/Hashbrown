import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  ImageSourcePropType
} from "react-native";
import { COLORS, SIZES, icons, FONTS } from "../../constants";
import { useRouter, useLocalSearchParams } from "expo-router";

type Feature = {
  id: number;
  icon: ImageSourcePropType;
  color: string;
  backgroundColor: string;
  description: string;
};

const Home: React.FC = () => {
  const router = useRouter();
  const { authenticated } = useLocalSearchParams(); // Fetch query parameters

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authenticated === "true");

  const [features, setFeatures] = useState<Feature[]>([
    {
      id: 1,
      icon: icons.reload as ImageSourcePropType,
      color: COLORS.purple,
      backgroundColor: COLORS.lightpurple,
      description: isAuthenticated ? "Authenticated User" : "User Authentication"
    },
    {
      id: 2,
      icon: icons.bill as ImageSourcePropType,
      color: COLORS.primary,
      backgroundColor: COLORS.lightGreen,
      description: "View Documents"
    },
  ]);

  useEffect(() => {
    setFeatures(prevFeatures => prevFeatures.map(feature =>
      feature.id === 1
        ? { ...feature, description: isAuthenticated ? "Authenticated User" : "User Authentication" }
        : feature
    ));
  }, [isAuthenticated]);

  const handleFeaturePress = (description: string) => {
    if (description === "User Authentication" && !isAuthenticated) {
      router.push("./screens/SignUp");
    } else if (description === "View Documents") {
      router.push("../documentViewer");
    } else {
      console.log(description);
    }
  };

  const [notificationCount, setNotificationCount] = useState<number>(3);

  function renderHeader() {
    return (
      <View style={{ flexDirection: 'row', marginTop: SIZES.padding * 6, marginBottom: SIZES.padding * 2 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ ...FONTS.h1, color: COLORS.black }}>Hello!</Text>
          <Text style={{ ...FONTS.body2, color: COLORS.gray }}>Hashbrown</Text>
        </View>
        <View style={{ alignContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.lightGray
          }}>
            <Image
              source={icons.bell}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.gray
              }}
            />
            {notificationCount > 0 && (
              <View style={{
                position: 'absolute',
                top: -5,
                right: -5,
                height: 16,
                width: 16,
                backgroundColor: COLORS.red,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  color: COLORS.white,
                  ...FONTS.body5,
                  lineHeight: 15,
                  textAlign: 'center',
                }}>{notificationCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderFeatures() {
    return (
      <View style={{ marginTop: SIZES.padding * 2 }}>
        <Text style={{ ...FONTS.h2, color: COLORS.black, marginBottom: SIZES.padding * 2 }}>My Wallet</Text>
        {features.map((item) => (
          <TouchableOpacity key={item.id} style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: SIZES.padding * 3,
          }}
            onPress={() => handleFeaturePress(item.description)}
          >
            <View style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: item.backgroundColor,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: SIZES.padding,
            }}>
              <Image
                source={item.icon}
                resizeMode="contain"
                style={{
                  height: 25,
                  width: 25,
                  tintColor: item.color,
                }}
              />
            </View>
            <Text style={{
              flex: 1,
              ...FONTS.body4,
              color: COLORS.black
            }}>{item.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, paddingHorizontal: SIZES.padding * 2 }}>
      {renderHeader()}
      {renderFeatures()}
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
      />
    </SafeAreaView>
  );
};

export default Home;