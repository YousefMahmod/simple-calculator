import { useEffect } from "react";
import { Button, Grid } from "@chakra-ui/react";
import {
  FONT_SIZE_BTN,
  GRID_BG_COLOR,
  NUMBER_BTN_COLOR,
  OPERATION_BTN_COLOR,
} from "../constants";
import useOperationStore from "../operation/store";

const calculatorBtns = [
  {
    text: "(",
    color: OPERATION_BTN_COLOR,
    fontSize: FONT_SIZE_BTN,
    gridNumber: 1,
  },
  {
    text: ")",
    color: OPERATION_BTN_COLOR,
    fontSize: FONT_SIZE_BTN,
    gridNumber: 2,
  },
  {
    text: "C",
    color: OPERATION_BTN_COLOR,
    fontSize: FONT_SIZE_BTN,
    gridNumber: 3,
  },
  {
    text: "x",
    color: OPERATION_BTN_COLOR,
    fontSize: FONT_SIZE_BTN,
    gridNumber: 4,
  },
  {
    text: "7",
    color: NUMBER_BTN_COLOR,
    fontSize: FONT_SIZE_BTN,
    gridNumber: 1,
  },
  {
    text: "8",
    color: NUMBER_BTN_COLOR,
    fontSize: FONT_SIZE_BTN,
    gridNumber: 2,
  },
  {
    text: "9",
    color: NUMBER_BTN_COLOR,
    fontSize: FONT_SIZE_BTN,
    gridNumber: 3,
  },
  {
    text: "*",
    color: OPERATION_BTN_COLOR,
    fontSize: FONT_SIZE_BTN,
    gridNumber: 4,
  },
  {
    text: "4",
    color: NUMBER_BTN_COLOR,
    fontSize: FONT_SIZE_BTN,
    gridNumber: 1,
  },
  {
    text: "5",
    color: NUMBER_BTN_COLOR,
    fontSize: FONT_SIZE_BTN,
    gridNumber: 2,
  },
  {
    text: "6",
    color: NUMBER_BTN_COLOR,
    fontSize: FONT_SIZE_BTN,
    gridNumber: 3,
  },
  {
    text: "/",
    color: OPERATION_BTN_COLOR,
    fontSize: FONT_SIZE_BTN,
    gridNumber: 4,
  },
  {
    text: "1",
    color: NUMBER_BTN_COLOR,
    fontSize: FONT_SIZE_BTN,
    gridNumber: 1,
  },
  {
    text: "2",
    color: NUMBER_BTN_COLOR,
    fontSize: FONT_SIZE_BTN,
    gridNumber: 2,
  },
  {
    text: "3",
    color: NUMBER_BTN_COLOR,
    fontSize: FONT_SIZE_BTN,
    gridNumber: 3,
  },
  {
    text: "-",
    color: OPERATION_BTN_COLOR,
    fontSize: FONT_SIZE_BTN,
    gridNumber: 4,
  },
  { text: "", color: "", fontSize: "", gridNumber: 1 },
  {
    text: "0",
    color: NUMBER_BTN_COLOR,
    fontSize: FONT_SIZE_BTN,
    gridNumber: 2,
  },
  {
    text: "=",
    color: OPERATION_BTN_COLOR,
    fontSize: FONT_SIZE_BTN,
    gridNumber: 3,
  },
  {
    text: "+",
    color: OPERATION_BTN_COLOR,
    fontSize: FONT_SIZE_BTN,
    gridNumber: 4,
  },
];

const ButtonGrid = () => {
  const clearInput = useOperationStore((s) => s.clearInput);
  const backspace = useOperationStore((s) => s.backspace);
  const handleButtonClicked = useOperationStore((s) => s.handleButtonClicked);
  const calcResult = useOperationStore((s) => s.calcResult);
  const chooseSuitableFunction = (text: string, value: string) => {
    switch (text) {
      case "C":
        return clearInput();
      case "x":
        return backspace();
      case "=":
        return calcResult();
      default:
        return handleButtonClicked(value);
    }
  };
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        calcResult();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      gap={3}
      bg={GRID_BG_COLOR}
      p={3}
      borderRadius="xl"
    >
      {calculatorBtns.map((btn) => (
        <Button
          key={btn.text}
          variant="ghost"
          gridColumn={btn.gridNumber}
          color={btn.color}
          fontSize={btn.fontSize}
          _hover={{ backgroundColor: "none" }}
          onClick={() => chooseSuitableFunction(btn.text, btn.text)}
        >
          {btn.text}
        </Button>
      ))}
    </Grid>
  );
};

export default ButtonGrid;
