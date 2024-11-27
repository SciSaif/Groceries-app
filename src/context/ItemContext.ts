import { createContext } from "react";
import { CartItem, Item } from "./ItemProvider";

export interface ItemContextType {
    items: Item[];
    cart: CartItem[];
    addToCart: (item: Item) => void;
    removeFromCart: (itemId: number) => void;
    updateCartItemQuantity: (itemId: number, quantity: number) => void;
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
    fetchItems: (category: string) => Promise<void>;
    loading: boolean;
    selectedCategory: string;
}

export const ItemContext = createContext<ItemContextType>({
    items: [],
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateCartItemQuantity: () => {},
    searchText: "",
    setSearchText: () => {},
    fetchItems: async () => {},
    loading: false,
    selectedCategory: "all",
});
