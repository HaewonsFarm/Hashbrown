import React from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    FlatList,
    StatusBar,
    ImageSourcePropType,
    StyleSheet,
} from "react-native";
import { COLORS, SIZES, icons, images, FONTS } from "../../constants";

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

    const renderHeader = () => (
        <View style={{ flexDirection: 'row', marginVertical: SIZES.padding * 3 }}>
            <View style={{ flex: 1 }}>
                <Text style={{ ...FONTS.h1, color: COLORS.black }}>Hello!</Text>
                <Text style={{ ...FONTS.body2, color: COLORS.gray }}>Hashbrown</Text>
            </View>
            <View style={{ alignContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={styles.notificationButton}>
                    <Image
                        source={icons.bell}
                        style={styles.notificationIcon}
                    />
                    <View style={styles.notificationBadge} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderBanner = () => (
        <View style={styles.bannerContainer}>
            <Image
                source={images.banner as ImageSourcePropType}
                resizeMode="contain"
                style={styles.bannerImage}
            />
        </View>
    );

    const renderFeatures = () => {
        const Header = () => (
            <View style={{ marginBottom: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h3, color: COLORS.black }}>Features</Text>
            </View>
        );

        const renderItem = ({ item }: { item: Feature }) => (
            <TouchableOpacity style={styles.featureButton} onPress={() => console.log(item.description)}>
                <View style={[styles.featureIconContainer, { backgroundColor: item.backgroundColor }]}>
                    <Image
                        source={item.icon}
                        resizeMode="contain"
                        style={[styles.featureIcon, { tintColor: item.color }]}
                    />
                </View>
                <Text style={styles.featureDescription}>{item.description}</Text>
            </TouchableOpacity>
        );

        return (
            <FlatList
                ListHeaderComponent={Header}
                data={featuresData}
                numColumns={4}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                style={{ marginTop: SIZES.padding * 2 }}
            />
        );
    };

    const renderPromos = () => {
        const HeaderComponent = () => (
            <View>
                {renderHeader()}
                {renderBanner()}
                {renderFeatures()}
                {renderPromoHeader()}
            </View>
        );

        const renderPromoHeader = () => (
            <View style={{ flexDirection: 'row', marginBottom: SIZES.padding }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h3, color: COLORS.black }}>Special Promos</Text>
                </View>
                <TouchableOpacity onPress={() => console.log("View All")}>
                    <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>View All</Text>
                </TouchableOpacity>
            </View>
        );

        const renderItem = ({ item }: { item: Promo }) => (
            <TouchableOpacity style={styles.promoButton} onPress={() => console.log(item.title)}>
                <View style={styles.promoImageContainer}>
                    <Image
                        source={item.img}
                        resizeMode="cover"
                        style={styles.promoImage}
                    />
                </View>
                <View style={styles.promoTextContainer}>
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
                data={specialPromoData}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={{ marginBottom: 80 }} />}
            />
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            {renderPromos()}
            <StatusBar backgroundColor="white" barStyle="dark-content" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    notificationButton: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
    },
    notificationIcon: {
        width: 20,
        height: 20,
        tintColor: COLORS.secondary,
    },
    notificationBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        height: 10,
        width: 10,
        backgroundColor: COLORS.red,
        borderRadius: 5,
    },
    bannerContainer: {
        height: 120,
        borderRadius: 20,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    featureButton: {
        marginBottom: SIZES.padding * 2,
        width: 50,
        alignItems: 'center',
    },
    featureIconContainer: {
        height: 40,
        width: 40,
        marginBottom: 5,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    featureIcon: {
        height: 25,
        width: 25,
        margin: 8,
    },
    featureDescription: {
        flexWrap: 'wrap',
        textAlign: 'center',
        ...FONTS.body5,
        color: COLORS.black,
    },
    promoButton: {
        marginVertical: SIZES.base,
        width: SIZES.width / 2.5,
    },
    promoImageContainer: {
        height: 80,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.primary,
      },
  promoImage: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  promoTextContainer: {
    padding: SIZES.padding,
    backgroundColor: COLORS.lightGray,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default Home;