import { NextResponse } from 'next/server';
import axios from 'axios';


export async function GET() {
  try {
    const backendUrl = process.env.NEXT_BACKEND_API_URL?.replace(/\/$/, '');

    if (!backendUrl) {
      return NextResponse.json(
        { message: 'NEXT_BACKEND_API_URL is not configured' },
        { status: 500 }
      );
    }

    const response = await axios.get(`${backendUrl}/api/categories`);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: unknown) {
    console.error('Proxy Categories Error:', error);


    const err = error as { response?: { status?: number; data?: { message?: string } } };
    const status = err.response?.status || 500;
    const message = err.response?.data?.message || 'Помилка завантаження категорій через проксі Next.js';

    return NextResponse.json({ message }, { status });
  }
}
