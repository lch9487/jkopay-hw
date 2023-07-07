import {
  Flex,
  Box,
  Image,
  Text,
  Stack,
  UnorderedList,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import useProductDetailQuery from "./effects/useProductDetailQuery";
import { DEFAULT_TEXT_HOLDER } from "../constants";
import { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SelectionModal from "./SelectionModal";

const ProductDetailPage = () => {
  // Hardcode product id.
  const { isLoading, data } = useProductDetailQuery(1);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading || !data) return null;

  return (
    <>
      <Flex direction="column" backgroundColor="black">
        <Header />

        {/* Product details */}
        <Flex direction="column" align="center" justify="center" mb="4">
          <Image
            src="https://demo.sirv.com/bag.jpg"
            alt="Product"
            width="100%"
            height="400px"
            objectFit="cover"
          />

          <Box flex="1" p="4" backgroundColor="gray.700" mb="2" width="100%">
            <Text fontSize="lg" fontWeight="bold" color="white">
              {data.title || DEFAULT_TEXT_HOLDER}
            </Text>
            <Stack direction="row">
              <Text color="white" mb="2">
                {`$${data.lowPrice || DEFAULT_TEXT_HOLDER} - $${
                  data.highPrice || DEFAULT_TEXT_HOLDER
                }`}
              </Text>
              <Text
                fontSize="sm"
                color="gray"
                mb="2"
                textDecoration="line-through"
              >
                {`$${data.originalLowPrice || DEFAULT_TEXT_HOLDER} - $${
                  data.originalHighPrice || DEFAULT_TEXT_HOLDER
                }`}
              </Text>
            </Stack>
            {data.events.length > 0 && (
              <Stack direction="row">
                {data.events.map((event) => (
                  <Text
                    key={event}
                    fontSize="sm"
                    color="white"
                    backgroundColor="red.700"
                  >
                    {event}
                  </Text>
                ))}
              </Stack>
            )}

            {data.descriptions.length > 0 && (
              <UnorderedList fontSize="sm" color="white" mt="2">
                {data.descriptions.map((description) => (
                  <ListItem key={description}>{description}</ListItem>
                ))}
              </UnorderedList>
            )}
          </Box>

          {data.details.length > 0 && (
            <Box flex="1" p="4" width="100%" backgroundColor="gray.700" mb="2">
              {data.details.map(({ title, description }, index) => (
                <Fragment key={`${description}-${index}`}>
                  <Text fontSize="sm" color="gray">
                    {title}
                  </Text>
                  <Text fontSize="sm" color="white" mb="4">
                    {description}
                  </Text>
                </Fragment>
              ))}
            </Box>
          )}
        </Flex>

        <Footer onOpen={onOpen} />
      </Flex>

      <SelectionModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ProductDetailPage;
