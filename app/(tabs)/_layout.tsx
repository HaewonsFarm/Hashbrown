// app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { StatusBar } from "react-native";
import { COLORS } from "../../constants";

export default function TabLayout() {
  return (
    <>
      <StatusBar backgroundColor="#00BA63" barStyle="dark-content" />

      {/* Tabs 네비게이션 */}
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "transparent",
            elevation: 0,
          },
          headerShown: false, // 모든 스크린에서 헤더 숨기기
        }}
      >
        <Tabs.Screen
          name="SignUp"
          options={{
            title: "Sign Up",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? "person-add" : "person-add-outline"} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="Home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

