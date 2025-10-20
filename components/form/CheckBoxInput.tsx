"use client"
import React from "react";
import { Checkbox } from "../ui/checkbox";

type CheckboxInputProps = {
  name: string;
  label: string;
  defaultChecked?: boolean;
};

function CheckBoxInput({ name, label, defaultChecked=false }: CheckboxInputProps) {
  return (
    <div className="mb-2">
      <Checkbox id={name} name={name} defaultChecked={defaultChecked} />
      <label
        htmlFor={name}
        className="text-sm leading-none capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}

export default CheckBoxInput;
