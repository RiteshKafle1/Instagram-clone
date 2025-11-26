export const responseHandler = (
  success: boolean,
  status: Number,
  mssgOrData: string | unknown
) => {
  if (success) return { success: true, status, data: mssgOrData };
  else return { success: false, status, error: { message: mssgOrData } };
};
