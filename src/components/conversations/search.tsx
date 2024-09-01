import { FieldValues, UseFormRegister } from "react-hook-form";

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
    </div>
  );
}

export default ConversationSearch;
