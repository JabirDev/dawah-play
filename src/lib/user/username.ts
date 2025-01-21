export function extractUsernameFromYoutubeUrl(url: string): string | null {
  // Define the regular expression to match the pattern @username in YouTube URLs
  const regex = /https:\/\/www\.youtube\.com\/@([a-zA-Z0-9_]+)/;

  // Use the match method to find the match
  const match = url.match(regex);

  // If a match is found, return the username; otherwise, return null
  return match ? `@${match[1]}` : null;
}
