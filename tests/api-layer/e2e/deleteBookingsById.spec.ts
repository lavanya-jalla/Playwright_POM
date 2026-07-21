import { test, expect, APIResponse } from '@playwright/test';
import { getAllBooksApi, getAllBooksByIdApi } from '../services/bookingApiService';
import { deleteBookingApi } from '../services/bookingApiService';

test.describe('Delete Books by ID Api Tests', () => {
  let responseAllBooksApi:APIResponse
  let deleteResponse:any;

  test.beforeEach(async ({ request }) => {
    responseAllBooksApi = await getAllBooksApi(request);
    const responseBodyAllBooksApi=await responseAllBooksApi.json();
    const id=responseBodyAllBooksApi[0].bookingid
    console.log(`Id from get API: ${id}`)
    deleteResponse=await deleteBookingApi(request,id)
  });

 test('status is 403', async () => {
  const responseBody = await deleteResponse.text();
  console.log(responseBody);
  expect(deleteResponse.status()).toBe(403);
  expect(responseBody).toBe('Forbidden');
});
})