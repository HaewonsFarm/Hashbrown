import React from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    FlatList,
    StatusBar,
    ImageSourcePropType
} from "react-native";
import { COLORS, SIZES, icons, images, FONTS } from "../constants";

type Feature = {
    id: number;
    icon: ImageSourcePropType;
    color: string;
    backgroundColor: string;
    description: string;
};

type Promo = {
    id: number;
    img: ImageSourcePropType;
    title: string;
    description: string;
};

const Home: React.FC = () => {
    const featuresData: Feature[] = [
        {
            id: 1,
            icon: icons.reload as ImageSourcePropType,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "Top Up"
        },
        {
            id: 2,
            icon: icons.send as ImageSourcePropType,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "Transfer"
        },
        {
            id: 3,
            icon: icons.internet as ImageSourcePropType,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "Internet"
        },
        {
            id: 4,
            icon: icons.wallet as ImageSourcePropType,
            color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "Wallet"
        },
        {
            id: 5,
            icon: icons.bill as ImageSourcePropType,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "Bill"
        },
        {
            id: 6,
            icon: icons.game as ImageSourcePropType,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "Games"
        },
        {
            id: 7,
            icon: icons.phone as ImageSourcePropType,
            color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "Mobile Prepaid"
        },
        {
            id: 8,
            icon: icons.more as ImageSourcePropType,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "More"
        },
    ];

    const specialPromoData: Promo[] = [
        {
            id: 1,
            img: images.promoBanner as ImageSourcePropType,
            title: "Bonus Cashback1",
            description: "Don't miss it. Grab it now!"
        },
        {
            id: 2,
            img: images.promoBanner as ImageSourcePropType,
            title: "Bonus Cashback2",
            description: "Don't miss it. Grab it now!"
        },
        {
            id: 3,
            img: images.promoBanner as ImageSourcePropType,
            title: "Bonus Cashback3",
            description: "Don't miss it. Grab it now!"
        },
        {
            id: 4,
            img: images.promoBanner as ImageSourcePropType,
            title: "Bonus Cashback4",
            description: "Don't miss it. Grab it now!"
        },
    ];

    const [features, setFeatures] = React.useState<Feature[]>(featuresData);
    const [specialPromos, setSpecialPromos] = React.useState<Promo[]>(specialPromoData);

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', marginVertical: SIZES.padding * 2 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h1, color: COLORS.black }}>Hello!</Text>
                    <Text style={{ ...FONTS.body2, color: COLORS.gray }}>ByWanky</Text>
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
                                tintColor: COLORS.secondary
                            }}
                        />
                        <View style={{
                            position: 'absolute',
                            top: -5,
                            right: -5,
                            height: 10,
                            width: 10,
                            backgroundColor: COLORS.red,
                            borderRadius: 5
                        }} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function renderBanner() {
        return (
            <View style={{
                height: 120,
                borderRadius: 20
            }}>
                <Image
                    source={images.banner as ImageSourcePropType}
                    resizeMode="contain"
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 20
                    }}
                />
            </View>
        );
    }

    function renderFeatures() {
        const Header = () => (
            <View style={{ marginBottom: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h3, color: COLORS.black }}>Features</Text>
            </View>
        );

        const renderItem = ({ item }: { item: Feature }) => (
            <TouchableOpacity style={{
                marginBottom: SIZES.padding * 2, width: 50, alignItems: 'center'
            }}
                onPress={() => console.log(item.description)}
            >
                <View style={{
                    height: 40,
                    width: 40,
                    marginBottom: 5,
                    borderRadius: 20,
                    backgroundColor: item.backgroundColor,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image
                        source={item.icon}
                        resizeMode="contain"
                        style={{
                            height: 25,
                            width: 25,
                            tintColor: item.color,
                            margin: 8
                        }}
                    />
                </View>
                <Text style={{
                    flexWrap: 'wrap', textAlign: 'center', ...FONTS.body5, color: COLORS.black
                }}>{item.description}</Text>
            </TouchableOpacity>
        );

        return (
            <FlatList
                ListHeaderComponent={Header}
                data={features}
                numColumns={4}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                style={{
                    marginTop: SIZES.padding * 2
                }}
            />
        );
    }

    function renderPromos() {
        const HeaderComponent = () => (
            <View>
                {renderHeader()}
                {renderBanner()}
                {renderFeatures()}
                {renderPromoHeader()}
            </View>
        );

        const renderPromoHeader = () => (
            <View style={{
                flexDirection: 'row',
                marginBottom: SIZES.padding
            }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h3, color: COLORS.black }}>Special Promos</Text>
                </View>
                <TouchableOpacity onPress={() => console.log("View All")}>
                    <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>View All</Text>
                </TouchableOpacity>
            </View>
        );

        const renderItem = ({ item }: { item: Promo }) => (
            <TouchableOpacity style={{
                marginVertical: SIZES.base,
                width: SIZES.width / 2.5
            }}
                onPress={() => console.log(item.title)}
            >
                <View style={{
                    height: 80,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: COLORS.primary
                }}>
                    <Image
                        source={item.img}
                        resizeMode="cover"
                        style={{
                            width: '100%',
                            height: '100%',
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20
                        }}
                    />
                </View>
                <View style={{
                    padding: SIZES.padding,
                    backgroundColor: COLORS.lightGray,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20
                }}>
                    <Text style={{ ...FONTS.h4, color: COLORS.black }}>{item.title}</Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.black }}>{item.description}</Text>
                </View>
            </TouchableOpacity>
        );

        return (
            <FlatList
                ListHeaderComponent={HeaderComponent}
                contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                data={specialPromos}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <View style={{ marginBottom: 80 }}></View>
                }
            />
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            {renderPromos()}
            <StatusBar
                backgroundColor="white"
                barStyle="dark-content"
            />
        </SafeAreaView>
    );
};

export default Home;
