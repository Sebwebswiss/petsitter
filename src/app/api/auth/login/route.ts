import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import connectDB from '@/config/dbConnect';
import Admin from '@/models/Admin';

const SECRET_KEY = process.env.SECRET_KEY || "";

export async function POST(req: NextRequest) {
  await connectDB(); 

  try {
    const { username, password } = await req.json();

    const user = await Admin.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: "365d" });

    return NextResponse.json({ token, message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
