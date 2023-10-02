export const handleKeyDown = (event: KeyboardEvent, callback: () => void) => {
  if (event.key === "Enter") {
    return callback();
  }
};
