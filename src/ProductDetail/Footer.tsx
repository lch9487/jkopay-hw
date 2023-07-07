import { Flex, Button, Box, Text } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { FC } from "react";
import { MOBILE_WIDTH } from "../constants";
// import useCartQuantityQuery from "./effects/useCartQuantityQuery";

interface Props {
  onOpen: () => void;
}

const Footer: FC<Props> = ({ onOpen }) => {
  // FIXME: Temporarily not using this function.
  // Because there is a mock service worker bug.
  // https://github.com/mswjs/msw/issues/1640
  // const { data } = useCartQuantityQuery();

  return (
    <Flex
      position="sticky"
      bottom="0"
      left="0"
      // Because this is simulated mobile version,
      // in reality, we can use right="0" instead of width.
      width={MOBILE_WIDTH}
      align="center"
      justify="space-around"
      p="2"
      zIndex="1"
      backgroundColor="black"
    >
      <Box position="relative">
        <CalendarIcon color="white" boxSize="6" />
        <Text
          as="span"
          position="absolute"
          top="-5px"
          right="-10px"
          color="white"
          backgroundColor="red"
          paddingLeft="5px"
          paddingRight="6px"
          paddingTop="0"
          paddingBottom="0"
          borderRadius="50%"
          fontSize="12px"
        >
          {/* {data?.quantity ?? 0} */}1
        </Text>
      </Box>
      <Button onClick={onOpen}>加入購物車</Button>
      <Button backgroundColor="red">直接購買</Button>
    </Flex>
  );
};

export default Footer;
