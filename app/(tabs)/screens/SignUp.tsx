import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import { COLORS, SIZES, FONTS } from "../../../constants";

// update - back
import * as authentication from "../../../back/authentication/bioAuthentication"

const SignUp = () => {
  const [did, setDid] = useState("");
  const [email, setEmail] = useState("");
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const router = useRouter();

  //update - back
  const checkBiometricSupport = async () => {
      const result=await authentication.booleanBiometricsCheck();
      setIsBiometricSupported(result.result);
  };

  //update - back 
  const handleBiometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Log in using biometrics",
    });

    if (result.success) {
      Alert.alert("Biometric Idetification Success", "Authentication has been completed successfully.");
    } else {
      Alert.alert("Biometrics Identification Failure", "Authentication failed.");
    }const biometricsCheck = await authentication.booleanBiometricsCheck();
    if (biometricsCheck?.result) {
      const bioKey = await authentication.biometricsLogin(did);
      if (bioKey?.result) {
        Alert.alert("Biometric Identification Success", "Authentication has been completed successfully.");
      } else {
        Alert.alert("Biometrics Identification Failure", "Authentication failed.");
      }
    } else {
      Alert.alert("Biometric Authentication Unavailable", "Your device does not support biometric authentication.");
    }
  };

  React.useEffect(() => {
    checkBiometricSupport();
  }, []);

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: SIZES.padding * 2,
          paddingHorizontal: SIZES.padding * 2,
        }}
      >
        <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Sign Up</Text>
      </View>
    );
  }

  function renderLogo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 60 }}>🥔</Text>
        <Text style={{ color: COLORS.white, ...FONTS.h1 }}>Hashbrown</Text>
        <Text style={{ color: COLORS.white, ...FONTS.h2}}>Sign up</Text>
      </View>
    );
  }

  function renderForm() {
    return (
      <View style={{ marginTop: SIZES.padding * 3, marginHorizontal: SIZES.padding * 3 }}>
        {/* Email */}
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Email</Text>
          <TextInput
            style={{
              marginTop: SIZES.padding,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.white,
              ...FONTS.body3,
            }}
            placeholder="Enter Email"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          {/* DID Key */}
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <Text style={{ color: COLORS.white, ...FONTS.body3 }}>DID Key</Text>
          <TextInput
            style={{
              marginTop: SIZES.padding,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.white,
              ...FONTS.body3,
            }}
            placeholder="Enter password"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
            value={did}
            onChangeText={setDid}
          />
        </View>
        </View>

        {/* Biometric Authentication */}
        {isBiometricSupported && (
          <TouchableOpacity
            style={{
              marginTop: SIZES.padding * 3,
              height: 50,
              backgroundColor: COLORS.orange,
              borderRadius: SIZES.radius / 1.5,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleBiometricAuth}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Use Biometric Authentication</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={{ margin: SIZES.padding * 3 }}>
        <TouchableOpacity
          style={{
            height: 60,
            backgroundColor: COLORS.orange,
            borderRadius: SIZES.radius / 1.5,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => router.push("../index")}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        {/* 단순한 그라디언트 효과를 위한 겹치는 View */}
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: COLORS.mustard,
          }}
        />
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: COLORS.mustard,
            opacity: 0.7, // 투명도를 사용해 그라디언트 느낌
          }}
        />
        <ScrollView>
          {renderHeader()}
          {renderLogo()}
          {renderForm()}
          {renderButton()}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
