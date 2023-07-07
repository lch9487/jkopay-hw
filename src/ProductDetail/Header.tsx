import { Flex, Box } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { MOBILE_WIDTH } from "../constants";

const Header = () => (
  <Flex
    position="sticky"
    top="0"
    left="0"
    // Because this is simulated mobile version,
    // in reality, we can use right="0" instead of width.
    width={MOBILE_WIDTH}
    align="center"
    justify="space-between"
    p="2"
    zIndex="1"
    backgroundColor="black"
  >
    <ChevronLeftIcon color="white" boxSize={6} />
    <Box fontSize="lg" fontWeight="bold" color="white">
      街口工程獅官方商城
    </Box>
    <Box />
  </Flex>
);

export default Header;
