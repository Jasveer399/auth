import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      messgae: "Logout SuccessFully",
      status: 200,
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0)});
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
