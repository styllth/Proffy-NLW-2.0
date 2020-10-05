import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '@proffy/axios-config';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  whatsapp: string | null;
  bio: string | null;
}
interface Authentication {
  user: User;
  token: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(url: string, params: unknown): Promise<void>;
  signOut(): void;
}

interface LoginProps {
  email: string;
  password: string;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const user = localStorage.getItem('@RAuth:user');
      const token = localStorage.getItem('@RAuth:token');

      if (user && token) {
        api.defaults.headers.Authorization = `token ${token}`;

        setUser(JSON.parse(user));
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  async function signIn(url: string, params: LoginProps) {
    const { data } = await api.post<Authentication>(url, {
      email: params.email,
      password: params.password
    });

    setTimeout(() => {
      setUser(data.user);
    }, 3000);

    // Set toke for all request
    api.defaults.headers.Authorization = `Token ${data.token}`;

    localStorage.setItem('@RAuth:user', JSON.stringify(data.user));
    localStorage.setItem('@RAuth:token', data.token);
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
