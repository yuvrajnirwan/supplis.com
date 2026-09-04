import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface UserProfile {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    phone: string;
    rewardPoints: number;
}

interface AuthContextType {
    user: UserProfile | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (token: string) => Promise<UserProfile | null>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('accessToken'));
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUserProfile = useCallback(async (authToken: string): Promise<UserProfile | null> => {
        try {
            const response = await fetch('http://localhost:3000/auth/userinfo', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }

            const data = await response.json();
            const profile: UserProfile = {
                id: data.id || '',
                username: data.username || data.name || 'User',
                firstName: data.firstName || data.username || 'User',
                lastName: data.lastName || '',
                name: data.name || data.firstName || data.username || 'User',
                email: data.email || '',
                phone: data.phone || '+91 98765 43210',
                rewardPoints: data.rewardPoints ?? 450,
            };

            setUser(profile);
            return profile;
        } catch (err) {
            console.error('Error loading user profile:', err);
            localStorage.removeItem('accessToken');
            setToken(null);
            setUser(null);
            return null;
        }
    }, []);

    useEffect(() => {
        const initialToken = localStorage.getItem('accessToken');
        if (initialToken) {
            fetchUserProfile(initialToken).finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [fetchUserProfile]);

    const login = async (newToken: string): Promise<UserProfile | null> => {
        localStorage.setItem('accessToken', newToken);
        setToken(newToken);
        return await fetchUserProfile(newToken);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setToken(null);
        setUser(null);
    };

    const refreshUser = async () => {
        const currentToken = localStorage.getItem('accessToken');
        if (currentToken) {
            await fetchUserProfile(currentToken);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token && !!user,
                loading,
                login,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
