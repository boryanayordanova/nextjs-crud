import { NextResponse } from "next/server";
import User from "../../database/userSchema"; // Import the User model
import { connect } from "../../database/conn";

export async function POST(request) {
  try {
    await connect();
    const { firstname, lastname, email, salary, date, status } =
      await request.json();
    const newUser = new User({
      firstname,
      lastname,
      email,
      salary,
      date,
      status,
    });

    await newUser.save();

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully!",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Users retrieved from database:", User); // Log the users retrieved
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}

export async function GET(request) {
  try {
    await connect();
    const users = await User.find();
    return NextResponse.json({
      success: true,
      message: "Users retrieved successfully!",
      data: users,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}

export async function PUT(request) {
  const { id } = request.params; // Extract the ID from the request parameters
  const updatedData = await request.json(); // Get the updated user data from the request body
  await connect(); // Ensure the database connection is established

  const user = await User.findByIdAndUpdate(id, updatedData, { new: true }); // Update the user by ID

  if (user) {
    return NextResponse.json(
      { message: "User updated successfully!", data: user },
      { status: 200 }
    ); // Return success message with updated user data
  } else {
    return NextResponse.json({ message: "User not found" }, { status: 404 }); // User not found
  }
}

export async function DELETE(request, id) {
  try {
    // const { id } = request.params; // Extract the ID from the request parameters
    await connect(); // Ensure the database connection is established
    // const toDelete = await request.json(); // Remove this line
    const userId = request.params.id; // Extract the ID from the request parameters
    console.log(userId);

    const user = await User.findByIdAndDelete(userId); // Delete the user by ID

    if (user) {
      return NextResponse.json(
        { message: "User deleted successfully!" },
        { status: 200 }
      ); // Return success message
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 }); // User not found
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
