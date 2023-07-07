import {
  Flex,
  Box,
  Button,
  IconButton,
  Image,
  Text,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { FC, Fragment, useState } from "react";
import useProductSelectionQuery from "./effects/useProductSelectionQuery";
import { DEFAULT_TEXT_HOLDER } from "../constants";
import useCartMutation from "./effects/useCartMutation";
// import { useQueryClient } from "@tanstack/react-query";

// Hardcode product id which can get from router.
const productId = 1;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SelectionModal: FC<Props> = ({ isOpen, onClose }) => {
  const { isLoading, data } = useProductSelectionQuery(productId);
  const { mutate } = useCartMutation();
  const toast = useToast();
  // const queryClient = useQueryClient();

  const [selection, setSelection] = useState<number[]>([]);
  const [quantity, setQuantity] = useState(1);

  const handleOptionClick = (groupIndex: number, optionIndex: number) => {
    const clone: number[] = [...selection];

    clone[groupIndex] = optionIndex;

    setSelection(clone);
  };

  const handleSubmit = () => {
    const payloadSelection = selection.map((optionIndex, groupIndex) => ({
      groupId: data?.groups[groupIndex].id ?? -1,
      optionId: data?.groups[groupIndex].options[optionIndex].id ?? -1,
    }));

    mutate(
      { productId, selection: payloadSelection, quantity },
      {
        onSuccess: () => {
          toast({
            title: "已加入購物車",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          // FIXME: Temporarily ignore this invalidation.
          // Because there is a mock service worker bug.
          // https://github.com/mswjs/msw/issues/1640
          // queryClient.invalidateQueries({ queryKey: ["cartQuantity"] });
          onClose();
        },
      }
    );
  };

  if (isLoading || !data) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent
        position="absolute"
        left="0"
        bottom="0"
        maxWidth="415px"
        mb="0"
        backgroundColor="blackAlpha.600"
      >
        <ModalHeader backgroundColor="gray.700">
          <Stack direction="row">
            <Image
              src="https://demo.sirv.com/bag.jpg"
              alt="Product"
              width="70px"
              height="70px"
              objectFit="cover"
            />
            <Box>
              <Text fontSize="sm" color="white">
                {data.title || DEFAULT_TEXT_HOLDER}
              </Text>
              <Text fontSize="md" color="white">
                {`$${data.price || DEFAULT_TEXT_HOLDER}`}
              </Text>
            </Box>
          </Stack>
        </ModalHeader>

        <ModalCloseButton marginRight="-8px" color="gray" />

        <Flex
          direction="column"
          p="4"
          paddingTop="0"
          backgroundColor="gray.700"
          mb="1"
        >
          {data.groups.map(({ name, options }, groupIndex) => (
            <Fragment key={name}>
              <Stack direction="row" mb="2">
                <Text color="white">{name}</Text>
                <Text fontSize="sm" color="gray">
                  補充說明
                </Text>
              </Stack>
              <Stack direction="row">
                {options.map(({ name }, optionIndex) => (
                  <Text
                    key={name}
                    fontSize="sm"
                    color="white"
                    border="solid 1px gray"
                    p={1}
                    minW="28px"
                    minH="28px"
                    justifyContent="center"
                    align="center"
                    {...(selection[groupIndex] === optionIndex
                      ? { backgroundColor: "red.700" }
                      : {})}
                    onClick={() => handleOptionClick(groupIndex, optionIndex)}
                  >
                    {name}
                  </Text>
                ))}
              </Stack>
            </Fragment>
          ))}
        </Flex>

        <Flex
          justifyContent="space-between"
          alignItems="center"
          p="4"
          backgroundColor="gray.700"
        >
          <Text color="white">購買數量</Text>
          <Flex direction="row" justifyContent="center" alignItems="center">
            <IconButton
              icon={<MinusIcon />}
              aria-label="subtract one"
              size="xs"
              onClick={() =>
                setQuantity((prev) => {
                  if (quantity > 1) return prev - 1;
                  return prev;
                })
              }
            />
            <Text color="white" ml="2" mr="2">
              {quantity}
            </Text>
            <IconButton
              icon={<AddIcon />}
              aria-label="add one"
              size="xs"
              onClick={() => setQuantity((prev) => prev + 1)}
            />
          </Flex>
        </Flex>

        <ModalFooter>
          <Button backgroundColor="red" w="100%" onClick={handleSubmit}>
            加入購物車
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SelectionModal;
