export function getUsernameFromUrl(username: string) {
  const decodedUsername = decodeURIComponent(username);

  if (!decodedUsername.startsWith('@')) {
    return null;
  }

  return decodedUsername.slice(1);
}

export function getInitials(username: string) {
  return username.slice(0, 2);
}
