import { signUpService } from "../services/user.services";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { phone, fullName, userName, password } = req.body;
    await signUpService(phone, fullName, userName, password);
  } catch (error) {
    console.log("Error in registering User", error);
  }
};
