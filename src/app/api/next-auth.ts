import { AuthOptions, getServerSession } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
