import { ChakraProvider, Box, useToast } from "@chakra-ui/react";
import ProductDetailPage from "./ProductDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MOBILE_WIDTH } from "./constants";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

export default function App() {
  const toast = useToast();
  const [, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true);
    }

    function offlineHandler() {
      setIsOnline(false);

      toast({
        title: "請確認是否有連上網路",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        {/* This is simulated mobile version. */}
        <Box maxWidth={MOBILE_WIDTH}>
          <ProductDetailPage />
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
