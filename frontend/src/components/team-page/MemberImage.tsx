'use client'

import Image from "next/image";
import { useState } from "react";

interface MemberImageProps {
    src: string
}

export function MemberImage({ src } : MemberImageProps) {
    const [error, setError] = useState(false);
    return (
        <Image width={200} height={200} src={error ? "/empty.jpg" : src} alt={src} onError={(e) => {setError(true); e.currentTarget.onerror = null;}} className="rounded-full" />
    );
}