import { useQuery } from "@tanstack/react-query";

interface IOption {
  id: number;
  name: string;
}

interface IGroup {
  id: number;
  name: string;
  options: IOption[];
}

interface IProductSelection {
  id: number;
  title: string;
  price: number;
  groups: IGroup[];
}

const useProductSelectionQuery = (productId: number) => {
  return useQuery<IProductSelection>({
    queryKey: ["productSelection", productId],
    queryFn: () =>
      fetch(`/api/product/${productId}/selection`).then((res) => res.json()),
  });
};

export default useProductSelectionQuery;
