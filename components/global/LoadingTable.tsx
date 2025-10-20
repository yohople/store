import React from "react";
import { Skeleton } from "../ui/skeleton";

function LoadingTable({ rows = 5 }: { rows?: number }) {
  const tableRows = Array.from({ length: rows }, (_, i) => {
    console.log(_);
    
    return (
      <div className="mb-4" key={i}>
        <Skeleton className="h-8 w-full rounded" />
      </div>
    );
  });
  return <>{tableRows}</>;
}

export default LoadingTable;
