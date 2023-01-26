import { UserRepo } from "../types/User";

export function sorted(arr: UserRepo[]) {
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
