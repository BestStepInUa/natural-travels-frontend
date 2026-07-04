import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { ApiError, createErrorResponce } from "../../_utils/utils";
import { cookies } from "next/headers";
import { parseCookie } from "cookie";

export async function POST(req: NextRequest){
  try{
    const body = await req.json();
    const res = await api.post("auth/register", body);

    const cookieStore = await cookies();

    const setCookie = res.headers["set-cookie"];

    if(setCookie){
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

     for (const cookieStr of cookieArray){
      const parsed = parseCookie(cookieStr);

      const options = {
        expires: parsed.expires ? new Date(parsed.expires) : undefined,
        path: parsed.path,
        maxAge: Number(parsed["maxAge"]),
      }

      if(parsed.accessToken){
        cookieStore.set("accessToken", parsed.accessToken, options);
      }
      if(parsed.refreshToken){
        cookieStore.set("refreshToken", parsed.refreshToken, options);
      }
     }

     return NextResponse.json(res.data)

    }

    return NextResponse.json({error: "Unautorized"}, {status: 401 })
  }catch(error){
    createErrorResponce(error as ApiError);
  }
}