import CategorySelector from '@/components/CategorySelector';
import ItemCard from '@/components/ItemCard';
import Loader from '@/components/Loader';
import { ItemContext } from '@/context/ItemContext';
import React, { useContext, useEffect } from 'react';

const Home: React.FC = () => {
    const { items, fetchItems, loading } = useContext(ItemContext);

    useEffect(() => {
        fetchItems('all');
    }, []);

    return (
        <div className="pt-5 pb-20" >
            <CategorySelector />
            <h1 className="mt-10 text-xl font-semibold text-zinc-700">Trending Items</h1>

            {
                loading ? <div className='flex justify-center w-full mt-10'><Loader /></div> :

                    <div className="flex flex-wrap gap-10">

                        {items.map((item) => (
                            <ItemCard key={item.id} item={item} />
                        ))}
                    </div>
            }
        </div>
    );
};

export default Home;