import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { icons } from "lucide-solid";

const SelectDemo = () => {
  return (
    <Select
      class="pb-4"
      options={[
        "Wytze",
        "Piet",
        "Sinterklaas",
        "Sasquatch",
        "Jan Peter Balkenende",
      ]}
      defaultValue={"Wytze"}
      itemComponent={(props) => (
        <SelectItem item={props.item}>
          <div class="flex items-center gap-2">
            <icons.User />
            <span>{props.item.rawValue}</span>
          </div>
        </SelectItem>
      )}
    >
      <SelectTrigger>
        <SelectValue<string>>
          {(state) => (
            <div class="flex items-center gap-2">
              <icons.User />
              <span>{state.selectedOption()}</span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent />
    </Select>
  );
};

export default SelectDemo;
