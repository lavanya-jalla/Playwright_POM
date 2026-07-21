import { APIRequestContext } from '@playwright/test';
import { apiBaseUrl } from '../utility/apiConfig';


export async function getAllBooksApi(request: APIRequestContext) {
   const response = await request.get(`${apiBaseUrl}/booking`);
   return response
}
export async function getAllBooksByIdApi(request: APIRequestContext, id: any) {
   const response = await request.get(`${apiBaseUrl}/booking/${id}`);
   return response
}
export async function createBookingApi(request: APIRequestContext, payload: object) {
   const response = await request.post(`${apiBaseUrl}/booking`, {
      data: payload
   });
   return response
}
export async function updateBookingApi(request: APIRequestContext, payload: object, token: string, id: any) {
   const response = await request.put(`${apiBaseUrl}/booking/${id}`, {
      data: payload,
      headers: {
         "Content-Type": "application/json",
         "Accept": "application/json",
         "Cookie": `token=${token}`
      }
   });
   return response
}
export async function deleteBookingApi(request: APIRequestContext, id: any) {
   const response = await request.delete(`${apiBaseUrl}/booking/${id}`);
   return response
}

