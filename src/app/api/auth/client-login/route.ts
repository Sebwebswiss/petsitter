import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import connectDB from '@/config/dbConnect';
import Client from '@/models/Client';

const SECRET_KEY = process.env.SECRET_KEY || "";

export async function POST(req: NextRequest) {
  await connectDB(); 

  try {
    const { email, password } = await req.json();

    const user = await Client.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User does not exist" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials or Wrong Provider" }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id, ...user }, SECRET_KEY, { expiresIn: "365d" });

    return NextResponse.json({ token, message: "Login successful", data: user }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
