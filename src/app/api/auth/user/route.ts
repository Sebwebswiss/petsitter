import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/dbConnect";
import { authMiddleware } from "@/middleware/authMiddleware";
import Client from "@/models/Client";

const getUserHandler = async (request: NextRequest) => {
  try {
    await connectDB();
    const user = request.user;

    const client = await Client.findById(user._id).select("-password");

    return NextResponse.json({
      success: true,
      status: 200,
      data: client,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      status: 500,
      error: "Internal Server Error",
    });
  }
};

export const GET = authMiddleware(getUserHandler);
