import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { collections } from "../utils/collections";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  id: string;
  name: string;
  email: string;
  photo?: string;
};

type AuthContextProps = {
  user: User;
  userIsLoading: boolean;
  signInWithApple: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthSessionGoogleResponse = {
  type: string;
  params: {
    access_token: string;
  };
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>({} as User);

  const {
    keys: { userKey },
  } = collections;

  const signInWithGoogle = async () => {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthSessionGoogleResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await response.json();

        const userData = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        };

        setUser(userData);

        await AsyncStorage.setItem(userKey, JSON.stringify(userData));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const signInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      });

      if (credential) {
        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

        const userData = {
          id: credential.user,
          email: credential.email!,
          name,
          photo,
        };

        setUser(userData);

        await AsyncStorage.setItem(userKey, JSON.stringify(userData));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const signOut = async () => {
    setUser({} as User);
    await AsyncStorage.removeItem(userKey);
  };

  useEffect(() => {
    const loadSavedUser = async () => {
      const userSaved = await AsyncStorage.getItem(userKey);

      if (userSaved) {
        const userData = JSON.parse(userSaved) as User;

        setUser(userData);
      }

      setLoading(false);
    };

    loadSavedUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userIsLoading: loading,
        signInWithGoogle,
        signInWithApple,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
