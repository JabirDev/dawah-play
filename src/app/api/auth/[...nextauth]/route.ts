// import { authConfig } from "@/lib/auth/auth.config";
// import NextAuth from "next-auth";

// const handler = NextAuth(authConfig);

// export { handler as GET, handler as POST };

import { handlers } from "@/lib/auth/auth";

export const { GET, POST } = handlers;
