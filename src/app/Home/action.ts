"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function getUserNameFromCookie() {
  const token = (await cookies()).get("Auth_psiq")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    const name = payload.name as string;
    console.log("name", name);
    const lastName = payload.lastName as string;
    return `${name} ${lastName}`;
  } catch {
    return null;
  }
}