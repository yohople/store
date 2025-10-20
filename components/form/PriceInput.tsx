import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type PriceInputProps = {
  defaultValue?: number;
};

const name = "price";
function PriceInput({ defaultValue }: PriceInputProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        price ($)
      </Label>
      <Input
        type="number"
        id={name}
        name={name}
        defaultValue={defaultValue || 100}
        required
        min={0}
      />
    </div>
  );
}

export default PriceInput;
