"use client"
import React from "react";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { CiShare2 } from "react-icons/ci";
import {EmailIcon, EmailShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton} from "react-share"

function ShareButton({ productId, name }: { productId: string; name: string }) {
  const shareLink = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/products/${productId}`;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="p-2">
          <CiShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        sideOffset={10}
        className="flex gap-x-2 items-center justify-center w-full"
        align="end"
      >
        <TwitterShareButton url={shareLink} title={name}>
          <TwitterIcon size={32} round/>
        </TwitterShareButton>
        <LinkedinShareButton url={shareLink} title={name}>
          <LinkedinIcon size={32} round/>
        </LinkedinShareButton>
        <EmailShareButton url={shareLink} title={name}>
          <EmailIcon size={32} round/>
        </EmailShareButton>
      </PopoverContent>
    </Popover>
  );
}

export default ShareButton;
