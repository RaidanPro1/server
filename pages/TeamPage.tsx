
import React from 'react';
import { TeamMember } from '../types';
import { ADVISORY_BOARD } from '../constants';
import { Users, UserCheck } from 'lucide-react';

interface TeamPageProps {
  team: TeamMember[];
}

// Updated component to accept team prop from parent to reflect CMS changes
const TeamPage: React.FC<TeamPageProps> = ({ team }) => {
  return (
    <div className="space-y-20 pb-20">
      <section className="space-y-12">
        <div className="flex items-center gap-4 border-r-4 border-press-blue pr-4">
           <Users size={32} className="text-press-blue" />
           <h1 className="text-3xl font-black text-press-dark">فريق بيت الصحافة</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {team.map((member) => (
            <div key={member.id} className="text-center group">
              <div className="relative mb-4 mx-auto w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-gray-100 group-hover:border-press-yellow transition-all">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <h3 className="font-black text-press-dark text-sm md:text-base">{member.name}</h3>
              <p className="text-press-blue text-xs font-bold mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-12 bg-gray-50 p-12 rounded-[3rem]">
        <div className="flex items-center gap-4 border-r-4 border-press-yellow pr-4">
           <UserCheck size={32} className="text-press-yellow" />
           <h1 className="text-3xl font-black text-press-dark">الهيئة الاستشارية</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {ADVISORY_BOARD.map((member) => (
            <div key={member.id} className="text-center group">
              <div className="relative mb-4 mx-auto w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-white group-hover:border-press-blue transition-all">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-black text-press-dark text-sm md:text-base">{member.name}</h3>
              <p className="text-gray-500 text-xs mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
