import { Box } from "@chakra-ui/react";
import ButtonGrid from "./components/ButtonGrid";
import DisplayScreen from "./components/DisplayScreen";

function App() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      minHeight="100vh"
      bg="#b1d9e3"
    >
      <Box width={400} bgColor="white" mb={3} p={3} borderRadius="xl">
        <DisplayScreen />
      </Box>
      <Box width={400} borderRadius="xl">
        <ButtonGrid />
      </Box>
    </Box>
  );
}

export default App;
