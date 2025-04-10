import Client from "@/models/Client";
import connectDB from "@/config/dbConnect";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  await connectDB();

  const { clientId, currentPassword, newPassword, securityAnswers } = await req.json();

  try {
    const client = await Client.findById(clientId);
    console.log("🚀 ~ PUT ~ client:", client);

    if (!client) {
      return NextResponse.json({ message: "Client not found" }, { status: 404 });
    }

    if (currentPassword) {
      const isMatch = await client.comparePassword(currentPassword);
      if (!isMatch) {
        return NextResponse.json({ message: "Incorrect current password" }, { status: 400 });
      }
    } else if (securityAnswers) {
      console.log("🚀 ~ PUT ~ securityAnswers:", securityAnswers)
      const isMaidenNameCorrect = await client.compareSecurityAnswer(
        "maidenName",
        securityAnswers.maidenName
      );
      const isFavoriteFoodCorrect = await client.compareSecurityAnswer(
        "favoriteFood",
        securityAnswers.favoriteFood
      );

      if (!isMaidenNameCorrect || !isFavoriteFoodCorrect) {
        return NextResponse.json({ message: "Security answers are incorrect" }, { status: 400 });
      }
    } else {
      return NextResponse.json(
        { message: "Current password or security answers are required" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedClient = await Client.findOneAndUpdate(
      { _id: clientId },
      { $set: { password: hashedPassword } },
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      return NextResponse.json({ message: "Failed to update password" }, { status: 500 });
    }

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ PUT ~ error:", error);
    return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
  }
};
