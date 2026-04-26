"use client";

import { useSearchParams } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Row = { method: string; complexity: string; notes: string };
type Props = { data: Record<string, Row[]> };

const complexityColor = (complexity: string) => {
  if (complexity === "O(1)")
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
  if (complexity === "O(log n)")
    return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
  if (complexity === "O(n log n)")
    return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
  if (complexity === "O(n²)")
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
  return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"; // O(n)
};

export function ComplexityView({ data }: Props) {
  const searchParams = useSearchParams();

  // -- Get all tabs for button groups
  const tabs = Object.keys(data);

  // -- Get active data type
  const active = searchParams.get("tab") ?? tabs[0];
  // -- Get all methods based on active data type
  const rows = data[active] ?? [];

  return (
    <div className="rounded-lg overflow-hidden border">
      <Table>
        <TableHeader className="sticky top-0">
          <TableRow>
            <TableHead className="border-r text-center ">Method</TableHead>
            <TableHead className="border-r text-center ">Complexity</TableHead>
            <TableHead className="text-center ">Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={row.method}
              className={`${i % 2 && "bg-zinc-900 "} hover:bg-indigo-500/10 transition-colors`}
            >
              <TableCell className="[font-family:var(--font-jetbrains-mono)] border-r">
                {row.method}
              </TableCell>
              <TableCell className="border-r">
                <span
                  className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${complexityColor(row.complexity)}`}
                >
                  {row.complexity}
                </span>
              </TableCell>
              <TableCell>{row.notes || "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
