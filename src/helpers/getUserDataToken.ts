import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export const getUserToken = (request: NextRequest) => {
  try {
    const decodedtoken: any = request.cookies.get("token")?.value;
    if (!decodedtoken) return null;
    const userid = jwt.verify(decodedtoken, process.env.JWT_SECRET!);
    return userid;
  } catch (error: any) {
    return new Error("Could not get user token");
  }
};
