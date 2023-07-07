import { useQuery } from "@tanstack/react-query";

const useCartQuantityQuery = () => {
  return useQuery<{ quantity: number }>({
    queryKey: ["cartQuantity"],
    queryFn: () => fetch(`/api/cart/quantity`).then((res) => res.json()),
  });
};

export default useCartQuantityQuery;
