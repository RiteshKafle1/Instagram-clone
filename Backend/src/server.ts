import express from "express";
import "dotenv/config";
const app = express();

const PORT = process.env.PORT || 4100;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost/
${PORT}`);
});
