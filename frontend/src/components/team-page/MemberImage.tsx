'use client'

interface MemberImageProps {
    src: string
}

export function MemberImage({ src } : MemberImageProps) {
    return (
        <img src={src} onError={(e) => {e.currentTarget.src="/team-page/empty.jpg"; e.currentTarget.onerror = null;}} className="rounded-full" />
    );
}