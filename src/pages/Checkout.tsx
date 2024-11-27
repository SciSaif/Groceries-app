import CartItem from '@/components/CartItem';
import { ItemContext } from '@/context/ItemContext';
import { useContext, useEffect } from 'react';




const Checkout = () => {
    const { cart, fetchItems } = useContext(ItemContext);

    const calculateSubtotal = () => {
        return cart.reduce(
            (total, item) => total + parseFloat(item.price.replace('£', '')) * item.quantity,
            0
        );
    };
    useEffect(() => {
        fetchItems('all');
    }, []);

    return (
        <div className="p-6 mt-5">
            <h1 className="mb-20 text-2xl font-semibold text-gray-700">Checkout</h1>

            <div className="mt-6 space-y-4">
                {cart.filter((item) => !item.isOffer)?.map((item) => (
                    <CartItem key={item.id + item.name} item={item} />
                ))}

            </div>


            <div className="flex flex-col p-4 mt-8">
                <table className="w-full table-fixed">
                    <tbody>
                        <tr className="py-6 border-y">
                            <td className="w-auto py-4 pr-4 font-semibold text-right md:pr-16">Subtotal</td>
                            <td className="w-1/6 text-center text-gray-500">&pound;{calculateSubtotal().toFixed(2)}</td>
                            <td className="w-1/3 md:w-1/6"></td>
                        </tr>
                        <tr className="py-6 border-b">
                            <td className="w-auto py-4 pr-4 font-semibold text-right md:pr-16">Discount</td>
                            <td className="w-1/6 text-center text-gray-500">&pound;0.00</td>
                            <td className="w-1/6"></td>
                        </tr>
                        <tr className="py-6 border-b">
                            <td className="w-auto py-4 pr-4 font-semibold text-right md:pr-16">Total</td>
                            <td className="w-1/6 text-center text-gray-500">&pound;{calculateSubtotal().toFixed(2)}</td>
                            <td className="w-1/6">
                                <button
                                    className="w-full py-2 text-white bg-green-500 rounded hover:bg-green-600"
                                >
                                    Checkout
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default Checkout;