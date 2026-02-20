/**
 * Auth Context — Debre na Rede
 * Integrado ao Supabase Auth
 */

import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export type UserRole = 'admin' | 'torcedor' | null

export interface AuthUser {
    id: string
    name: string
    email: string
    role: UserRole
    avatarUrl?: string
}

interface AuthContextType {
    user: AuthUser | null
    session: Session | null
    isLoggedIn: boolean
    isAdmin: boolean
    isTorcedor: boolean
    loading: boolean
    login: (email: string, password: string) => Promise<boolean>
    loginWithGoogle: () => Promise<boolean>
    logout: () => Promise<void>
    register: (name: string, email: string, password: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    // Carrega perfil do usuário a partir do Supabase profiles
    const loadProfile = async (supabaseUser: User) => {
        const { data: profile } = await supabase
            .from('profiles')
            .select('name, role, avatar_url')
            .eq('id', supabaseUser.id)
            .single()

        if (profile) {
            const p = profile as { name: string; role: string; avatar_url: string | null }
            setUser({
                id: supabaseUser.id,
                name: p.name,
                email: supabaseUser.email ?? '',
                role: p.role as UserRole,
                avatarUrl: p.avatar_url ?? undefined,
            })
        } else {
            // Fallback: usa dados do auth
            setUser({
                id: supabaseUser.id,
                name: supabaseUser.user_metadata?.name ?? supabaseUser.email?.split('@')[0] ?? 'Torcedor',
                email: supabaseUser.email ?? '',
                role: 'torcedor',
            })
        }
    }

    useEffect(() => {
        // Sessão inicial
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            if (session?.user) {
                loadProfile(session.user).finally(() => setLoading(false))
            } else {
                setLoading(false)
            }
        })

        // Listener de mudanças de auth
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            if (session?.user) {
                loadProfile(session.user)
            } else {
                setUser(null)
            }
        })

        return () => subscription.unsubscribe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const login = async (email: string, password: string): Promise<boolean> => {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        return !error
    }

    const loginWithGoogle = async (): Promise<boolean> => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: window.location.origin + '/home' },
        })
        return !error
    }

    const register = async (name: string, email: string, password: string): Promise<boolean> => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name } },
        })
        return !error
    }

    const logout = async () => {
        await supabase.auth.signOut()
        setUser(null)
        setSession(null)
    }

    return (
        <AuthContext.Provider value={{
            user,
            session,
            isLoggedIn: user !== null,
            isAdmin: user?.role === 'admin',
            isTorcedor: user?.role === 'torcedor' || user?.role === 'admin',
            loading,
            login,
            loginWithGoogle,
            logout,
            register,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>')
    return ctx
}
