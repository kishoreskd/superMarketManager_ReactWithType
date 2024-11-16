export interface Order {
    ws_order_id: string;
    ws_customerid: string;
    ws_item_id: string;
    ws_quantity: number;
    ws_coupon?: string;
    ws_order_total: number;
    ws_transaction_date: string;
    ws_order_status: 'ORDERED' | 'RECEIVED' | 'CANCEL';
  }