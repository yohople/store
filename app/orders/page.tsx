import SectionTitle from "@/components/global/SectionTitle"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { fetchUserOrders } from "@/utils/action"
import { formatCurrency, formatDate } from "@/utils/format";

async function OrdersPage() {
  const orders = await fetchUserOrders()
  if(orders.length === 0) return <SectionTitle title="You have no order yet"/>
  return (
    <>
    <SectionTitle title="your orders"/>
      <Table>
        <TableCaption>Total orders: {orders.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Order Total</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order)=>{
            const {id, products, orderTotal, tax, shipping,createdAt} = order
            return <TableRow key={id}>
                <TableCell>{products}</TableCell>
                <TableCell>{formatCurrency(orderTotal)}</TableCell>
                <TableCell>{formatCurrency(tax)}</TableCell>
                <TableCell>{formatCurrency(shipping)}</TableCell>
                <TableCell>{formatDate(createdAt)}</TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </>
  )
}

export default OrdersPage
