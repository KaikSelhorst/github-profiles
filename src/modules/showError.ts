export function showError(message: string) {
  const div = document.createElement("div");
  div.classList.add("error-modal");
  div.innerHTML = `
    <div>
      <p>${message}</p>
        <button class='btn-error'>Try Again</button>
    <div>
  `;
  document.body.appendChild(div);
  const btnError = document.querySelector(".btn-error");
  if (btnError) {
    btnError.addEventListener("click", onBtnEvent);
    btnError.addEventListener("touchstart", onBtnEvent);
  }
}
function onBtnEvent(event: Event) {
  event.preventDefault();
  const btn = event.currentTarget;
  if (btn && btn instanceof HTMLElement) {
    btn.parentNode?.parentElement?.remove();
  }
}
