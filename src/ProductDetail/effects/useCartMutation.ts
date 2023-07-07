import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface ICartItem {
  productId: number;
  selection: { groupId: number; optionId: number }[];
  quantity: number;
}

const useCartMutation = () =>
  useMutation({
    mutationFn: (cartItem: ICartItem) => {
      return axios.post("/api/cart", cartItem);
    },
  });

export default useCartMutation;
