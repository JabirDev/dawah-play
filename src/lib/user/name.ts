export function getFirstName(fullName: string): string {
  // Split the full name string by whitespace
  const nameParts = fullName.trim().split(/\s+/);

  // Return the first element (which is the first name)
  return nameParts[0];
}

export function getInitials(fullName: string): string {
  // Split the full name string by whitespace
  const nameParts = fullName.trim().split(/\s+/);

  // Initialize an empty string for storing initials
  let initials = "";

  // Iterate over the name parts to build the initials
  for (const part of nameParts) {
    initials += part.charAt(0).toUpperCase();
  }

  return initials;
}
