import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

export interface Operation {
  input: string;
  result: string;
}
interface OperationStore {
  operation: Operation;
  error: string;
  operationList: Operation[];
  changeInput: (value: string) => void;
  handleButtonClicked: (value: string) => void;
  setOperation: (value: string) => void;
  clearInput: () => void;
  backspace: () => void;
  calcResult: () => void;
}

const calculatePreviousResult = (result: string) => {
  let previousResult = "0";
  if (result && result.includes("Ans")) {
    previousResult = result.split("=")[1].trim();
  } else if (result) {
    previousResult = eval(result.slice(0, -1)).toString();
  }
  return previousResult;
};

const changeValue = (operation: Operation, currentInput: string) => {
  const input = operation.input;
  const result = operation.result;
  const previousResult = calculatePreviousResult(result);

  if (result && !result.includes("Ans")) {
    operation.result = "Ans = " + eval(result.slice(0, -1)); // remove (=) ex: 5*5 =
  }
  if (previousResult == input && currentInput.length < input.length) {
    operation.input = "0";
    return operation;
  }
  if (input.length < currentInput.length) {
    let currentInputChar = currentInput[currentInput.length - 1];
    if (input == "0") {
      currentInputChar = currentInput[0];
    }
    const regex = /[0-9]|\*|\/|\+|-|\(|\)/;
    if (!regex.test(currentInputChar)) {
      return operation;
    }
    const inputAfterResult = /\*|\/|\+|-/;
    if (previousResult == input && !inputAfterResult.test(currentInputChar)) {
      operation.input = currentInputChar;
      return operation;
    }
  }
  if (currentInput == "0" || currentInput == "") {
    operation.input = "0";
    return operation;
  }
  if (input == "0") {
    operation.input = currentInput.slice(0, -1);
    return operation;
  }
  operation.input = currentInput;
  return operation;
};
const backspace = (operation: Operation) => {
  const input = operation.input;
  const result = operation.result;
  const previousResult = calculatePreviousResult(result);

  if (input.length == 1 || input == previousResult) {
    if (result && !result.includes("Ans")) {
      operation.result = "Ans = " + eval(result.slice(0, -1)).toString();
    }
    operation.input = "0";
    return operation;
  }
  operation.input = input.slice(0, -1);
  return operation;
};

const clearInput = (operation: Operation) => {
  const result = operation.result;
  operation.input = "0";
  if (result && !result.includes("Ans")) {
    operation.result = "Ans = " + eval(result.slice(0, -1)).toString();
  }
  return operation;
};

const calculateResult = (operation: Operation, operationList: Operation[]) => {
  const input = operation.input;
  const newState = { ...operation, error: "", operationList };
  try {
    if (input.includes(".")) {
      newState.error = "Accept only integer numbers";
      return newState;
    }
    const output = eval(input).toString();
    const newOperationList: Operation[] = [
      { input, result: output },
      ...operationList,
    ];
    newState.operationList = newOperationList;
    newState.result = input + " =";
    newState.input = output;
    return newState;
  } catch (error) {
    newState.error = "Invalid Expression";
    return newState;
  }
};

const changeValueOnButtonClicked = (
  operation: Operation,
  currentInput: string
) => {
  const input = operation.input;
  const result = operation.result;
  const previousResult = calculatePreviousResult(result);
  const regex = /\*|\/|\+|-/;
  if (result && !result.includes("Ans")) {
    operation.result = "Ans = " + eval(result.slice(0, -1)).toString();
  }
  if (input == "0" || (previousResult == input && !regex.test(currentInput))) {
    operation.input = currentInput;
    return operation;
  }

  operation.input = input + currentInput;
  return operation;
};

const useOperationStore = create<OperationStore>((set) => ({
  operation: { input: "0", result: "" },
  operationList: [],
  error: "",
  changeInput: (value: string) => {
    set((store) => {
      const newState = changeValue(store.operation, value);
      return { error: "", operation: newState };
    });
  },
  handleButtonClicked: (value: string) => {
    set(({ operation }) => {
      const newState = changeValueOnButtonClicked(operation, value);
      return { operation: newState, error: "" };
    });
  },
  setOperation: (value: string) => {
    set(({ operation }) => {
      const result = operation.result;
      if (result && !result.includes("Ans")) {
        operation.result = "Ans = " + eval(result.slice(0, -1)).toString();
      }
      operation.input = value;
      return { operation, error: "" };
    });
  },
  clearInput: () => {
    set((store) => {
      const newState = clearInput(store.operation);
      return { error: "", operation: newState };
    });
  },
  backspace: () => {
    set((store) => {
      const newState = backspace(store.operation);
      return { error: "", operation: newState };
    });
  },
  calcResult: () => {
    set(({ operation, operationList }) => {
      const newState = calculateResult(operation, operationList);
      return {
        operationList: newState.operationList,
        operation: { input: newState.input, result: newState.result },
        error: newState.error,
      };
    });
  },
}));

export default useOperationStore;

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Operation Store", useOperationStore);
}
