import { test,expect,APIResponse} from '../fixtures/generate-token-fixture';
import payload from '../utility/payloads/createBookingPayload.json'
import {  updateBookingApi } from '../services/bookingApiService';
import { getAllBooksApi, getAllBooksByIdApi } from '../services/bookingApiService';

test.describe(' Update books API Tests', () => {
    let responseAllBooksApi: APIResponse
    let response: any;
    let updateBookingApiResponse: APIResponse
    test.beforeEach(async ({ request ,authToken}) => {
        responseAllBooksApi = await getAllBooksApi(request);
        const responseBodyAllBooksApi = await responseAllBooksApi.json();
        const id = responseBodyAllBooksApi[0].bookingid
        console.log(`Id from get API: ${id}`)
        response = await getAllBooksByIdApi(request, id)
        updateBookingApiResponse = await updateBookingApi(request, payload.createBookingpayload, authToken, id)
        console.log(`Generated Token: ${authToken}`)
    });

    test('status is 200', async () => {
        const responseBody = await updateBookingApiResponse.json();
        console.log(responseBody)
        expect(updateBookingApiResponse.status()).toBe(200);
    });

    test('response data validation', async () => {
        const responseBody = await updateBookingApiResponse.json();
        expect(responseBody.firstname).toBe(payload.createBookingpayload.firstname);
        expect(responseBody.lastname).toBe(payload.createBookingpayload.lastname);
        expect(responseBody).toHaveProperty('lastname');

    })
});
test.describe('Update Booking API Tests-Invalid Tests',()=>{
    test('invalid token response is 403',async({request})=>{
        const updateBookingApiResponse=await updateBookingApi(request,payload.createBookingpayload,"jscjmdcijoefkcdkmjdk",4);
        await expect(updateBookingApiResponse.status()).toBe(403)
    })
    test('empty token response is 403',async({request})=>{
        const updateBookingApiResponse=await updateBookingApi(request,payload.createBookingpayload,"jscjmdcijoefkcdkmjdk",4);
        await expect(updateBookingApiResponse.status()).toBe(403)
    })
})
