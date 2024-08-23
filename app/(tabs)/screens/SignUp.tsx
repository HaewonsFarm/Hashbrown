import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    TouchableWithoutFeedback,
    Image,
    FlatList,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    TextInput,
    Modal,
    GestureResponderEvent
} from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../../../constants";
import LinearGradient from "react-native-linear-gradient";

// 타입 선언
type Area = {
    code: string;
    name: string;
    callingCode: string;
    flag: string;
};

type SignUpProps = {
    navigation: any;
};

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [areas, setAreas] = useState<Area[]>([]);
    const [selectedArea, setSelectedArea] = useState<Area | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data) => {
                const areaData: Area[] = data.map((item: any) => {
                    return {
                        code: item.cca2, // alpha2Code 대신 cca2 사용
                        name: item.name.common, // name.common을 사용해 국가 이름을 가져옴
                        callingCode: `+${item.idd.root}${item.idd.suffixes[0] || ''}`, // callingCodes 대체
                        flag: `https://flagsapi.com/${item.cca2}/flat/64.png`
                    };
                });

                setAreas(areaData);

                if (areaData.length > 0) {
                    const defaultData = areaData.filter((a) => a.code === "IN");

                    if (defaultData.length > 0) {
                        setSelectedArea(defaultData[0]);
                    }
                }
            });
    }, []);

    function renderHeader() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: SIZES.padding * 2,
                }}
                onPress={() => navigation.goBack()}
            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.white,
                        marginLeft: 10,
                    }}
                />
                <Text
                    style={{
                        marginLeft: SIZES.padding * 1.5,
                        color: COLORS.white,
                        ...FONTS.h4,
                    }}
                >
                    Sign Up
                </Text>
            </TouchableOpacity>
        );
    }

    function renderLogo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 5,
                    height: 100,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image
                    source={images.wallieLogo}
                    resizeMode="contain"
                    style={{
                        width: "60%",
                    }}
                />
            </View>
        );
    }

    function renderForm() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 3,
                    marginHorizontal: SIZES.padding * 3,
                }}
            >
                {/* Full Name */}
                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
                        Full Name
                    </Text>
                    <TextInput
                        style={{
                            marginTop: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3,
                        }}
                        placeholder="Enter Full Name"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                    />
                </View>

                {/* Phone Number */}
                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
                        Phone Number
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                            style={{
                                width: 100,
                                height: 50,
                                marginHorizontal: 5,
                                borderBottomColor: COLORS.white,
                                borderBottomWidth: 1,
                                flexDirection: "row",
                                ...FONTS.body2,
                            }}
                            onPress={() => setModalVisible(true)}
                        >
                            <View style={{ justifyContent: "center" }}>
                                <Image
                                    source={icons.down}
                                    style={{
                                        width: 10,
                                        height: 10,
                                        tintColor: COLORS.white,
                                    }}
                                />
                            </View>
                            <View style={{ justifyContent: "center", marginLeft: 5 }}>
                                {selectedArea && (
                                    <Image
                                        source={{ uri: selectedArea.flag }}
                                        resizeMode="contain"
                                        style={{
                                            width: 30,
                                            height: 30,
                                        }}
                                    />
                                )}
                            </View>
                            <View style={{ justifyContent: "center", marginLeft: 5 }}>
                                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
                                    {selectedArea ? `${selectedArea.code} ${selectedArea.callingCode}` : "Select"}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Phone number */}
                        <TextInput
                            style={{
                                flex: 1,
                                marginVertical: SIZES.padding,
                                borderBottomColor: COLORS.white,
                                borderBottomWidth: 1,
                                height: 40,
                                color: COLORS.white,
                                ...FONTS.body3,
                            }}
                            placeholder="Enter Phone Number"
                            placeholderTextColor={COLORS.white}
                            selectionColor={COLORS.white}
                        />
                    </View>
                </View>

                {/* Password */}
                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
                        Password
                    </Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3,
                        }}
                        placeholder="Enter Password"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            right: 0,
                            bottom: 10,
                            height: 30,
                            width: 30,
                        }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={showPassword ? icons.disable_eye : icons.eye}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.white,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function renderButton() {
        return (
            <View style={{ margin: SIZES.padding * 3 }}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: COLORS.black,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Continue</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function renderAreaCodeModal() {
        const renderItem = ({ item }: { item: Area }) => {
            return (
                <TouchableOpacity
                    style={{ padding: SIZES.padding, flexDirection: "row" }}
                    onPress={() => {
                        setSelectedArea(item);
                        setModalVisible(false);
                    }}
                >
                    <Image
                        source={{ uri: item.flag }}
                        style={{
                            width: 30,
                            height: 30,
                            marginRight: 10,
                        }}
                    />
                    <Text style={{ ...FONTS.body4 }}>{item.name}</Text>
                </TouchableOpacity>
            );
        };

        return (
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <View
                            style={{
                                height: 400,
                                width: SIZES.width * 0.8,
                                backgroundColor: COLORS.lightGreen,
                                borderRadius: SIZES.radius,
                            }}
                        >
                            <FlatList
                                data={areas}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.code}
                                showsVerticalScrollIndicator={false}
                                style={{
                                    padding: SIZES.padding * 2,
                                    marginBottom: SIZES.padding * 2,
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
    return (
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
      >
        {/* 여기서 자꾸 에러가 난다. 다른 폴더에서 시도했을 땐 안 떴는데 대체 왜 뜨는지 모르겠다. */}
        {/*
          <LinearGradient
              colors={[COLORS.lime, COLORS.emerald]}
              style={{ flex: 1 }}
          >
              <ScrollView>
                  {renderHeader()}
                  {renderLogo()}
                  {renderForm()}
                  {renderButton()}

              </ScrollView>

          </LinearGradient>
          */}
          {renderAreaCodeModal()}
      </KeyboardAvoidingView>
    );
};

export default SignUp;
