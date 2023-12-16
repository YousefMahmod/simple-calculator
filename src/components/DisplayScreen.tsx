import { Input, Text } from "@chakra-ui/react";
import { OPERATION_BTN_COLOR } from "../constants";
import useOperationStore from "../operation/store";
import HistoryOperations from "./HistoryOperations";

function DisplayScreen() {
  const input = useOperationStore((s) => s.operation.input);
  const result = useOperationStore((s) => s.operation.result);
  const error = useOperationStore((s) => s.error);
  const changeInput = useOperationStore((s) => s.changeInput);

  return (
    <>
      <HistoryOperations />
      {result && (
        <Text fontSize="1xl" color={OPERATION_BTN_COLOR} textAlign="right">
          {result}
        </Text>
      )}

      <Input
        value={input}
        _focus={{ outline: "none" }}
        textAlign="right"
        border="none"
        outline="none"
        color="#2d2c29"
        type="text"
        isInvalid={error ? true : false}
        cursor="default"
        padding="0"
        fontSize={"3xl"}
        onChange={(event) => changeInput(event.target.value)}
      />
      {error && (
        <Text mt={1} color="red">
          {error}
        </Text>
      )}
    </>
  );
}

export default DisplayScreen;
