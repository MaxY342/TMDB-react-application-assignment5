import { useNavigate } from "react-router-dom";
import { ImageOverlay } from "@/components";
import { cartAction, type ImageCell } from "@/core";
import { useUserContext } from "@/hooks";

export const CartView = () => {
  const _navigate = useNavigate();
  const { cart, toggleCart } = useUserContext();

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="font-bold text-3xl">Cart</h1>
      {cart.size === 0 ? (
        <p className="mt-10 text-gray-400">Your cart is empty.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead className="border-gray-700 border-b">
            <tr>
              <th className="text-left text-gray-400">Item</th>
              <th className="text-left text-gray-400">Type</th>
              <th className="text-left text-gray-400">Price</th>
              <th className="text-left text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(cart.values()).map((image) => (
              <tr key={image.id}>
                <td className="flex items-center gap-4 py-4">
                  <img alt={image.primaryText} src={image.imageUrl} />
                  <p>{image.primaryText}</p>
                </td>
                <td>
                  <p>{image.mediaType}</p>
                </td>
                <td>
                  <p>{image.secondaryText}</p>
                </td>
                <td>
                  <ImageOverlay actions={[cartAction((image: ImageCell) => cart.has(image.id), toggleCart)]} image={image} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};
