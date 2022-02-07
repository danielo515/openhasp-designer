export function toJsonL<T extends {}>(data: ReadonlyArray<T>): string {
  return data.map((item) => JSON.stringify(item)).join("\n");
}
