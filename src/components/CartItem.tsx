import { CartItem as CartItemT } from "@/context/ItemProvider"
import { Button } from "./ui/button"
import { useContext } from "react"
import { MinusIcon, PlusIcon, XIcon } from "lucide-react"
import { ItemContext } from "@/context/ItemContext"

type CartItemProps = {
  item: CartItemT
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, updateCartItemQuantity } = useContext(ItemContext);

  if (item.type === 'offer') {
    return (
      <div className="flex items-center justify-between p-4 bg-yellow-100 shadow-lg rounded-xl">
        <div className="flex items-center gap-4">
          <img
            src={item.img || '/placeholder.jpg'}
            alt={item.name}
            className="object-cover w-16 h-16 rounded-lg"
          />
          <div>
            <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      key={item.id}
      className="flex flex-col items-center justify-between gap-5 p-4 bg-white shadow-lg md:flex-row rounded-xl"
    >

      <div className="flex items-center gap-4">
        <img
          src={item.img}
          alt={item.name}
          className="object-cover w-16 h-16 rounded-lg"
        />
        <div>
          <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-500">Product code: {item.id}</p>
        </div>
      </div>

      <div className='flex flex-col items-center justify-between w-1/2 gap-5 md:items-start md:flex-row'>


        <div className='flex flex-col gap-2'>

          <div className="flex items-center gap-4">
            <Button
              className="px-1 py-0 text-lg text-white bg-red-400 rounded-lg h-7 hover:bg-red-500"
              disabled={item.quantity <= 1}
              onClick={() => updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))}
            >
              <MinusIcon size={24} />
            </Button>
            <span className="text-lg font-medium text-gray-700">{item.quantity}</span>
            <Button
              className="px-1 py-0 text-lg text-white bg-green-400 rounded-lg h-7 hover:bg-green-500"
              disabled={item.quantity >= item.available}
              onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
            >
              <PlusIcon size={20} />
            </Button>

          </div>
          <div>
            {item.available < 10 && (
              <span className={"px-4 py-1 text-xs bg-orange-300 text-white  rounded-full w-fit"}>
                {item.available >= 10 ? 'Available' : `Only ${item.available} left`}
              </span>
            )}
          </div>
        </div>


        <div className="flex flex-row items-start gap-5">
          <p className="text-lg font-medium text-gray-800">£{(parseFloat(item.price.replace('£', '')) * item.quantity).toFixed(2)}</p>
          <Button

            className="h-5 px-1 py-1 text-sm text-white translate-y-1 bg-green-400 rounded-lg hover:bg-green-500 hover:underline"
            onClick={() => removeFromCart(item.id)}
          >
            <XIcon size={24} />
          </Button>
        </div>
      </div>

    </div>
  )
}

export default CartItem