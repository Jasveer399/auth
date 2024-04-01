import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    if (!{ username, email, password }) {
      return NextResponse.json({
        message: "All fields are required",
        status: 400,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({
        message: email + " is already Exist try With Another Email",
        status: 400,
      });
    }
  
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    const savdUser = await newUser.save();
    console.log(savdUser);

    await sendEmail({ email, emailType: "VERIFY", userId: savdUser._id });
    return NextResponse.json({
      message: "User Created Successfully",
      status: 200,
      success: true,
      data: savdUser,
    });
  } catch (error: any) {
    return NextResponse.json({ erroe: error.message, status: error.status });
  }
}
