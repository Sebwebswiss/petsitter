import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/config/dbConnect';
import Client from '@/models/Client';
import { authMiddleware } from '@/middleware/authMiddleware';

const getUserHandler = async (request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> => {
  try {
    await connectDB();
    const { id } = params;

    const user = await Client.findById(id);
    if (!user) {
      return NextResponse.json({
        success: false,
        status: 404,
        error: 'User not found',
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      data: user,
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

const deleteUserHandler = async (request: NextRequest, { params }: { params: { id: string } }):Promise<NextResponse> => {
  try {
    await connectDB();
    const { id } = params;

    const user = await Client.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({
        success: false,
        status: 404,
        error: 'User not found',
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      message: 'User deleted',
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

const updateUserHandler = async (request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> => {
  try {
    await connectDB();
    const { id } = params;
    const updateData = await request.json();

    const user = await Client.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!user) {
      return NextResponse.json({
        success: false,
        status: 404,
        error: 'User not found',
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      data: user,
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

export const GET = authMiddleware(getUserHandler);
export const DELETE = authMiddleware(deleteUserHandler);
export const PATCH = authMiddleware(updateUserHandler);
