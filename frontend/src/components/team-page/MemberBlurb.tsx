'use client'

interface MemberBlurbProps {
    blurb: string
}

export function MemberBlurb({ blurb } : MemberBlurbProps) {
    const checkLength = () => {
        if (blurb.length > 200) {
            let newString: string = blurb.substring(0, 197);
            newString += "...";

            return newString
        }

        return blurb
    }

    return (
        <p className="text-medium font-medium text-black">{checkLength()}</p>
    );
}