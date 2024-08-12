'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem('admin-auth');
        if (!isAuthenticated) {
            router.push('/admin/login');
        } else {
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
    }

    return <>{children}</>;
}

export default ProtectedRoute;