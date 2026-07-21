import { APIRequestContext } from "@playwright/test";
import { tokenGenerationUrl } from "../utility/apiConfig";
import dotenv from 'dotenv'
dotenv.config();

export async function generateTokenApi(request: APIRequestContext) {
    const response = await request.post(tokenGenerationUrl, {
        headers: { "Content-Type": "application/json" },
        data: {


                    "username": process.env.GURU99_API_USERNAME,
                    "password": process.env.GURU99_API_PASSWORD

        }
    })
    return response

}