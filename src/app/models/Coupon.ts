export interface Coupon {
  ws_coupon_id?: string;
  ws_campaigns_name: string;
  ws_coupon_code: string;
  ws_start_date: string;
  ws_end_date: string;
  ws_offer_percent: number;
  ws_is_active?: boolean;
}