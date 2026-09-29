import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const ACCESS_TOKEN_KEY = 'accessToken';
const LEGACY_ACCESS_TOKEN_KEY = 'suplis_access_token';
const REFRESH_TOKEN_KEY = 'refreshToken';

const safeStorageGet = (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
        return window.localStorage.getItem(key);
    } catch {
        return null;
    }
};

const safeStorageSet = (key: string, value: string) => {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(key, value);
    } catch {
        // Ignore storage quota or browser restriction issues.
    }
};

const safeStorageRemove = (key: string) => {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.removeItem(key);
    } catch {
        // Ignore storage access issues.
    }
};

export interface UserProfile {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    phone: string;
    rewardPoints: number;
    role: string;
    roles: string[];
}

interface AuthContextType {
    user: UserProfile | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (token: string, refreshToken?: string) => Promise<UserProfile | null>;
    logout: () => void;
    refreshUser: () => Promise<void>;
    refreshAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => safeStorageGet(ACCESS_TOKEN_KEY) ?? safeStorageGet(LEGACY_ACCESS_TOKEN_KEY));
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const refreshInFlight = useRef<Promise<string | null> | null>(null);

    const persistToken = useCallback((nextToken: string | null) => {
        if (nextToken) {
            safeStorageSet(ACCESS_TOKEN_KEY, nextToken);
            safeStorageSet(LEGACY_ACCESS_TOKEN_KEY, nextToken);
            setToken(nextToken);
        } else {
            safeStorageRemove(ACCESS_TOKEN_KEY);
            safeStorageRemove(LEGACY_ACCESS_TOKEN_KEY);
            safeStorageRemove(REFRESH_TOKEN_KEY);
            setToken(null);
        }
    }, []);

    const refreshAccessToken = useCallback((): Promise<string | null> => {
        if (refreshInFlight.current) return refreshInFlight.current;

        const refreshPromise = (async (): Promise<string | null> => {
            const currentToken = safeStorageGet(ACCESS_TOKEN_KEY) ?? safeStorageGet(LEGACY_ACCESS_TOKEN_KEY);
            const refreshToken = safeStorageGet(REFRESH_TOKEN_KEY);
            if (!currentToken || !refreshToken) {
                persistToken(null);
                setUser(null);
                return null;
            }

            const response = await fetch('http://localhost:3000/auth/token-refresh', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${currentToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });
            if (!response.ok) {
                persistToken(null);
                setUser(null);
                return null;
            }

            const data = await response.json();
            if (typeof data.accessToken !== 'string' || typeof data.refreshToken !== 'string') {
                throw new Error('Token refresh response is missing tokens.');
            }
            persistToken(data.accessToken);
            safeStorageSet(REFRESH_TOKEN_KEY, data.refreshToken);
            return data.accessToken;
        })();
        refreshInFlight.current = refreshPromise;
        void refreshPromise.then(
            () => { refreshInFlight.current = null; },
            () => { refreshInFlight.current = null; },
        );
        return refreshPromise;
    }, [persistToken]);

    const fetchUserProfile = useCallback(async (authToken: string): Promise<UserProfile | null> => {
        try {
            let response = await fetch('http://localhost:3000/auth/userinfo', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 401) {
                const refreshedToken = await refreshAccessToken();
                if (refreshedToken) {
                    response = await fetch('http://localhost:3000/auth/userinfo', {
                        headers: {
                            Authorization: `Bearer ${refreshedToken}`,
                            'Content-Type': 'application/json',
                        },
                    });
                }
            }
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
                role: data.role || data.roles?.[0] || 'User',
                roles: Array.isArray(data.roles) ? data.roles : [data.role || 'User'],
            };

            setUser(profile);
            return profile;
        } catch (err) {
            console.error('Error loading user profile:', err);
            persistToken(null);
            setUser(null);
            return null;
        }
    }, [persistToken, refreshAccessToken]);

    useEffect(() => {
        const initialToken = safeStorageGet(ACCESS_TOKEN_KEY) ?? safeStorageGet(LEGACY_ACCESS_TOKEN_KEY);
        if (initialToken) {
            fetchUserProfile(initialToken).finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [fetchUserProfile]);

    const login = async (newToken: string, newRefreshToken?: string): Promise<UserProfile | null> => {
        persistToken(newToken);
        if (newRefreshToken) safeStorageSet(REFRESH_TOKEN_KEY, newRefreshToken);
        else safeStorageRemove(REFRESH_TOKEN_KEY);
        return await fetchUserProfile(newToken);
    };

    const logout = () => {
        persistToken(null);
        setUser(null);
    };

    const refreshUser = async () => {
        const currentToken = safeStorageGet(ACCESS_TOKEN_KEY) ?? safeStorageGet(LEGACY_ACCESS_TOKEN_KEY);
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
                refreshAccessToken,
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
