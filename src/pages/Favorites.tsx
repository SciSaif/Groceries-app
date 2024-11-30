import { useContext } from "react";
import { ItemContext } from "@/context/ItemContext";
import ItemCard from "@/components/ItemCard";

const Favorites = () => {
    const { favorites } = useContext(ItemContext);

    return (
        <div className="p-6 mt-5">
            <h1 className="mb-20 text-2xl font-semibold text-gray-700">Favorites</h1>

            <div className="flex flex-wrap w-full gap-10">

                {favorites.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
