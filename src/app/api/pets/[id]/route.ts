import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/config/dbConnect';
import Booking from '@/models/Booking';
import { authMiddleware } from '@/middleware/authMiddleware';
import Pet from '@/models/Pet';

const getPetHandler = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    const { id } = params;

    const booking = await Pet.findById(id);
    if (!booking) {
      return NextResponse.json({
        success: false,
        status: 404,
        error: 'Pet not found',
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      data: booking,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      status: 500,
      error: 'Internal Server Error',
    });
  }
};

const deletePetHandler = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    const { id } = params;

    const pet = await Pet.findByIdAndDelete(id);
    if (!pet) {
      return NextResponse.json({
        success: false,
        status: 404,
        error: 'Pet not found',
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      message: 'Pet deleted',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      status: 500,
      error: 'Internal Server Error',
    });
  }
};

const updatePetHandler = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    const { id } = params;
    const updateData = await request.json();

    const pet = await Pet.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!pet) {
      return NextResponse.json({
        success: false,
        status: 404,
        error: 'Pet not found',
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      data: pet,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      status: 500,
      error: 'Internal Server Error',
    });
  }
};

export const GET = authMiddleware(getPetHandler);
export const DELETE = authMiddleware(deletePetHandler);
export const PATCH = authMiddleware(updatePetHandler);
