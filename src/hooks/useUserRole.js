import { useEffect, useState } from 'react';

export function useUserRole() {
  const [userRole, setUserRole] = useState('');
  const localStorageKey = 'sb-rwmikspgfduaaduwxpiv-auth-token';
  useEffect(() => {
    if (localStorage.getItem(localStorageKey)) {
      const currentUserRole = JSON.parse(localStorage.getItem(localStorageKey))
        .user?.user_metadata?.userRole;
      setUserRole(currentUserRole);
    }
  }, [userRole]);

  return userRole;
}
