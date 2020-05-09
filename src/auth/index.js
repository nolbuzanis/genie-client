import { freeUser } from '../config';

export const isPremium = user => {
  if (!user || (user && !user.premium)) return false;

  const { nextPaymentDate } = user.premium;
  const premiumDateInMS = new Date(nextPaymentDate).getTime();
  const nowInMS = new Date().getTime();

  return nowInMS <= premiumDateInMS;
};

export const hasNoSavesRemaining = user => {
  if (isPremium(user)) return false;
  return user.saves >= freeUser.maxSaves;
};
