"use client";

import { useEffect, useState } from "react";

export default function ProfileForm({session}) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(null);
    if (session) setUser(session.user);
  }, [session])

  return user && <>
    {user.name}
  </>
}
