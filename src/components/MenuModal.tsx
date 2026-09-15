import { Text, View, Pressable, Dimensions,
    StyleSheet, ScrollView } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const cartSheetMaxHeight = SCREEN_HEIGHT * 0.15;

type Props = {
    products: Product[];
    };


export default function MenuModal({ products }: Props) {
    return(
        <View style={styles.modal}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}>
            {products.map((item, index) => (
                <View style={styles.eachProduct}
                    key={item.name}>
                    <View>
                        <Text style={styles.productText}>{item.name}</Text>
                        <Text style={styles.productText}>฿ {item.price}</Text>
                    </View>
                </View>
                ) )}
        </ScrollView>
        </View>
        );
    }

const styles = StyleSheet.create({
    modal:{
        flex: 1,
        borderWidth: 1.5,
        borderRadius: 12,
        width: '100%',
        padding: 14,
        },

    contentContainerStyle:{
        maxHeight: cartSheetMaxHeight,
        width: '100%',
        },
    eachProduct:{
        width: '100%',
        },
    productText:{
        fontSize: 18,

        },
    })