"use client";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { listOfProgrammingLanguagesWithLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Menu, PanelRight, PanelRightOpen } from "lucide-react";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const path_name = usePathname();
  const getLangPath = path_name.split("/")[1];
  console.log(getLangPath);

  useEffect(() => {
    setSidebarOpen(false);
  }, [path_name]);

  return (
    <aside
      className={`max-w-[300px] w-full border-r h-screen bg-zinc-900 shrink-0 main_sidebar sticky top-0  ${sidebarOpen ? "left-0! z-[999]" : "-left-[300px]!"}`}
    >
      <Button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        variant={"outline"}
        className="absolute -right-12 top-5 z-[999] backdrop-blur-lg hidden sidebar-button"
        size={"icon-lg"}
      >
        {sidebarOpen ? <PanelRightOpen /> : <PanelRight />}
      </Button>
      <div className="h-[60px] w-full border-b flex justify-start items-center px-4">
        <h1 className="text-lg font-bold ">Time Complexity</h1>
      </div>

      <ScrollArea className="h-[calc(100%-60px)] w-full p-4 ">
        {listOfProgrammingLanguagesWithLinks.map((item, i) => {
          return (
            <Link href={item.link} key={i}>
              <Button
                className="w-full mb-2 text-left! justify-start!"
                size={"lg"}
                variant={
                  getLangPath === item.link.slice(1) ? "default" : "ghost"
                }
              >
                {item.name}
              </Button>
            </Link>
          );
        })}
      </ScrollArea>
    </aside>
  );
};
