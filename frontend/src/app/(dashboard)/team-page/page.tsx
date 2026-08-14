import type { Metadata } from 'next'
import { MemberImage } from '@/components/team-page/MemberImage'
import { MemberBlurb } from '@/components/team-page/MemberBlurb'

export const metadata: Metadata = {
  title: 'TeamPage',
}

export default async function TeamPage() {
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-5xl font-bold text-black text-center">Team Page</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {([
            {image: "/andy.jpg", name: 'Andy Vo', role: 'PM', blurb: 'loren ispon'},
            {image: "/sylvia.jpg", name: 'Sylvia Huynh', role: 'Dev 1', blurb: 'Making spaghetti out of code and yarn! Also I like yapping a lot, beware your ears. They may fall off. Or your eyeballs, if I\'m texting. Like how much do I need to say for it to reach the max character limit, I wonder.'},
            {image: "/joshua.jpg", name: 'Joshua Yao', role: 'Dev 2', blurb: 'Figuring it out as I go and making things work.'},
            {image: "/tanvi.jpg", name: 'Tanvi Nunna', role: 'UX', blurb: 'I\'m a Computer Science student with a passion for technology and learning new skills.'}
          ]).map((member) => (
          <div
            key={member.name}
            className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm text-wrap wrap-break-word justify-items-center"
          >
            <MemberImage src={member.image} />
            <p className="text-2xl font-bold text-black text-center mt-3 mb-3">{member.name}</p>
            <p className="text-2xl font-bold text-[#663ec7] text-center bg-[#d8cbf5] rounded-xl pr-15 pl-15 mb-3">{member.role}</p>
            <MemberBlurb blurb={member.blurb} />
          </div>
        ))}
      </div>
    </div>
  )
}
