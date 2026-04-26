"use client";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useRouter, useSearchParams } from "next/navigation";

export const DataTypeTabs = ({ tabs }: { tabs: string[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // -- Get active data type
  const active = searchParams.get("tab") ?? tabs[0];
  const setTab = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="overflow-x-auto overflow-y-hidden mb-2 w-full sticky top-2 z-50 ">
      <ButtonGroup className="backdrop-blur-md rounded-lg">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant={active === tab ? "default" : "outline"}
            onClick={() => setTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};
