
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export enum Mode {
  SingleProduct = "singleProduct",
  CartItem = "cartItem",
}

type SelectProductAmountProps = {
  mode: Mode.SingleProduct;
  amount: number;
  setAmount: (value: number) => void;
};

type SelectCartItemAmountProps = {
  mode: Mode.CartItem;
  amount: number;
  setAmount: (value: number) => Promise<void>;
  isLoading: boolean;
};

function SelectProductAmount(
  props: SelectCartItemAmountProps | SelectProductAmountProps
) {
  const { mode, amount, setAmount } = props;
  const cartItem = mode === Mode.CartItem;
  return (
    <>
      <h4 className="mb-4">Amount : </h4>
      <Select
        defaultValue={amount.toString()}
        onValueChange={(Value) => setAmount(Number(Value))}
        disabled={cartItem ? props.isLoading : false}
      >
        <SelectTrigger className={cartItem?"w-[100px]":"w-[150px]"}>
            <SelectValue placeholder={amount}/>
        </SelectTrigger>
        <SelectContent>
            {Array.from({length:cartItem?amount+10:10},(_,index)=>{
                const selectValue = (index+1).toString()
                return <SelectItem key={index} value={selectValue}>
                    {selectValue}
                </SelectItem>
            })}
        </SelectContent>
      </Select>
    </>
  );
}

export default SelectProductAmount;
