import { test, expect, APIResponse } from '@playwright/test';
import { createBookingApi } from '../services/bookingApiService';
import payload from '../utility/payloads/createBookingPayload.json'
import { createBooking } from '../types/createBooking-interface';

test.describe('Create Books Api Tests', () => {
    let responseBodyCreateBooksApi: createBooking
    let response: any

    test.beforeEach(async ({ request }) => {
        response = await createBookingApi(request, payload.createBookingpayload);
        responseBodyCreateBooksApi = await response.json();
        console.log(responseBodyCreateBooksApi)
    });
    test('status is 200', async ({ request }) => {
        expect(await response.status()).toBe(200);

    })
    test('response data validation', async () => {
        expect(responseBodyCreateBooksApi.booking).toBeTruthy()
        expect(responseBodyCreateBooksApi.booking.firstname).toBe(payload.createBookingpayload.firstname)
        expect(responseBodyCreateBooksApi.booking.lastname).toBe(payload.createBookingpayload.lastname)
    })
    test('Schema data validation', async () => {
        expect(typeof responseBodyCreateBooksApi.bookingid).toBe('number')
        expect(typeof responseBodyCreateBooksApi.booking).toBe('object')
        expect(typeof responseBodyCreateBooksApi.booking.bookingdates).toBe('object')
        expect(typeof responseBodyCreateBooksApi.booking.depositpaid).toBe('boolean')
    })
    test('property check', async () => {
          expect(responseBodyCreateBooksApi).toHaveProperty('bookingid');
          expect(responseBodyCreateBooksApi.booking).toHaveProperty('firstname');
          expect(responseBodyCreateBooksApi.booking).toHaveProperty('lastname');

    })
})
test.describe('Creating booking Api Invalid Tests', () => {
    test('remove required paramarters im payload response is 500', async ({ request }) => {
        const response = await createBookingApi(request, payload.createBookingInvalidpayload)
        await expect(response.status()).toBe(500)
    })

})

