import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/config/dbConnect";
import Admin from "@/models/Admin";

const SECRET_KEY = process.env.SECRET_KEY || "";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { username, password } = await req.json();

    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = new Admin({ username, password });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      { token, message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
