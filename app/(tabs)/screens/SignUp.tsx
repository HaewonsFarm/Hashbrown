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
  StyleProp,
  ViewStyle,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { Tabs, useRouter } from "expo-router";
import * as Font from 'expo-font';
import { COLORS, SIZES, FONTS } from "../../../constants";
import Web3 from "web3";

const web3 = new Web3("https://rinkeby.infura.io/v3/4945662535c945b2b646f71f6060a062");

const contractABI: any[] = [/*스마트 컨트랙트 ABI*/];
const contractAddress = "0x1234567890abcdef1234567890abcdef12345678";

const contract = new web3.eth.Contract(contractABI, contractAddress);

type User = {
  did: string;
  email: string;
};

const SignUp = () => {
  const [did, setDid] = useState("");
  const [email, setEmail] = useState("");
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [account, setAccount] = useState("");

  const router = useRouter();

  const checkRegistration = async () => {
    try {
      const registeredUser: User = await contract.methods.getUser(email).call();
      if (registeredUser && registeredUser.did === did) {
        setIsRegistered(true);
      } else {
        setIsRegistered(false);
      }
    } catch (error) {
      console.error("Error checking registration:", error);
      setIsRegistered(false);
    }
  };

  const handleSignUp = async () => {
    try {
      if (!did || !email) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      await contract.methods.registerUser(did, email).send({ from: accounts[0] });

      Alert.alert("Success", "User information stored on the blockchain!");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong while signing up.");
    }
  };

  const handleLogin = async () => {
    if (isRegistered) {
      Alert.alert("Login Successful", "Welcome back!");
      <Tabs.Screen/>
    } else {
      Alert.alert("Not Registered", "You need to sign up first.");
    }
  };

  const checkBiometricSupport = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    setIsBiometricSupported(compatible);
  };

  const handleBiometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Log in using biometrics",
    });

    if (result.success) {
      handleLogin();
    } else {
      Alert.alert("Biometric Identification Failure", "Authentication failed.");
    }
  };

  React.useEffect(() => {
    checkBiometricSupport();
  }, []);

  React.useEffect(() => {
    if (email && did) {
      checkRegistration();
    }
  }, [email, did]);


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
        <Text style={{ color: COLORS.white, ...FONTS.largeTitle }}>Hashbrown</Text>
        <Text style={{ color: COLORS.white, ...FONTS.h1 }}>Log in</Text>
      </View>
    );
  }
  function renderForm() {
    return (
      <View style={{ marginTop: SIZES.padding * 3, marginHorizontal: SIZES.padding * 3 }}>
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <Text style={{ color: COLORS.white, ...FONTS.body2 }}>Email</Text>
          <TextInput
            style={{
              marginTop: SIZES.padding / 2,
              marginBottom: SIZES.padding * 1.5,
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
          <View style={{ marginTop: SIZES.padding * 2, marginBottom: SIZES.padding * 7 }}>
            <Text style={{ color: COLORS.white, ...FONTS.body2 }}>DID Key</Text>
            <TextInput
              style={{
                marginTop: SIZES.padding / 2,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                height: 40,
                color: COLORS.white,
                ...FONTS.body3,
              }}
              placeholder="Enter DID Key"
              placeholderTextColor={COLORS.white}
              selectionColor={COLORS.white}
              value={did}
              onChangeText={setDid}
            />
          </View>
        </View>
        </View>
    );
  };

  function renderBiometricButton() {
    return (
      isBiometricSupported && (
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: COLORS.orange,
            borderRadius: SIZES.radius * 3.0,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: SIZES.padding * 2,
            marginBottom: SIZES.padding / 3,
          }}
          onPress={handleBiometricAuth}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Use Biometric Authentication</Text>
        </TouchableOpacity>
      )
    );
  }

  function renderSignUpButton() {
    return (
      <View style={{ margin: SIZES.padding }}>
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: COLORS.orange,
            borderRadius: SIZES.radius / 1.0,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 30,
            marginHorizontal: SIZES.padding * 1,
          }}
          onPress={handleLogin}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
            Continue
          </Text>
        </TouchableOpacity>

        <View style={{
          flexDirection: 'row',
          marginTop: SIZES.padding * 7,
          marginHorizontal: SIZES.padding * 2,
          marginBottom: SIZES.padding
        }}>
          <View style={{ flex: 1 }}>
            <Text style={{ ...FONTS.body2, color: COLORS.white }}>If you haven't registered, ...</Text>
          </View>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={{ color: COLORS.white, ...FONTS.h2, marginRight: SIZES.padding }}>Sign up</Text>
          </TouchableOpacity>
       </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
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
            opacity: 0.7,
          }}
        />
        <ScrollView>
          {renderHeader()}
          {renderLogo()}
          {renderForm()}
          {renderBiometricButton()}
          {renderSignUpButton()}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;