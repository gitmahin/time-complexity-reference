import { ChevronLeft, RefreshCcwIcon, Rss } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import Link from "next/link";

export function EmptyMdx() {
  return (
    <Empty className="h-full ">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Rss />
        </EmptyMedia>
        <EmptyTitle>No Content</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          The page you're looking for doesn't exist or hasn't been added yet.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link href={"/"}>
          <Button variant="outline">
            <ChevronLeft />
            Back to Home
          </Button>
        </Link>
      </EmptyContent>
    </Empty>
  );
}
