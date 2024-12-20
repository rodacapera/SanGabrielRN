export interface ApiData {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  credentials?: 'include' | 'same-origin' | 'omit';
  body?: any;
  form?: string;
  token?: string | null;
  headers?: any;
}
