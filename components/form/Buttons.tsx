"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { IoMdRefresh } from "react-icons/io";
import { FaRegHeart, FaRegEdit, FaHeart } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { SignInButton } from "@clerk/nextjs";

type btnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};

export function SubmitButton({
  className,
  text = "Submit",
  size = "lg",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className={cn("capitalize", className)}
      size={size}
      disabled={pending}
    >
      {pending ? (
        <>
          <IoMdRefresh className="animate-spin mr-2 h-4 w-4" />
          please wait ...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

type actionType = "edit" | "delete";

export function IconButton({ actionType }: { actionType: actionType }) {
  const { pending } = useFormStatus();
  const renderIcon = () => {
    switch (actionType) {
      case "edit":
        return <FaRegEdit className="h-4 w-4 text-border" />;
      case "delete":
        return <MdOutlineDeleteOutline className="h-4 w-4 text-border" />;
      default:
        const never: never = actionType;
        throw new Error(`invalid action type: ${never}`);
    }
  };
  return (
    <Button type="submit" size="icon">
      {pending ? (
        <IoMdRefresh className="animate-spin h-4 w-4" />
      ) : (
        renderIcon()
      )}
    </Button>
  );
}

export const CardSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button
        variant="outline"
        className="p-2 cursor-pointer"
        type="button"
        size="icon"
        asChild
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="icon"
      variant="outline"
      className="p-2 cursor-pointer"
    >
      {pending ? (
        <IoMdRefresh className="animate-spin h-4 w-4" />
      ) : isFavorite ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};

export const ProductSignInButton = ()=>{
  return <SignInButton mode="modal">
      <Button type="button" className="mt-8 capitalize">
        Sign in 
      </Button>
  </SignInButton>
}