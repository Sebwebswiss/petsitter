import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/dbConnect";
import Pet from "@/models/Pet";
import { authMiddleware } from "@/middleware/authMiddleware";

const getPetsHandler = async (request: NextRequest) => {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const user = request.user;

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const pets = await Pet.find({ user: user._id })
      .sort({ publishDate: -1 })
      .skip(skip)
      .limit(limit);

    const totalPets = await Pet.countDocuments({ user: user._id });

    return NextResponse.json({
      success: true,
      status: 200,
      data: pets,
      pagination: {
        total: totalPets,
        page,
        pages: Math.ceil(totalPets / limit),
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

const createPetHandler = async (request: NextRequest) => {
  try {
    await connectDB();

    const req = await request.json();
    const user = request.user;

    const newPet = await Pet.create({ ...req, user: user._id });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Pet Created",
      data: newPet,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        status: 500,
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};

export const GET = authMiddleware(getPetsHandler);
export const POST = authMiddleware(createPetHandler);
