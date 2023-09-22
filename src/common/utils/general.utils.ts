export const wait = (time: number) => {
  return new Promise<void>(resolve => setTimeout(resolve, time));
};
