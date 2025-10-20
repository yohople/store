"use client";
import { Button } from "@/components/ui/button";
import { adminLinks } from "@/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathName = usePathname();
  return (
    <aside>
      {adminLinks.map((link) => {
        const isActive = pathName === link.href;
        const variant = isActive ? "default" : "ghost";
        return (
          <Button
            key={link.href}
            className="w-full mb-2 capitalize font-normal justify-start"
            variant={variant}
          >
            <Link href={link.href}>{link.label}</Link>
          </Button>
        );
      })}
    </aside>
  );
}

export default Sidebar;
