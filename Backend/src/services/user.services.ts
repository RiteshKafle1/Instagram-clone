import { responseHandler } from "../utils/response.handler";
import { registerSchema } from "../validations/user.validation";
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
  } catch (error) {
    console.log("Error in signup service", error);
  }
};
