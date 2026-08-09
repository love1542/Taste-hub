import { createContext, ReactNode, useState } from "react"
import { Food } from "../data/types"

export type CartItem = {
    foodId: string;
    restaurantId: string;

    name: string;
    image: string;

    price: number;
    discountPrice?: number;

    preparationTime: number;

    quantity: number;
};

export type CartContextType = {
    items: CartItem[];

    addToCart: (item: CartItem) => void;
    removeFromCart: (foodId: string) => void;
    updateQuantity: (foodId: string, quantity: number) => void;
    clearCart: () => void;

    totalItems: number;
    totalPrice: number;
};

export const CartContext = createContext<CartContextType | null>(null)

type Props = {
    children: ReactNode
}

const CartContextProvider = ({ children }: Props) => {
    const [items, setItems] = useState<CartItem[]>([])

    const addToCart = (item: CartItem) => {
        const updated = [...items, item]
        setItems(updated)
    }

    const removeFromCart = (foodId: string) => {
        const updated = items.filter((item) => { item.foodId !== foodId })
        setItems(updated)
    }

    const updateQuantity = (foodId: string, quantity: number) => {
        if (quantity <= 0) {
            setItems(prev =>
                prev.filter(item => item.foodId !== foodId)
            );
            return;
        }

        setItems(prev =>
            prev.map(item =>
                item.foodId === foodId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setItems([])
    }

    const totalItems = items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart }}>
            {
                children
            }
        </CartContext.Provider>
    )
}

export default CartContextProvider;