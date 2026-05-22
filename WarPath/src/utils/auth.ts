export function usernameToEmail(username: string): string {
  return `${username.trim().toLowerCase()}@warpath.app`;
}
