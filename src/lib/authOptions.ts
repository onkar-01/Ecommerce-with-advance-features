import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectToDB } from "./ConnectDB";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Please fill the all required Fields")
                }
                try {
                    await connectToDB();
                    const user = await User.findOne({ email: credentials?.email });
                    if (!user) {
                        throw new Error("User not found with this email")
                    }
                    const isPasswordCorrect = await bcrypt.compare(user.password, credentials?.password);
                    if (!isPasswordCorrect) {
                        throw new Error("Password is not correct")
                    }
                    if (!user.isVerified) {
                        throw new Error("User is not verified")
                    }
                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        mobile: user.mobile,
                        address: user.address
                    };
                }
                catch (error) {
                    throw new Error(`Error while authorizing the user ${error}`);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.mobile = token.mobile as string;
                session.user.address = token.address as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
            }
            return session
        }
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60 // 24 hours
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    theme: {
        colorScheme: "light",
        brandColor: "#FBBF24",
        logo: "/logo.png"
    },
    events: {
        signIn: async (message) => {
            console.log("User signed in", message);
        }
    },
}