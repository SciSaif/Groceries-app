import { ItemContext } from '@/context/ItemContext';
import { Item } from '@/context/ItemProvider';
import { cn } from '@/lib/utils';
import React, { useContext, useState } from 'react';

interface ItemCardProps {
    item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
    const { addToCart, cart, removeFromCart } = useContext(ItemContext);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const truncateDescription = (text: string, maxChars: number) => {
        if (text.length > maxChars) {
            return {
                truncated: text.slice(0, maxChars) + '...',
                isTruncated: true,
            };
        }
        return { truncated: text, isTruncated: false };
    };

    const { truncated, isTruncated } = truncateDescription(item.description, 90);

    const isInCart = cart.find((cartItem) => cartItem.id === item.id);

    return (
        <div className="flex flex-row bg-white rounded-lg shadow-lg min-h-[300px] max-w-[400px] px-2 gap-5 py-1">
            <img src={item.img} alt={item.name} className="object-contain w-1/2 rounded-t-lg " />
            <div className="flex flex-col justify-between w-full p-4">
                <div>
                    <h3 className="mb-2 font-medium">{item.name}</h3>
                    <p className="mb-2 text-sm text-gray-500">
                        {showFullDescription ? item.description : truncated}
                        {isTruncated && (
                            <span
                                className="underline cursor-pointer text-zinc-400 hover:text-zinc-500"
                                onClick={() => setShowFullDescription(!showFullDescription)}
                            >
                                {showFullDescription ? ' show less' : ' read more'}
                            </span>
                        )}
                    </p>
                </div>
                <div className='flex flex-col w-full gap-2'>
                    <span className={cn("px-4 py-1 text-xs text-white bg-green-400 rounded-full w-fit",
                        item.available < 10 && 'bg-orange-300'

                    )}>
                        {item.available >= 10 ? 'Available' : `Only ${item.available} left`}
                    </span>
                    <div className="flex items-center justify-between w-full mt-5">
                        <span className="font-bold">{item.price}</span>
                        <div className='flex flex-row gap-4 '>
                            {
                                isInCart ?
                                    <img src="cart.png" alt="cart" className='w-6 h-6 cursor-pointer hover:scale-105'
                                        onClick={() => removeFromCart(item.id)}
                                    /> :
                                    <img src="cart-unfilled.png" alt="cart" className='w-6 h-6 cursor-pointer hover:scale-105'
                                        onClick={() => addToCart(item)}
                                    />
                            }
                            <img src="heart.png" alt="heart"

                                className='w-6 h-6 cursor-pointer hover:scale-105' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;