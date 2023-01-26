interface User {
  login: string;
  html_url: string;
  avatar_url: string;
  followers_url: string;
  repos_url: string;
  name: string;
  location: string;
  bio: string;
  public_repos: number;
  followers: number;
}
interface UserRepo {
  name: string;
  html_url: string;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
}

const form = document.querySelector("form");
const input = form?.querySelector("input");

const API = "https://api.github.com/users/";

if (form) {
  form.addEventListener("submit", onSubmit);
}

function getValue(element: unknown) {
  if (element && element instanceof HTMLInputElement) {
    return element.value.trim().toLocaleLowerCase();
  } else return "";
}

async function fetchData<T>(api: string, userName?: string): Promise<T> {
  const url = `${api}${userName ? userName : " "}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

function showUser(user: User, repos: UserRepo[]) {
  const app = document.getElementById("app");
  if (app) {
    app.innerHTML = `
    <a href="${user.html_url}" class='user' target='_blank'>
      <div class='avatar'>
        <img src='${user.avatar_url}' alt='user avatar'/>
      </div>
      <div class='user-status'>
        <h1>${user.name}</h1>
        <div>
          <span>Followers: ${user.followers}</span>
          <span>Repo: ${user.public_repos}</span>
        </div>
      </div>
    </a>
    <ul class='user-repos'>
      ${repos

        .map((repo) => {
          return `
        <li>
          <a href='${repo.html_url}' target="_blank">
            <p>${repo.name}</p>
            <div class='repo-status'>
              <p>Forks: ${repo.forks_count}</p>
              <p>Stars: ${repo.stargazers_count}</p>
            </div>
          </a>
          </li>
        `;
        })
        .join("")}
    </ul>
    `;
  }
}

function sortedRepos(arr: UserRepo[]) {
  const sorted = [];
  for (let i = 0; i < arr.length; i) {
    let indexMaior = i;
    let valueMaior = arr[i].forks_count + arr[i].stargazers_count;

    for (let b = 0; b < arr.length; b++) {
      const valueElement2 = arr[b].forks_count + arr[b].stargazers_count;
      if (valueMaior < valueElement2) {
        valueMaior = valueElement2;
        indexMaior = b;
      }
    }
    sorted.push(arr[indexMaior]);
    arr.splice(indexMaior, 1);
  }
  return sorted.splice(0, 4);
}

async function onSubmit(event: SubmitEvent) {
  event.preventDefault();
  if (input) {
    const value = getValue(input);
    if (verifyUserLocal(value)) {
      const local = getLocal()!;
      showUser(local.user, sortedRepos(local.userRepos));
    } else {
      const user = await fetchData<User>(API, value);
      const userRepos = await fetchData<UserRepo[]>(user.repos_url);
      const userReposSorted = sortedRepos(userRepos);
      showUser(user, userReposSorted);
      setUserLocal(user, userReposSorted);
    }
  }
}

function getLocal():
  | { user: User; userRepos: UserRepo[]; date: Date }
  | undefined {
  const local = localStorage.getItem("userLocal");
  if (local) return JSON.parse(local);
  return undefined;
}

function verifyUserLocal(userName: string) {
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

function setUserLocal(user: User, userRepos: UserRepo[]) {
  const date = new Date();
  const userLocal = {
    user,
    userRepos,
    date,
  };
  localStorage.setItem("userLocal", JSON.stringify(userLocal));
}

const local = getLocal();
if (local) {
  showUser(local.user, local.userRepos);
}
