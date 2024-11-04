// /c:/Devis-et-Facture/devis-by-anatholy/app/login/page.tsx
"use client"
import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginPage() {
    const { data: session } = useSession();

    return (
        <div>
            {!session ? (
                <>
                    <h1>Login</h1>
                    <button onClick={() => signIn()}>Sign in</button>
                </>
            ) : (
                <>
                    <h1>Welcome, {session.user?.name}</h1>
                    <button onClick={() => signOut()}>Sign out</button>
                </>
            )}
        </div>
    );
}