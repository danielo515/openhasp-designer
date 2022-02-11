const parser = (key, value) => {
  if (key !== "text") {
    return value;
  }
  value = value.replace(/[\uE000-\uFFFF]/g, function (chr) {
    return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4);
  });
  console.log("text", value);
  return value;
};

export function parseJsonL<T extends {}>(jsonl: string): T[] {
  try {
    const result = JSON.parse(jsonl, parser);
    if (!Array.isArray(result)) {
      throw new Error("JSONL must be an array");
    }
    return result;
  } catch (e) {
    console.log("failed to parse as raw JSON");
  }
  return jsonl.split("\n").map((line) => {
    try {
      return JSON.parse(line, parser);
    } catch (e) {
      console.error(`Error parsing line: ${line}`);
      return {};
    }
  });
}
