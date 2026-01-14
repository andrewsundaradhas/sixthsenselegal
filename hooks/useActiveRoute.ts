'use client'

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

interface NavItem {
    href: string;
}

export function useActiveRoute(items: NavItem[]) {
    const pathname = usePathname();

    return useMemo(() => {
        const index = items.findIndex(item => item.href === pathname);
        return index >= 0 ? index : 0;
    }, [pathname, items]);
}
