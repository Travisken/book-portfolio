// types/form.ts
export interface FormResponse {
  id: string;
  timestamp: string;
  name: string;
  country: string;
  email: string;
  phone: string;
  specialties: string[];
  comments?: string;
}
