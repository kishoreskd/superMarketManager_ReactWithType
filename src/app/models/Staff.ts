export interface Staff {
  ws_employee_id: string;  // Changed to string to match API usage
  ws_employee_name: string;
  ws_employee_email: string;
  ws_employee_phno: string;  // Changed to string to match API usage
  ws_role: 'MANAGER' | 'BILLER' | 'SUPERVISOR' | 'FACILITY';
}