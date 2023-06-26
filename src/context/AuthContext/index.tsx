import { createContext, useEffect, useState } from "react";
import { createUserService, getUserService } from "../../services/AuthService";
import { UserCredential, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

type AuthContextProps = {
  user: User | null;
  setUser: (user: User | null) => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
