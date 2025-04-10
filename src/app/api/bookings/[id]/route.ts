import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/config/dbConnect';
import Booking from '@/models/Booking';
import { authMiddleware } from '@/middleware/authMiddleware';

const getBlogHandler = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    const { id } = params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json({
        success: false,
        status: 404,
        error: 'Booking not found',
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

const deleteBlogHandler = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    const { id } = params;

    const blog = await Booking.findByIdAndDelete(id);
    if (!blog) {
      return NextResponse.json({
        success: false,
        status: 404,
        error: 'Blog not found',
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      message: 'Blog deleted',
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

const updateBlogHandler = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    const { id } = params;
    const updateData = await request.json();

    const blog = await Booking.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!blog) {
      return NextResponse.json({
        success: false,
        status: 404,
        error: 'Blog not found',
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      data: blog,
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

export const GET = authMiddleware(getBlogHandler);
export const DELETE = authMiddleware(deleteBlogHandler);
export const PATCH = authMiddleware(updateBlogHandler);
