export function parseJsonL<T extends {}>(jsonl: string): T[] {
  return jsonl.split("\n").map((line) => {
    try {
      return JSON.parse(line);
    } catch (e) {
      console.error(`Error parsing line: ${line}`);
      return {};
    }
  });
}
