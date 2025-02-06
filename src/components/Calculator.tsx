import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [operation, setOperation] = useState<string | null>(null);
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    if (firstNumber === null) {
      setFirstNumber(current);
    } else if (operation) {
      const result = calculate(firstNumber, current, operation);
      setFirstNumber(result);
      setDisplay(String(result));
    }
    setNewNumber(true);
    setOperation(op);
  };

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "×":
        return first * second;
      case "÷":
        return first / second;
      default:
        return second;
    }
  };

  const handleEqual = () => {
    if (firstNumber === null || operation === null) return;
    const secondNumber = parseFloat(display);
    const result = calculate(firstNumber, secondNumber, operation);
    setDisplay(String(result));
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  return (
    <div className="glass-panel rounded-xl p-4 w-full max-w-xs">
      <div className="bg-white/50 rounded-lg p-4 mb-4 text-right text-2xl font-mono">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "0", ".", "=", "+"].map(
          (btn) => (
            <Button
              key={btn}
              className="calculator-button"
              onClick={() => {
                if ("0123456789.".includes(btn)) {
                  handleNumber(btn);
                } else if ("+-×÷".includes(btn)) {
                  handleOperation(btn);
                } else if (btn === "=") {
                  handleEqual();
                }
              }}
            >
              {btn}
            </Button>
          )
        )}
        <Button
          className="calculator-button col-span-4 bg-moonlight text-white"
          onClick={handleClear}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}