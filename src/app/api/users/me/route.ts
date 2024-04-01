import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserToken } from "@/helpers/getUserDataToken";

connect();

export async function GET(request: NextRequest) {
  try {
    const userid = getUserToken(request);
    const user = await User.findById(userid).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User is Not Found", status: 404 });
    }
    return NextResponse.json({
      message: "User is Found",
      status: 200,
      data: user,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
