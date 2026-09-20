import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import User from "@/models/User";
import connectDb from "@/db/connectDB";

const authoptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: { scope: "read:user user:email" }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github") {
        await connectDb();
        const currentUser = await User.findOne({ email: user.email });
        if (!currentUser) {
          await User.create({
            email: user.email,
            Username: user.email.split("@")[0],
          });
        }
        return true;
      }
      return true;
    },
    async session({ session }) {
      await connectDb();
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.name = dbUser.Username;
      }
      return session;
    },
  },
};

const handler = NextAuth(authoptions);
export { handler as GET, handler as POST };