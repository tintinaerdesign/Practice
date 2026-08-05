import { MenuItem } from '../utils/types';


export function addToCart(
    item: MenuItem,
    setCart: React.Dispatch<React.SetStateAction<MenuItem[]>>
) {
    setCart((prevCart) => {
        // 1. เช็กว่ามีสินค้านี้อยู่ใน cart แล้วหรือยัง (เปรียบเทียบจาก id หรือ name)
        const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
            // 2. ถ้ามีแล้ว ให้วนลูปอัปเดตเฉพาะรายการนั้น โดยเพิ่ม quantity ขึ้น 1
            return prevCart.map((cartItem) =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
                    : cartItem
            );
        }

        // 3. ถ้ายังไม่มี ให้เพิ่ม item เข้าไปใหม่พร้อมกำหนด quantity = 1
        return [...prevCart, { ...item, quantity: 1 }];
    });
}

