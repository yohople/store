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
import { fetchAdminOrders } from "@/utils/action"
import { formatCurrency, formatDate } from "@/utils/format";

async function SalesPage() {
  const orders = await fetchAdminOrders()
  if(orders.length === 0) return <SectionTitle title="there are no orders yet"/>
  return (
    <>
    <SectionTitle title="orders"/>
      <Table>
        <TableCaption>Total orders: {orders.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Order Total</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order)=>{
            const {id, products, orderTotal, tax, shipping,createdAt, email} = order
            return <TableRow key={id}>
                <TableCell>{email}</TableCell>
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

export default SalesPage
