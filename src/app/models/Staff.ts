export interface Staff {
  ws_employee_id: number;
  ws_employee_name: string;
  ws_employee_email: string;
  ws_employee_phno: number;
  ws_role: 'MANAGER' | 'BILLER' | 'SUPERVISOR' | 'FACILITY';
}