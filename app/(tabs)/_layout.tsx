import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  AccessibilityState,
} from "react-native";
import { Tabs } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { COLORS, icons } from "../../constants";


// 커스텀버튼 타입 선언
type TabBarCustomButtonProps = {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void; // Make onPress optional
  accessibilityState?: AccessibilityState;
};

// 탭 바에 들어갈 버튼 커스텀
const TabBarCustomButton: React.FC<TabBarCustomButtonProps> = ({
  children,
  onPress,
  accessibilityState,
}) => {
  const isSelected = accessibilityState?.selected ?? false;

  if (isSelected) {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ flexDirection: "row", position: "absolute", top: 0 }}>
          <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.white}
            />
          </Svg>
          <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
        </View>

        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.primary,
            ...styles.shadow,
          }}
          onPress={onPress} // onPress가 여기서 핸들링된다.
        >
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: 50,
          height: 50,
          backgroundColor: COLORS.white,
        }}
        activeOpacity={1}
        onPress={onPress} // onPress 핸들링
      >
        {children}
      </TouchableOpacity>
    );
  }
};

// Main Layout with Tabs
export default function Layout() {
  return (
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
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name= "index"  // home
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.more}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.white : COLORS.orange,
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="screens/Scan"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.scan}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.white : COLORS.orange,
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="screens/SignUp"  // user
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.user}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.white : COLORS.orange,
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.orange,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
