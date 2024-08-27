export function waitTimer() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Timer done");
    }, 2000);  // Set the appropriate delay
  });
}
  