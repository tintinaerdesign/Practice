import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
    ScrollView,
    } from 'react-native';

import { MenuItem } from '../utils/types';
import { addToCart } from '../func/function';
import { coffeeMenu } from '../data/menu';

import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function MenuScreen() {
    const insets = useSafeAreaInsets();
    const [cart, setCart] = useState<MenuItem[]>([]);
    const [showCart, setShowCart] = useState(false);

    const grandTotal = cart.reduce((sum, item) => {
        const qty = item.quantity || 1;
        return sum + item.price * qty;
    }, 0);


    return(


<SafeAreaView style={[styles.screen, {paddingTop: insets.top + 14, paddingHorizontal: 3
            }]}>
        <ScrollView>
            {coffeeMenu.map((item) => (
                <Pressable key={item.id}
                           style={styles.card}
                           onPress={() => {
                               addToCart(item, setCart);
                               setShowCart(true);
                               }}>
                           <Image source={item.image}
                           resizeMode="cover"
                            style={styles.image}/>

                    <LinearGradient colors={[
                        'rgba(0,0,0,0.92)',
                        'rgba(0,0,0,0.75)',
                            'transparent',]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.overlay}
                    />
                    <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                    </View>
                </Pressable>))}
    </ScrollView>


    {showCart && (
            <View style={styles.cartContainer}>

                <ScrollView style={{ maxHeight: 300, paddingTop: 12, }}>
                    {cart.map((item) => {
                        // ดึงค่า quantity (ถ้ายังไม่มีให้คิดเป็น 1)
                        const qty = item.quantity || 1;
                        const totalPrice = item.price * qty;

                        return (
                            <View key={item.id} style={{
                                paddingHorizontal: 4 }}>
                                <View style={{
                                    flexDirection: "row",
                                    paddingHorizontal: 16,
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    {/* ฝั่งซ้าย: ชื่อสินค้า และ ราคารวม */}
                                    <View style={styles.cartItems}>
                                        <Text style={styles.cartText}>{item.name}</Text>
                                        <Text style={styles.cartPrice}>
                                            ฿ {item.price}
                                        </Text>
                                    </View>

                                    {/* ฝั่งขวา: แสดงจำนวน Quantity */}
                                    <View>
                                        <Text style={{ fontSize: 18, fontWeight: '600', color: '#000000' }}>
                                           {qty}
                                        </Text>
                                    </View>
                                </View>
                                {/* เส้นแบ่ง */}
                                <View style={styles.row}></View>
                            </View>
                        );
                    })}
                </ScrollView>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                    }}
                >
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>
                        Total
                    </Text>

                    <Text style={{ fontSize: 20, fontWeight: '700' }}>
                        ฿ {grandTotal}
                    </Text>
                </View>

                <View style={{ flexDirection: "row", width: "100%", justifyContent: "center",
                    paddingHorizontal: 10, paddingVertical: 16, gap: 12,}}
                    >
                    <Pressable style={styles.button}
                    onPress={() => {
                                            setCart([]);
                                            setShowCart(false);}}>
                    <Text style={{ fontSize: 24 }}>
                    cancel all
                    </Text>
                    </Pressable>

                    <Pressable style={[styles.button, {backgroundColor: "#FEE600"}]}
                    onPress={() => alert('Order Place!')}>
                    <Text style={{ fontSize: 24 }}>
                    Place Order
                    </Text>
                    </Pressable>
                </View>
            </View>
    )}



</SafeAreaView>
            );
        }





const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#000000",
        },
    card: {
        borderRadius: 12,
        borderWidth: 3,
        borderColor: "#2A2A2A",
        overflow: "hidden",
        width: "100%",
        height: 120,
        marginBottom: 8,
        },
    image: {
        width: "100%",
        height: "100%",
        },
    overlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        },
    textContainer: {
        position: "absolute",
        padding: 16,
        },
    name: {
        fontSize: 26,
        fontWeight: 3,
        color: "#FFFFFF", },
    price: {
        fontSize: 24,
        fontWeight: 3,
        color: "#FEB600",
        },

// cart
    cartContainer: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "#FFFFFF",
        width: "100%",
        minHeight: 200,
        maxHeight: 500,
        borderRadius: 12,
        },
    cartHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 12,
        },
    cancelAll: {
        fontSize: 26,
        fontColor: "#000000",
        },
    row: {
        marginTop: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#EEEEEE",
        alignSelf: "center",
        width: "93%",
        height: 1,
        },
    cartItems: {

        fontSize: 26,
        fontColor: "#000000",
        },
    cartText: {
        fontSize: 20,
        fontWeight: "600"
        },
    cartPrice: {
            fontSize: 16,
            fontWeight: "600",
            },
        buttonContainer: {
            position: "absolute",
            bottom: 0,
            maxHeight: 400,
            },
        button: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            borderWidth: 1.5,
            borderColor: '#000000',
            width: 30,
            height: 60,

            },
    })