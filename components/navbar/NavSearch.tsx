"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";

function NavSearch() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search")?.toString() || "");

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams)
    if(value){
      params.set("search", value)
    }else{
      params.delete("search")
    }
    replace(`/products?${params.toString()}`)
  }, 500);

  useEffect(()=>{
    if(!searchParams.get("search")){
      setSearch("")
    }
  },[searchParams.get("search")])

  return (
    <Input
      type="search"
      className="max-w-xs dark:bg-muted"
      placeholder="search product..."
      value={search}
      onChange={(e)=>{
        setSearch(e.target.value)
        handleSearch(e.target.value)
      }}
    />
  );
}

export default NavSearch;
