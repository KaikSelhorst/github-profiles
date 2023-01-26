/**
 @param api - Api GitHub
 @param userName - User GitHub name

 @example https://api.github.com/users/KaikSelhorst

*/

export async function fetchData<T>(
  api: string,
  userName?: string
): Promise<T | null> {
  try {
    const url = `${api}${userName ? userName : " "}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Erro: " + res.status);
    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("fetchData: " + error.message);
    }
    return null;
  }
}
