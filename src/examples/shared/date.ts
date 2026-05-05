const pad = (value: number) => String(value).padStart(2, "0");

export function formatDateYMD(input: unknown): string {
  const date = input instanceof Date ? input : new Date(input as string | number | Date);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  return `${year}-${month}-${day}`;
}

export function parseInputDate(input: string): Date {
  const [year, month, day] = input.split("-").map(Number);
  if (!year || !month || !day) {
    return new Date(input);
  }

  return new Date(year, month - 1, day);
}