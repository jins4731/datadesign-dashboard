import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/common/components/ui/select";

const SelectInput = ({items, setIndex, index}: {
  items: string[];
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
}) => {
  return (
    <Select
      value={index.toString()}
      onValueChange={(value) => {
        setIndex(Number(value));
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Sheet"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sheets</SelectLabel>
          {items.map((item, i) => (
            <SelectItem value={i.toString()}>{item}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectInput;
