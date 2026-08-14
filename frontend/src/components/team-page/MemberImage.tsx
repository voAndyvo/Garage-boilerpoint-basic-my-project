'use client'

import Image from "next/image";

interface MemberImageProps {
    src: string
}

export function MemberImage({ src } : MemberImageProps) {
    return (
        <Image width={200} height={200} src={src} alt={src} onError={(e) => {e.currentTarget.src="/team-page/empty.jpg"; e.currentTarget.onerror = null;}} className="rounded-full" />
    );
}