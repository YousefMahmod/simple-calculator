import {
  Button,
  HStack,
  Icon,
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { FaHistory } from "react-icons/fa";

import { GRID_BG_COLOR, NUMBER_BTN_COLOR } from "../constants";
import useOperationStore from "../operation/store";

function HistoryOperations() {
  const operationList = useOperationStore((s) => s.operationList);
  const setOperation = useOperationStore((s) => s.setOperation);
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button bg="none" _hover={{ backgroundColor: "none" }}>
          <Icon as={FaHistory} />
        </Button>
      </PopoverTrigger>
      <PopoverContent bg={GRID_BG_COLOR} maxHeight={200} overflow="auto">
        <PopoverArrow bg={GRID_BG_COLOR} />
        <PopoverBody color={NUMBER_BTN_COLOR}>
          {!operationList.length && (
            <Text> Your calculations and results appear here</Text>
          )}
          <List>
            {operationList.map((operation, index) => (
              <ListItem key={index}>
                <HStack mb={1}>
                  <Button
                    _hover={{ backgroundColor: "none" }}
                    color={NUMBER_BTN_COLOR}
                    variant="outline"
                    onClick={() => setOperation(operation.input)}
                  >
                    {operation.input}
                  </Button>
                  <Text>=</Text>
                  <Button
                    _hover={{ backgroundColor: "none" }}
                    color={NUMBER_BTN_COLOR}
                    variant="outline"
                    onClick={() => setOperation(operation.result)}
                  >
                    {operation.result}
                  </Button>
                </HStack>
              </ListItem>
            ))}
          </List>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default HistoryOperations;
