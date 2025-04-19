'use client';

import { useRouter } from 'next/navigation';

export default function ProfileIcon() {
  const router = useRouter();
  
  const handleClick = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    } else {
      // Handle showing profile menu or other actions
    }
  };

  return (
    <button onClick={handleClick} className="...your existing classes...">
      {/* ...existing icon JSX... */}
    </button>
  );
}
