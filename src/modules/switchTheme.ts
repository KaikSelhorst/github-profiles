/**
@param activator - Is ID or Class of the html element.

@example 
switchTheme('.body')
switchTheme('#btn-switch')
*/

export function switchTheme(activator: string) {
  const element = document.querySelector(activator);
  if (element && element instanceof HTMLElement) {
    element.addEventListener("click", onEventBtn);
    element.addEventListener("touchstart", onEventBtn);
  }
  const theme = localStorage.getItem("preference-theme");
  if (theme === "auto") document.body.classList.add("dark");
}

function setThemeLocal(themeName: string) {
  localStorage.setItem("preference-theme", themeName);
}

function onEventBtn(event: Event) {
  event.preventDefault();
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) setThemeLocal("auto");
  else setThemeLocal("light");
}
