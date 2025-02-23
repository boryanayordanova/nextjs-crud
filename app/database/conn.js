const MONGO_URL =
  "mongodb+srv://boryanayourdanova:nextjsCRUDPass@nextjscrud.lzqig.mongodb.net/?retryWrites=true&w=majority&appName=nextjsCRUD";

import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(MONGO_URL);
    // const connection = mongoose.connection;
    console.log("Connected to MongoDB true");
    // return connection;
  } catch (errors) {
    console.log(errors);
  }
}

// const connectMongo = async () => {
//   console.log("Attempting to connect to MongoDB...");
//   try {
//     const { connection } = await mongoose.connect(MONGO_URL);

//     if (connection.readyState == 1) {
//       console.log("Connected to MongoDB");
//     }
//   } catch (errors) {
//     return Promise.reject(errors);
//   }
// };

// export default connectMongo;
