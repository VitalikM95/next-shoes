import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Order } from '@/lib/db/orders'

interface OrdersTableProps {
  orders: Order[]
}

const OrderStatusLabel = ({ status }: { status: Order['status'] }) => {
  const statusColors = {
    PROCESSING: 'bg-blue-100 text-blue-800',
    CONFIRMED: 'bg-indigo-100 text-indigo-800',
    SHIPPED: 'bg-purple-100 text-purple-800',
    DELIVERED: 'bg-green-100 text-green-800',
    COMPLETED: 'bg-emerald-100 text-emerald-800',
    CANCELED: 'bg-red-100 text-red-800',
    RETURNED: 'bg-orange-100 text-orange-800',
  }
  const statusStr = String(status)
  const colorClass =
    statusColors[statusStr as keyof typeof statusColors] ||
    'bg-gray-100 text-gray-800'

  return (
    <span className={`px-2 py-1 rounded-md text-xs font-medium ${colorClass}`}>
      {status}
    </span>
  )
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getFullYear()).slice(2)}`
}

const OrdersTable = ({ orders }: OrdersTableProps) => {
  return (
    <div className="mb-12">
      <div className="my-10 border-b-2 border-black px-5 py-2 text-2xl font-bold uppercase">
        My orders
      </div>
      {orders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          You have no orders yet.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order #</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Ship To</TableHead>
              <TableHead>Order Total</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  {order.orderNumber}
                </TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>{order.country}</TableCell>
                <TableCell className="font-semibold">
                  {order.totalPrice}
                  <span className="font-semibold text-gray-500"> EUR</span>
                </TableCell>
                <TableCell className="text-right">
                  <OrderStatusLabel status={order.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default OrdersTable
