import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "../ui/label"

function RatingInput({name, labelText}:{name:string, labelText?:string}) {
    const numbers = Array.from({length:5}, (_,i)=>{
      console.log(_);
        const val = i + 1
        return val
    }).reverse()
  return (
    <div className="mb-4 max-w-xs">
      <Label htmlFor={name} className="capitalize">{labelText || name}</Label>
      <Select defaultValue={numbers[0].toString()} name={name}>
        <SelectTrigger>
            <SelectValue/>
        </SelectTrigger>
        <SelectContent >
            {numbers.map((num)=>{
                return <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
            })}
        </SelectContent>
    </Select>
    </div>
  )
}

export default RatingInput
