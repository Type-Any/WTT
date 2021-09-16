import {ITokens, removeTokens, storeTokens} from './storage';

const AUTH_SUBSCRIBERS = 'AUTH_SUBSCRIBERS';
type SubscriberFn = (isLoggedIn: boolean) => void;

const authMap = new Map<typeof AUTH_SUBSCRIBERS, SubscriberFn[]>();

export const subscribeAuth = (fn: SubscriberFn) => {
  const subscribers = authMap.get(AUTH_SUBSCRIBERS) || [];
  authMap.set(AUTH_SUBSCRIBERS, [...subscribers, fn]);
};

export const broadcastLogin = async (tokens: ITokens) => {
  await storeTokens(tokens);
  const subscribers = authMap.get(AUTH_SUBSCRIBERS) || [];
  subscribers.map(fn => fn(true));
};

export const broadcastLogout = async () => {
  await removeTokens();
  const subscribers = authMap.get(AUTH_SUBSCRIBERS) || [];
  subscribers.map(fn => fn(false));
};
