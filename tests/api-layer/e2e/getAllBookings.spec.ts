import { test, expect, APIResponse } from '@playwright/test';
import { getAllBooksApi } from '../services/bookingApiService';

test.describe('Get All Books API Tests', () => {
    let response: APIResponse;
    test.beforeEach(async ({ request }) => {
        response = await getAllBooksApi(request);
    });

    test('status is 200', async () => {
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log(responseBody);
    });

    test('Booking validation', async () => {
        const responseBody = await response.json();
        responseBody.forEach((element: any) => {
            expect(element).toHaveProperty('bookingid');
            expect(typeof element.bookingid).toBe('number');
        });
    });
});