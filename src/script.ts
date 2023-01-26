import { switchTheme } from "./modules/switchTheme.js";
import { fetchData } from "./modules/fetchData.js";
import { showError } from "./modules/showError.js";
import { getLocal, setLocal, verifyUserLocal } from "./modules/localUser.js";
import { sorted } from "./modules/sorted.js";
import { User, UserRepo } from "./types/User";

switchTheme("#switch-theme");

const form = document.querySelector("form");
const input = form?.querySelector("input");

const API = "https://api.github.com/users/";

if (form) {
  form.addEventListener("submit", onSubmit);
}

function getValue(element: unknown) {
  if (element && element instanceof HTMLInputElement) {
    return element.value.trim().toLocaleLowerCase().replaceAll(" ", "");
  } else return "";
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

async function onSubmit(event: SubmitEvent) {
  event.preventDefault();
  if (input) {
    input.blur();
    const value = getValue(input);
    if (verifyUserLocal(value)) {
      const local = getLocal()!;
      showUser(local.user, sorted(local.userRepos));
    } else {
      const user = await fetchData<User>(API, value);
      if (!user || user.name === null) showError("User name not found! ;-;");
      else {
        const userRepos = await fetchData<UserRepo[]>(user.repos_url);
        const userReposSorted = sorted(userRepos!);
        showUser(user, userReposSorted);
        setLocal(user, userReposSorted);
      }
    }
  }
}

const local = getLocal();
if (local) {
  showUser(local.user, local.userRepos);
}
