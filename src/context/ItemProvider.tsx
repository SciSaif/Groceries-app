import React, { useState, useEffect } from 'react';
import { ItemContext } from './ItemContext';

const OFFERS = [
    { item_id: "642", qty: 6, free_item_id: "642" }, // Buy 6 Coca-Cola, get 1 free
    { item_id: "532", qty: 3, free_item_id: "641" }, // Buy 3 croissants, get a coffee
];


export type Item = {
    id: string;
    type: string;
    name: string;
    description: string;
    rating: number;
    img: string;
    price: number;
    available: number;
}

export type ItemFromAPI = Omit<Item, "price" | "id"> & {
    price: string;
    id: number;
};



export interface CartItem extends Item {
    quantity: number;
    isOfferItem?: boolean;
    offerDescription?: string;
}




export const ItemProvider = ({ children }: {
    children:
    React.ReactNode
}) => {
    const [items, setItems] = useState<Item[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [favorites, setFavorites] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const cartFromStorage = localStorage.getItem('cart');
        if (cartFromStorage) {
            setCart(JSON.parse(cartFromStorage));
        }
    }, []);

    useEffect(() => {
        const cartFromStorage = localStorage.getItem('cart');
        const favoritesFromStorage = localStorage.getItem('favorites');
        if (cartFromStorage) {
            setCart(JSON.parse(cartFromStorage));
        }
        if (favoritesFromStorage) {
            setFavorites(JSON.parse(favoritesFromStorage));
        }
    }, []);

    const fetchItems = async (category: string) => {
        setSelectedCategory(category);
        setLoading(true);
        const response = await fetch(`https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=${category}`);
        const data: ItemFromAPI[] = await response.json();
        setItems(data.map((item) => ({ ...item, id: item.id.toString(), price: parseFloat(item.price.replace('£', '')) })))
        setLoading(false);
    };

    const applyOffers = (cartItems: CartItem[]): CartItem[] => {
        let updatedCart = [...cartItems];

        OFFERS.forEach((offer) => {
            // append "offer_item" to the free item id differentiate it from the original item
            const freeItemId = offer.free_item_id + "offer_item";
            const offerItem = updatedCart.find((item) => item.id === offer.item_id);
            const freeItem = updatedCart.find((item) => item.id === freeItemId && item.isOfferItem);

            if (offerItem && offerItem.quantity >= offer.qty) {
                if (!freeItem) {
                    console.log('adding free item');
                    // get the free item 
                    const freeItemOriginal = items.find((item) => item.id === offer.free_item_id);
                    if (!freeItemOriginal) return

                    // Add the free item
                    updatedCart.push({
                        ...freeItemOriginal,
                        id: freeItemId, // add 1234 to make the id different from the original item
                        offerDescription: `Buy ${offer.qty} ${offerItem.name} and get 1 ${freeItemOriginal?.name} free`,
                        price: 0, // Free item
                        quantity: Math.floor(offerItem.quantity / offer.qty), // Add the free item as many times as the offer is met
                        isOfferItem: true,
                    });
                } else {
                    console.log('updating free item');
                    // Free Item already in cart, update the quantity of the free item
                    updatedCart = updatedCart.map((item) =>
                        item.id === freeItemId
                            ? { ...item, quantity: Math.floor(offerItem.quantity / offer.qty) }
                            : item
                    );
                }
            } else if (freeItem) {
                console.log('removing free item');
                // Remove the free item if the conditions are no longer met
                updatedCart = updatedCart.filter((item) => {
                    return item.id !== freeItemId || !item.isOfferItem;
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

    const removeFromCart = (itemId: string) => {
        let updatedCart = cart.filter((item) => item.id !== itemId);

        // Check for offers
        updatedCart = applyOffers(updatedCart);

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const updateCartItemQuantity = (itemId: string, quantity: number) => {
        let updatedCart = cart.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
        );

        // if quantity is 0, remove the item from the cart
        if (quantity === 0) {
            updatedCart = updatedCart.filter((item) => item.id !== itemId);
        }

        // Check for offers
        updatedCart = applyOffers(updatedCart);

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };


    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const addToFavorites = (item: Item) => {
        if (!favorites.find((fav) => fav.id === item.id)) {
            const updatedFavorites = [...favorites, item];
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        }
    };

    const removeFromFavorites = (itemId: string) => {
        const updatedFavorites = favorites.filter((fav) => fav.id !== itemId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

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
                selectedCategory,
                favorites,
                addToFavorites,
                removeFromFavorites

            }}
        >
            {children}
        </ItemContext.Provider>
    );
};