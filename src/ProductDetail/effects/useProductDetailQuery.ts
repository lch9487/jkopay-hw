import { useQuery } from "@tanstack/react-query";

interface IProductDetail {
  id: number;
  title: string;
  lowPrice: number;
  highPrice: number;
  originalLowPrice: number;
  originalHighPrice: number;
  events: string[];
  descriptions: string[];
  details: { title: string; description: string }[];
}

const useProductDetailQuery = (productId: number) => {
  return useQuery<IProductDetail>({
    queryKey: ["productDetail", productId],
    queryFn: () => fetch(`/api/product/${productId}`).then((res) => res.json()),
  });
};

export default useProductDetailQuery;
