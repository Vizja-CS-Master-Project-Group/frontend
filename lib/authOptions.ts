import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { csrfCookie, login } from "@/app/actions/auth.actions";

export default {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Your Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, a) {
        const res = await csrfCookie();
        const cookies = res.headers.getSetCookie();

        let sessionKey = null;
        let xsrfToken = null;
        for (const cookie of cookies!) {
          if (cookie.startsWith("library_backend_session=")) {
            sessionKey = cookie.split("=")[1];
          } else if (cookie.startsWith("XSRF-TOKEN=")) {
            xsrfToken = cookie.split("=")[1];
          }

          if (sessionKey && xsrfToken) {
            break;
          }
        }

        const headers = new Headers({
          Cookie: `library_backend_session=${sessionKey}`,
          "Content-Type": "application/json",
        });

        if (xsrfToken) {
          headers.append("X-XSRF-TOKEN", xsrfToken);
        }

        try {
          const response = await login(
            credentials?.email,
            credentials?.password,
            headers,
          );

          if (response.ok) {
            const res = await response.json();

            console.log("===!!!!!!!!!!=====");
            console.log({
              ...res.user,
              access_token: res.access_token,
            });

            return {
              ...res.user,
              access_token: res.access_token,
            };
          } else {
            console.log("HTTP error! Status:", response.status);
            // Handle non-successful response here, return an appropriate JSON response.
            return null;
          }
        } catch (error) {
          console.log("Error", error);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.user = user;
        token.accessToken = user.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.access_token as string;
      session.user = token.user;

      return session;
    },
  },
  session: { strategy: "jwt" },
} as NextAuthOptions;
