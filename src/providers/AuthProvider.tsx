import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import { toast } from 'react-toastify';
import { useEnv } from './EnvProvider';
import { axios } from './axios';
import { emitNowAndOnReconnect } from './websockets/listen';
import { useSocket } from './websockets/SocketProvider';
import { Loader } from '../commons/components/Loader';
import { FullPageCentered } from '../commons/components/FullPageCentered';

export interface User {
  _id: string;
  authType: string;
  name: string;
  email: string;
}

export interface Auth {
  user: User;
  setUser: (user: User) => undefined;
  signOut: () => void;
}

export const AuthContext = createContext<Auth>(undefined);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider(props) {
  const [initialLoad, setInitialLoad] = useState(true);
  const [user, setUser] = useState<User>();
  const socket = useSocket();
  const env = useEnv();

  const signOut = () => {
    axios
      .post(`${env.MELI_SERVER_URL}/auth/signout`)
      .then(() => setUser(null))
      // force app to reset (TODO graceful logout)
      .then(() => {
        window.location.href = '/';
      })
      .catch(err => {
        toast(`Could not sign out properly: ${err}`, {
          type: 'error',
        });
      });
  };

  useEffect(() => {
    if (env) {
      axios
        .get(`${env.MELI_SERVER_URL}/api/v1/user`)
        .then(({ data }) => setUser(data))
        .catch(err => {
          toast(`Could not get user: ${err}`, {
            type: 'error',
          });
          setUser(null);
        })
        .finally(() => setInitialLoad(false));
    }
  }, [env]);

  useEffect(() => {
    if (user && socket) {
      return emitNowAndOnReconnect(socket, () => socket.emit('join.user', user._id));
    }
  }, [user, socket]);

  return (
    initialLoad ? (
      <FullPageCentered>
        <Loader />
      </FullPageCentered>
    ) : (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          signOut,
        }}
        {...props}
      />
    )
  );
}
