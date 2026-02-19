import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User as FirebaseUser, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

// Compatibility layer: expose a user shape that matches what the rest of the app expects
// (user.id, user.email, user.user_metadata.full_name)
interface AppUser {
    id: string;
    email: string | null;
    emailVerified: boolean;
    user_metadata: {
        full_name: string | null;
    };
}

interface AuthContextType {
    user: AppUser | null;
    session: any | null; // truthy when logged in, for backward compat
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapFirebaseUser(fbUser: FirebaseUser | null): AppUser | null {
    if (!fbUser) return null;
    return {
        id: fbUser.uid,
        email: fbUser.email,
        emailVerified: fbUser.emailVerified,
        user_metadata: {
            full_name: fbUser.displayName,
        },
    };
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AppUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
            setUser(mapFirebaseUser(fbUser));
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await firebaseSignOut(auth);
    };

    // session is truthy when user is logged in (backward compat)
    const session = user ? { user } : null;

    return (
        <AuthContext.Provider value={{ user, session, loading, signOut: handleSignOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
