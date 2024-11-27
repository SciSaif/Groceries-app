import React, { useState, useEffect } from 'react';
import { ItemContext } from './ItemContext';

const OFFERS = [
    { item_id: 642, qty: 6, free_item_id: 642 }, // Buy 6 Coca-Cola, get 1 free
    { item_id: 532, qty: 3, free_item_id: 641 }, // Buy 3 croissants, get a coffee
];


export interface Item {
    id: number;
    type: string;
    name: string;
    description: string;
    rating: number;
    img: string;
    price: string;
    available: number;
}

export interface CartItem extends Item {
    quantity: number;
    isOffer?: boolean;
}




export const ItemProvider = ({ children }: {
    children:
    React.ReactNode
}) => {
    const [items, setItems] = useState<Item[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const cartFromStorage = localStorage.getItem('cart');
        if (cartFromStorage) {
            setCart(JSON.parse(cartFromStorage));
        }
    }, []);

    const fetchItems = async (category: string) => {
        setSelectedCategory(category);
        setLoading(true);
        const response = await fetch(`https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=${category}`);
        const data = await response.json();
        setItems(data);
        setLoading(false);
    };

    const applyOffers = (cartItems: CartItem[]): CartItem[] => {
        let updatedCart = [...cartItems];

        OFFERS.forEach((offer) => {
            const offerItem = updatedCart.find((item) => item.id === offer.item_id);
            const freeItem = updatedCart.find((item) => item.id === offer.free_item_id && item.type === 'offer');

            if (offerItem && offerItem.quantity >= offer.qty) {
                if (!freeItem) {
                    console.log('adding free item');
                    // get the free item 
                    const freeItemOriginal = items.find((item) => item.id === offer.free_item_id);
                    // Add the free item
                    updatedCart.push({
                        id: offer.free_item_id,
                        type: 'offer',
                        name: `${freeItemOriginal?.name} (Offer Applied)`,
                        description: `Offer Applied: Buy ${offer.qty} ${offerItem.name} and get 1 ${freeItemOriginal?.name} free`,
                        rating: 0,
                        img: freeItemOriginal?.img || '',
                        price: '£0.00',
                        available: 0,
                        quantity: 1,
                    });
                } else {
                    console.log('free item already in cart');
                }
            } else if (freeItem) {
                console.log('removing free item');
                // Remove the free item if the conditions are no longer met
                updatedCart = updatedCart.filter((item) => {
                    return item.id !== offer.free_item_id || item.type !== 'offer';
                });
                console.log(updatedCart);
            }
        });

        return updatedCart;
    };


    const addToCart = (item: Item) => {
        const existingItem = cart.find((i) => i.id === item.id);
        let updatedCart: CartItem[] = [];

        if (existingItem) {
            updatedCart = cart.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            );
        } else {
            updatedCart = [...cart, { ...item, quantity: 1 }];
        }

        // Check for offers
        updatedCart = applyOffers(updatedCart);

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeFromCart = (itemId: number) => {
        let updatedCart = cart.filter((item) => item.id !== itemId);

        // Check for offers
        updatedCart = applyOffers(updatedCart);

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const updateCartItemQuantity = (itemId: number, quantity: number) => {
        let updatedCart = cart.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
        );

        // Check for offers
        updatedCart = applyOffers(updatedCart);

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };


    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <ItemContext.Provider
            value={{
                items: filteredItems,
                cart,
                addToCart,
                removeFromCart,
                updateCartItemQuantity,
                searchText,
                setSearchText,
                fetchItems,
                loading,
                selectedCategory

            }}
        >
            {children}
        </ItemContext.Provider>
    );
};