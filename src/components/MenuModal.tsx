import { Text, View, Pressable, ScrollView, Dimensions,
    StyleSheet } from 'react-native';

import { useState } from 'react';
import { colors } from '../utils/theme';
type Props = {
    onClose: () => void;
    onClear: () => void;
    products: Product[];
    subTotalPrice: number;
    };

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const cartSheetMaxHeight = SCREEN_HEIGHT * 0.4;

const SWEETNESS_LEVELS = ['ไม่หวาน', 'หวาน 25', 'หวาน 50', 'หวาน 75', 'หวานปรกติ'];

function CartItemRow({ item }: { item: Product & { quantity: number } }) {
    const [sweetnessIndex, setSweetnessIndex] = useState(0);

    const toggleSweetness = () => {
        setSweetnessIndex((prev) => (prev + 1) % SWEETNESS_LEVELS.length);
        };

    return(
        <View key={item.name}>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
                  <View>
                       <Text style={{fontSize: 20, fontWeight:400,}}>{item.name}</Text>

                       <View style={{gap: 6, flexDirection:'row'}}>

                                        <Text>฿ {item.price}</Text>
                                        <Pressable style={styles.sweetnessBox}
                                            onPress={() => toggleSweetness()}>
                                            <Text>{SWEETNESS_LEVELS[sweetnessIndex]}</Text>
                                        </Pressable>
                       </View>
                  </View>

                  <Text style={{fontSize: 18}}>{item.quantity}</Text>
             </View>

        <View style={styles.divider}/>

        </View>
        );
    }

export default function MenuModal({ products, onClose, onClear, subTotalPrice }: Props) {

    return(
    <View style={styles.modal}>
        <ScrollView
            showsVerticalScrollIndicator={false}>
            {products.map((item, index) => (
                <CartItemRow key={`${item.name}-${item.index}`} item={item} />

                ))}
        </ScrollView>

        <View style={[styles.divider,{backgroundColor: '#A0A0A0'}]}/>

        <View style={[styles.flexBox, {marginTop: 5,}]}>
            <Text style={styles.subtotalText}>Subtotal</Text>
            <Text style={{fontSize: 20,}}>฿ {subTotalPrice}</Text>
        </View>

        <View style={[styles.flexBox, {gap:12,marginTop:6,}]}>
            <Pressable style={styles.button} onPress={() => {
                onClose();
                onClear();
                } }>
                <Text style={styles.bigText}>Cancel all</Text>
            </Pressable>
            <Pressable style={[styles.button,{ backgroundColor:colors.theme }]}>
                <Text style={styles.bigText}>Save Order</Text>
            </Pressable>
        </View>
    </View>
        );
    }

const styles = StyleSheet.create({
    modal:{
        maxHeight: cartSheetMaxHeight,
        width: '100%',
        overflow: 'hidden',
        borderWidth: 1.5,
        borderRadius: 12,
        padding: 14,
        },
    divider:{
        height: 1.5,
        width: '100%',
        backgroundColor: '#E0E0E0',
        marginTop: 7,
        },
    subtotalText:{
        fontSize: 20,
        fontWeight: 600,
        },
    flexBox:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        },
    button:{
        flex: 1,
        width: '100%',
        height: 60,
        borderWidth: 1.5,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        },
    bigText:{
        fontSize: 24,
        fontWeight: 600,
        },
    sweetnessBox:{
        backgroundColor: '#EEE000',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 25,
        },
    })