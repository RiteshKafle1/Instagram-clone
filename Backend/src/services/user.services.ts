import { responseHandler } from "../utils/response.handler";
import { registerSchema } from "../validations/user.validation";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

export const signUpService = async (
  phone: string,
  fullName: string,
  userName: string,
  password: string
) => {
  try {
    const { error } = registerSchema.validate({
      phone,
      fullName,
      userName,
      password,
    });

    if (error) return responseHandler(false, 400, error.message);

    const phoneExists = await prisma.user.findUnique({
      where: { phone },
    }); // here my phone field is unique

    if (!phoneExists)
      return responseHandler(false, 400, "Number already registered");

    const userExists = await prisma.user.findUnique({
      where: { userName },
    }); // here my username field is unique

    if (!phoneExists)
      return responseHandler(false, 400, "UserName already exists");

    // what if that user is already in pending that might be possible :)
    const pendingUserExists = await prisma.pendinguser.findFirst({
      where: {
        OR: [{ phone }, { username: userName }],
      },
    });
    if (pendingUserExists)
      return responseHandler(false, 400, "OOPS verify your opt");

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(salt, password);

    const pendingUser = await prisma.pendinguser.create({
      phone,
      fullname: fullName,
      username: userName,
      password: hashedPass,
    });
  } catch (error) {
    console.log("Error in signup service", error);
  }
};
