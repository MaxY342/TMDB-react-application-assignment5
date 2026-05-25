import { useNavigate } from "react-router-dom";
import { ImageGrid, ImageOverlay } from "@/components";
import { cartAction, type ImageCell } from "@/core";
import { useUserContext } from "@/hooks";

export const CartView = () => {
  const navigate = useNavigate();
  const { cart, toggleCart } = useUserContext();

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="font-bold text-3xl">Cart</h1>
      {cart.size === 0 ? (
        <p className="mt-10 text-gray-400">Your cart is empty.</p>
      ) : (
        <ImageGrid images={Array.from(cart.values())} onClick={(image) => navigate(`/movie/${image.id}/credits`)}>
          {(image) => <ImageOverlay actions={[cartAction((image: ImageCell) => cart.has(image.id), toggleCart)]} image={image} />}
        </ImageGrid>
      )}
    </section>
  );
};
