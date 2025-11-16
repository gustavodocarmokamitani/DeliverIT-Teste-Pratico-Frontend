import api from './api/api';
import type { CreateAccountPayload } from '../model/CreatePaymentPayload';
import type { Account } from '../model/Payment';

 
export const paymentService = {
  
  async getAllAccounts(): Promise<Account[]> {
    const response = await api.get<Account[]>('/contas-pagar'); 
    return response.data;
  },
  
  async createAccount(data: CreateAccountPayload): Promise<Account> {
    const response = await api.post<Account>('/contas-pagar', data); 
    return response.data;
  },

};