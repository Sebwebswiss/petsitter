import connectDB from "@/config/dbConnect";
import Client from "@/models/Client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    const req = await request.json();
    const newClient = await Client.create(req);

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Client Created",
      data: newClient,
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

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const username = searchParams.get("username");
    const phone = searchParams.get("phone");

    let query: any = {};
    if (email) query.email = email;
    if (username) query.username = username;
    if (phone) query.phone = phone;

    const clients = await Client.find(query);

    return NextResponse.json({
      success: true,
      status: 200,
      data: clients,
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
