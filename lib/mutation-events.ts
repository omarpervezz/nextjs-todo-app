export function emitMutationEvent() {
  window.dispatchEvent(new Event("todo-mutation"));
}

export function subscribeToMutations(callback: () => void) {
  window.addEventListener("todo-mutation", callback);

  return () => {
    window.removeEventListener("todo-mutation", callback);
  };
}
