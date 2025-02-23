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
    console.log("req", newUser);

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
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connect();
    const users = await User.find(); // Fetch all users
    return NextResponse.json({
      success: true,
      message: "Users retrieved successfully!",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error); // Log the error
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}

export async function DELETE(request) {
  try {
    await connect(); // Ensure the database connection is established
    const { _id } = await request.json();
    console.log("_id", _id);

    const userFound = await User.findByIdAndDelete(_id); // Delete the user by ID
    console.log("userFound", userFound);
    if (userFound) {
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

export async function PUT(request) {
  const updatedData = await request.json(); // Extract updated data from the request

  await connect(); // Ensure the database connection is established
  const { _id } = updatedData; // Extract the ID from the updated data
  console.log("updatedData", updatedData);
  console.log("updatedData.id", updatedData._id);
  console.log("updatedData.updatedData", updatedData.updatedData);

  const user = await User.findByIdAndUpdate(
    updatedData._id,
    updatedData.updatedData,
    {
      new: true,
    }
  ); // Update the user by ID

  if (user) {
    return NextResponse.json(
      { message: "User updated successfully!", data: user },
      { status: 200 }
    ); // Return success message with updated user data
  } else {
    return NextResponse.json({ message: "User not found" }, { status: 404 }); // User not found
  }
}
