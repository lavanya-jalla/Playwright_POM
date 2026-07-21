import { test, expect, APIResponse } from '@playwright/test';
import { getAllBooksApi, getAllBooksByIdApi } from '../services/bookingApiService';

test.describe('Get All Books Api Tests by ID', () => {
  let responseAllBooksApi:APIResponse
  let response:any;

  test.beforeEach(async ({ request }) => {
    responseAllBooksApi = await getAllBooksApi(request);
    const responseBodyAllBooksApi=await responseAllBooksApi.json();
    const id=responseBodyAllBooksApi[0].bookingid
    console.log(`Id from get API: ${id}`)
    response=await getAllBooksByIdApi(request,id)
  });

  test('status is 200', async ({request}) => {
    const responseBody=await response.json()
    console.log(responseBody) 
    await expect(response.status()).toBe(200);
  });

  test('Property validation', async () => {
    const responseBody = await response.json();

    await expect(responseBody).toHaveProperty('firstname');
    await expect(responseBody).toHaveProperty('lastname');
    await expect(responseBody).toHaveProperty('totalprice');
    await expect(responseBody).toHaveProperty('depositpaid');
    await expect(responseBody).toHaveProperty('bookingdates');
    await expect(responseBody.bookingdates).toHaveProperty('checkin');
    await expect(responseBody.bookingdates).toHaveProperty('checkout');
  });
});
test.describe('Get All books API Invalid Tests',()=>{
  test('status code is 404 for id:0',async({request})=>{
    const response=await getAllBooksByIdApi(request,0);
    expect(response.status()).toBe(404);

  })
  test('status code is 404 for id negative:-5',async({request})=>{
    const response=await getAllBooksByIdApi(request,-5);
    expect(response.status()).toBe(404);
})
  test('status code is 404 for id special charcters:-5',async({request})=>{
    const response=await getAllBooksByIdApi(request,"@#$");
    expect(response.status()).toBe(404);
})
})