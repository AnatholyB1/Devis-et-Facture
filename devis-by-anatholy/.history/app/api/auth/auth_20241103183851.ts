import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Providers.GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        // Add more providers here
    ],
    database: process.env.POSTGRES_URL,
    session: {
        jwt: true,
    },
    callbacks: {
        async signIn(user, account, profile) {
            return true;
        },
        async redirect(url, baseUrl) {
            return baseUrl;
        },
        async session(session, user) {
            session.userId = user.id;
            return session;
        },
        async jwt(token, user, account, profile, isNewUser) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
});