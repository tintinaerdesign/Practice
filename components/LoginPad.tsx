import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import { useState } from 'react';

import { PIN } from '../utils/PIN';
import { pressKey } from '../func/pressKey';

type Props = {
  pin: string;
  setPin: React.Dispatch<React.SetStateAction<string>>;
  onClose?: () => void;
};

export default function LoginPad({
  pin,
  setPin,
  onClose
}: Props) {

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [firstPin, setFirstPin] =useState<string>(''); // เก็บ PIN ครั้งแรกไวเ้


  const handlePress = (key: string) => {
    pressKey(key, setPin); // 1. เรียกใช้ pressKey ของคุณตามปกติ

    // 2. เช็กว่าถ้าปุ่มที่กดไม่ใช่ปุ่มลบ/ปุ่มว่าง และกดปุ่มนี้แล้วจะครบ 6 ตัวพอดี
    if (key !== '⌫' && key !== '' && pin.length + 1 === 6) {
      setTimeout(() => {
      if (!isCompleted) {
                // 👉 สเต็ปที่ 1: สลับไปหน้า Confirm PIN
                setFirstPin(pin + key); // เซฟ PIN รอบแรกไว้
                setPin('');             // เคลียร์ค่า PIN บนหน้าจอเพื่อเริ่มกดรอบ 2
                setIsCompleted(true);
              } else {
                // 👉 สเต็ปที่ 2: กด Confirm PIN ครบแล้ว (ตรงนี้สามารถเพิ่ม Logic เช็กว่า match กันไหมได้)
                console.log('PIN ตั้งต้น:', firstPin, 'Confirm PIN:', pin + key);
              }
            }, 200);
          }
        };

const handleBack = () => {
    setPin('');
    setFirstPin('');
    setIsCompleted(false);
    onClose?.();}


    return (

        <View style={{ flex: 1 }}>
        <Pressable
          style={styles.closeBtn}
          onPress={handleBack}
          >
          <Text style={styles.closeText}>back</Text>
        </Pressable>


      <View style={{ marginTop: 100 }}>
        <Text style={styles.textSetPin}>
        {isCompleted? 'Confirm Your PIN' : 'Set Your PIN'}
        </Text>
      </View>

      // Step 1: หน้ากด PIN ปกติ
      <View style={styles.pinContainer}>
        {[0, 1, 2, 3, 4, 5].map((item, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index < pin.length && styles.filledDot
            ]}
          />
        ))}
      </View>

      <View style={styles.pad}>
        {PIN.map((key, index) => (
          <Pressable
            key={index}
            onPress={() => handlePress(key)}
            style={({ pressed }) => [
              styles.padBtn,
              pressed && styles.padBtnPressed
            ]}
          >
            <Text style={styles.textInBtn}>{key}</Text>
          </Pressable>
        ))}
      </View>

      )}
  </View>


);

}


const styles = StyleSheet.create({
  pad: {
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 20,
  },
  padBtn: {
    width: "28%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderWidth: 1.5,
    borderColor: "#000000",
    borderRadius: 12,
    backgroundColor: "#FFFFFF"
  },
  textInBtn: {
    fontSize: 26,
    color: "#000000",
  },
  padBtnPressed: {
    backgroundColor: "#ddd"
  },
  textSetPin: {
    textAlign: "center",
    fontSize: 26,
    color: "#000",
  },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 26,
    marginVertical: 60,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "#000",
    backgroundColor: "#FFFFFF",
  },
  filledDot: {
    backgroundColor: "#000"
  },
  closeBtn: {
      position: "absolute",
      left: 0,
      top: 0,
    marginVertical: 12,
    marginHorizontal: 24,
    borderRadius: 20,
  },
  closeText: {
    fontSize: 20,
    color: '#000000',
  },
});