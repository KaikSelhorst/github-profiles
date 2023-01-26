import { User, UserRepo } from "../types/User";

export function getLocal():
  | { user: User; userRepos: UserRepo[]; date: Date }
  | undefined {
  const local = localStorage.getItem("userLocal");
  if (local) return JSON.parse(local);
  return undefined;
}

export function verifyUserLocal(userName: string) {
  const local = getLocal();
  if (local) {
    if (userName === local.user.login.toLocaleLowerCase()) {
      const currentDate = new Date();
      const localDate = new Date(local.date);
      if ((currentDate.getTime() - localDate.getTime()) / 1000 > 400) {
        return false;
      } else return true;
    } else return false;
  }
  return false;
}

export function setLocal(user: User, userRepos: UserRepo[]) {
  const date = new Date();
  const userLocal = {
    user,
    userRepos,
    date,
  };
  localStorage.setItem("userLocal", JSON.stringify(userLocal));
}
