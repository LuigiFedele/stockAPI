import env from "./adapters/presentations/api/config/env";
import app from "./adapters/presentations/api/config/app";

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});