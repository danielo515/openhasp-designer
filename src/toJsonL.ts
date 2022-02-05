export function toJsonL<T extends {}>(data: T[]): string {
  return data.map((item) => JSON.stringify(item)).join("\n");
}
