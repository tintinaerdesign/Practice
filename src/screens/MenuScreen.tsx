import { View, ScrollView, Text, Pressable, StyleSheet,
    Dimensions, Image } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { LinearGradient } from 'expo-linear-gradient';

import { colors } from '../utils/theme';

import { useState } from 'react';

import MenuModal from '../components/MenuModal';

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

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const screenWidth = (SCREEN_WIDTH -24 - 8)/2;

export default function MenuScreen() {

    const [openMenuModal, setOpenMenuModal] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<typeof products>([]);

    const addProduct = (products: typeof products[number]) => {
        setSelectedProducts(prev => [...prev, products,]);
        };

    const groupProducts = (products: Product[]) => {
        return products.reduce((acc, product) => {
            const existingProduct = acc.find(
                item => item.name === product.name);

            if (existingProduct) {
                existingProduct.quantity += 1;
                } else {
                acc.push({...product, quantity: 1,});
                }

            return acc;
            },[] as (Product & {quantity: number})[]
        );
        };

    const doGroupedProducts = groupProducts(selectedProducts);

    const subTotalPrice = doGroupedProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return(
    <>
    <SafeAreaView style={styles.mainWrapper}>
        <ScrollView
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}>
            {products.map((item, index) => (
                <Pressable key={index}
                onPress={() => {
                    setOpenMenuModal(true);
                    addProduct(item);
                    }}
                style={styles.menuCard}>

                    <Image
                        source={item.image}
                        resizeMode="cover"
                        style={{ height: '100%', width: '100%', }}
                        />

                    <LinearGradient
                        start={{ x: 0.5, y: 1,}}
                        end={{ x:0.5, y: 0,}}
                        colors={['rgba(0,0,0,0.85)','rgba(0,0,0,0.6)','transparent']}
                        style={styles.linear}
                    />

                    <View style={{position: 'absolute',bottom:0, padding: 6,}}>
                        <Text style={styles.cardText}>{item.price}</Text>
                        <Text style={{fontSize: 20, color:'#FFF',}}>{item.name}</Text>
                    </View>
                </Pressable>
                ) )}
        </ScrollView>
    </SafeAreaView>
    {openMenuModal && (
        <MenuModal
            products={doGroupedProducts}
            onClose={() => setOpenMenuModal(false)}
            onClear={() => setSelectedProducts([])}
            subTotalPrice={subTotalPrice}
        />
        )}
    </>
        );
    }

const styles = StyleSheet.create({
    mainWrapper:{
        flex: 1,
        backgroundColor: '#EEE',
        width: '100%',
        },

    contentContainerStyle:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: 10,
        gap: 6,
        },
    menuCard:{
        width: screenWidth,
        maxHeight: 160,
        borderWidth: 1.5,
        borderRadius: 12,
        overflow: 'hidden',
        },
    linear:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        },
    cardText:{
        fontSize: 20,
        color: colors.theme
        }
    })