export function createSlug(input: string): string {
  const cleanedInput = input.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '');
  const slug = cleanedInput.replace(/\s+/g, '-');
  return slug;
}
