import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/dbConnect";
import Pet from "@/models/Pet";
import { authMiddleware } from "@/middleware/authMiddleware";

const getPetsHandler = async (request: NextRequest) => {
  try {
    await connectDB();
    const user = request.user;

    const cats = await Pet.countDocuments({ petType: "Cat", user: user._id });
    const dogs = await Pet.countDocuments({ petType: "Dog", user: user._id });

    return NextResponse.json({
      success: true,
      status: 200,
      data: {
        cats,
        dogs,
      },
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

export const GET = authMiddleware(getPetsHandler);
