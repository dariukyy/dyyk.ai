import { FieldValues, UseFormRegister } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type ConversationSearchProps = {
  register: UseFormRegister<FieldValues>;
  domains?:
    | {
        name: string;
        id: string;
        icon: string;
      }[]
    | undefined;
};

function ConversationSearch({ register, domains }: ConversationSearchProps) {
  return (
    <div className="flex flex-col py-3">
      <select
        className="px-3 py-4 text-sm border-[1px] rounded-lg mr-5"
        {...register("domain")}
      >
        <option disabled selected>
          Domain name
        </option>
        {domains?.map((domain) => (
          <option key={domain.id} value={domain.id}>
            {domain.name}
          </option>
        ))}
      </select>
      {/* <Select {...register("domain")}>
        <SelectTrigger className="w-2/3">
          <SelectValue placeholder="Select a domain" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Domain name</SelectLabel>
            {domains?.map((domain) => (
              <SelectItem key={domain.id} value={domain.id}>
                {domain.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select> */}
    </div>
  );
}

export default ConversationSearch;
