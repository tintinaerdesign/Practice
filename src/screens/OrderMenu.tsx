import { View, Text, Pressable, Dimensions,
    StyleSheet, ScrollView, Image, } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import MenuModal from '../components/MenuModal';

import { useState } from 'react';

import { LinearGradient } from 'expo-linear-gradient';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const cartSheetMaxHeight = SCREEN_HEIGHT * 0.4;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const cardWidth = ( SCREEN_WIDTH - 24 - 12 )/2;


const products: Product[] = [
    {
        name: 'Iced Americano',
        price: 75,
        image: require('../../assets/products/cold-americano.png'),
        category: 'Iced Coffee',
        },
    {
        name: 'Hot Latte',
        price: 90,
        image: require('../../assets/products/hot-latte.png'),
        category: 'Hot Coffee',
        },
    {
        name: 'Premium Chocolate',
        price: 90,
        image: require('../../assets/products/non-chocolate-ice.png'),
        category: 'Iced Non-Coffee',
        },
    {
        name: 'Croissant',
        price: 70,
        image: require('../../assets/products/croissant.jpg'),
        category: 'Bakery',
        },
    ];
export default function MenuOrder() {

    const [openMenuModal, setOpenMenuModal] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<typeof products>([]);


    const addProduct = (products: typeof products[number]) => {
        setSelectedProducts(prev => [...prev, products,]);
        };

    const groupProduct = (products: Product[]) => {
        return products.reduce((acc, product) => {
        const existingProduct = (
            acc.find(item => item.name === product.name) )
        if (existingProduct) {
            existingProduct.quantity + 1;
            } else {
            acc.push({ ...product, quantity: 1, });
            }

        return acc;
        }, [] as (Product & { quantity: number})[] );
    };

    const doGroupedProducts = groupProduct(selectedProducts);

    return(
        <>
        <SafeAreaView style={styles.mainWrapper}>
        <ScrollView style={styles.cardScrollContainer}
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}>
            {products.map((item, index) => (
                <Pressable style={styles.menuContainer}
                    onPress={() => {
                        setOpenMenuModal(true);
                        addProduct(item);
                        }}>
                    <Image
                        source={item.image}
                        resizeMode="cover"
                        style={styles.image}

                    />

                    <LinearGradient
                        start={{ x: 0.5, y: 0, }}
                        end={{ x: 0.5, y: 1, }}
                        colors={[ 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)','transparent']}
                        style={StyleSheet.absoluteFillObject}
                    />

                    <View style={styles.cardText}>
                        <Text>{item.price}</Text>
                        <Text style={{ color: '#FFF', }}>{item.name}</Text>
                    </View>
                </Pressable>
                ))}
        </ScrollView>
        </SafeAreaView>

        {openMenuModal && (
            <MenuModal
                products={selectedProducts}
            />
            )}
        </>
        );}

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 12,
        },
    cardScrollContainer:{
        overflow: 'hidden',
        },
    contentContainerStyle:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        },

    menuContainer:{
        overflow: 'hidden',
        width: cardWidth,
        height: 160,
        borderRadius: 12,
        borderWidth: 1.5,
        gap: 12,
        marginTop: 10,
        },

    image: {
        height: '100%',
        width: '100%',
        },
    cardText: {
        position: 'absolute',
        bottom: 0,
        padding: 14,
        },
    })