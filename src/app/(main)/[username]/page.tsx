import React from 'react';

export default function UserPage({ params }: { params: { username: string } }) {
  const username = decodeURIComponent(params.username);

  return <div>{username}</div>;
}
