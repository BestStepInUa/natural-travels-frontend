import { cookies } from "next/headers";
import { api } from "../../api";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    await api.post(
      'auth/logout',
      {},
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("sessionId");
    return NextResponse.json({ message: 'Logged out successfully' });
  } catch {

    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("sessionId");

    return NextResponse.json({ message: 'Logged out successfully' });
  }
}