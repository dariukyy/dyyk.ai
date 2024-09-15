import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type DataTableProps = {
  headers: string[];
  children: React.ReactNode;
  bookingsLength?: number;
};

export const DataTable = ({
  headers,
  children,
  bookingsLength,
}: DataTableProps) => {
  return (
    <Table className="rounded-t-xl overflow-hidden">
      <TableHeader>
        <TableRow className="">
          {headers.map((header, key) => (
            <TableHead
              key={key}
              className={cn(
                key == headers.length - 1 && "text-right",
                "text-black"
              )}
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Appointments</TableCell>
          <TableCell className="text-right">{bookingsLength}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
