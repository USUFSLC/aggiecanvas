const RED = "\u001b[31m";
const GREEN = "\u001b[32m";
const RESET = "\u001b[0m";

export const logOverPromise = async <T>(
  message: string,
  promise: Promise<T>
) => {
  process.stdout.write(message + "...");
  let res;
  try {
    res = await promise;
  } catch (e) {
    process.stdout.write(` ${RED}failed${RESET}\n`);
    throw e;
  }
  process.stdout.write(` ${GREEN}done${RESET}!\n`);
  return res;
};
