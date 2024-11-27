import { useContext } from "react"
import { Input } from "./ui/input"
import { Link } from "react-router-dom";
import { ItemContext } from "@/context/ItemContext";

const Header = () => {
    const { searchText, setSearchText, cart } = useContext(ItemContext);

    return (
        <div className="flex flex-col items-center justify-between w-full gap-5 pt-16 md:flex-row">
            <Link to={'/'} className="font-bold text-black">GROCERIES</Link>
            <div
                className="w-full max-w-[500px]"

            >
                <Input
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="h-12 shadow rounded-xl"
                />

            </div>
            <div className="flex flex-row gap-8">
                <div className="relative flex items-end ">
                    <img src="heart.png" alt="wishlist" className="w-6 h-6" />
                    <div className="absolute w-3 h-3 bg-red-400 rounded-full -top-1 -right-2 text-[8px] flex justify-center text-white">
                        8
                    </div>
                </div>
                <div className="flex items-end">
                    <img src="avatar.png" alt="avatar" className="w-8 h-8" />

                </div>
                <Link to={'/checkout'} className="relative flex items-end">
                    <img src="cart.png" alt="cart" className="w-6 h-6 cursor-pointer hover:scale-105" />
                    <div className="absolute w-3 h-3 bg-blue-400 rounded-full -top-1 -right-2 text-[8px] flex justify-center text-white">
                        {cart.length}
                    </div>
                </Link>

            </div>

        </div>
    )
}

export default Header