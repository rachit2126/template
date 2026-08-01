import React, { useRef } from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function DmChatSlider() {
  // Real Chat Feedback Data matching Instagram DMs
  const row1Chats = [
    {
      id: 1,
      image: '/chat_1.png',
      text: "It's great and she loved that msg which I've sent her ..and thanks for helping like mai kuch nhi kr pata if aap pese leke chle bhi jaate to still you replied and helped me by making that for me ..it shows you want to work in a genuine way ..and isi wjeh se you will grow more bro for sure 👍",
      name: 'Rohan',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 2,
      image: '/chat_2.png',
      text: "Hey! Just wanted to say I really liked your work and the moment your reel came into my feed i wanted to make this. Thank you so much for your help and everything it's seriously appreciated! The outcome is very amazing thank you and wow 😇",
      name: 'Priya',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 3,
      image: '/chat_3.png',
      text: "Thank you so much bro, you have made it very well, it is even better than what I had thought, thank you so much brother, I liked it very much 🥳❤️❤️",
      name: 'Arjun',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 4,
      image: '/chat_4.png',
      text: "aww cuteee It was honestly so creative and heartwarming, felt really special. 🥺💖 thankyou so much for putting your effort into making it so adorable.",
      name: 'Sneha',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80'
    }
  ];

  const row2Chats = [
    {
      id: 5,
      text: "Bro I have a compliment for you and this is also feedback for your work. In a world where people break hearts, someone is working to mend them by his skills love it brother ❤️",
      name: 'Vikram',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 6,
      text: "BROOOOO GUESSSS WHATTTT SHES NOT LEAVING MEEE!!!!! THANKKK YOUUU MANNNN💖😭",
      name: 'Aman',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 7,
      text: "Thank you brother I dont know anything about code but all thanks to you I am able to pull of this surprise ✨❤️",
      name: 'Karan',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 8,
      text: "Heyy! You solved it via mail. Thank you. It turned out really pretty and she cried happy tears! 🥺💖",
      name: 'Ananya',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
    }
  ];

  // Duplicate for seamless loop
  const infiniteRow1 = [...row1Chats, ...row1Chats, ...row1Chats];
  const infiniteRow2 = [...row2Chats, ...row2Chats, ...row2Chats];

  return (
    <section className="py-16 relative overflow-hidden font-['Plus_Jakarta_Sans'] text-left">
      
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5 text-pink-600" /> WHAT PEOPLE ARE SAYING
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
          People who made <span className="gradient-text">something special</span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto">
          These are real people who had a moment worth sharing. Here's what they said after.
        </p>
      </div>

      {/* Infinite Marquee Slider Container */}
      <div className="space-y-6 relative">
        
        {/* Left & Right Fade Overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F8F9FE] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F8F9FE] to-transparent z-20 pointer-events-none" />

        {/* Row 1 - Marquee Left */}
        <div className="flex gap-6 overflow-x-auto scrollbar-none py-2 px-4 group">
          <div className="flex gap-6 animate-[marqueeLeft_35s_linear_infinite] group-hover:[animation-play-state:paused]">
            {infiniteRow1.map((chat, idx) => (
              <div key={idx} className="flex-shrink-0 w-80 sm:w-96 select-none">
                
                {chat.image ? (
                  /* Uploaded Exact Screenshot Card */
                  <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all bg-black p-1.5">
                    <img 
                      src={chat.image} 
                      alt="Instagram DM Feedback" 
                      className="w-full rounded-2xl object-cover"
                    />
                  </div>
                ) : (
                  /* Dynamic Instagram DM Chat Bubble Card */
                  <div className="relative pt-2 pb-6 px-1">
                    <div className="bg-[#262626] text-white p-5 rounded-3xl shadow-xl space-y-2 border border-white/10 relative">
                      <p className="text-xs sm:text-sm leading-relaxed font-normal text-slate-100">
                        {chat.text}
                      </p>
                      
                      {/* Heart Reaction Badge */}
                      <div className="absolute -bottom-3 left-6 bg-[#262626] border border-white/20 rounded-full w-7 h-7 flex items-center justify-center shadow-lg">
                        <span className="text-xs">❤️</span>
                      </div>
                    </div>

                    {/* Sender Avatar */}
                    <div className="absolute left-0 bottom-0 w-7 h-7 rounded-full overflow-hidden border border-white/30 shadow-md">
                      <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Marquee Right */}
        <div className="flex gap-6 overflow-x-auto scrollbar-none py-2 px-4 group">
          <div className="flex gap-6 animate-[marqueeRight_40s_linear_infinite] group-hover:[animation-play-state:paused]">
            {infiniteRow2.map((chat, idx) => (
              <div key={idx} className="flex-shrink-0 w-80 sm:w-96 select-none">
                <div className="relative pt-2 pb-6 px-1">
                  <div className="bg-[#262626] text-white p-5 rounded-3xl shadow-xl space-y-2 border border-white/10 relative">
                    <p className="text-xs sm:text-sm leading-relaxed font-normal text-slate-100">
                      {chat.text}
                    </p>
                    
                    {/* Heart Reaction Badge */}
                    <div className="absolute -bottom-3 left-6 bg-[#262626] border border-white/20 rounded-full w-7 h-7 flex items-center justify-center shadow-lg">
                      <span className="text-xs">❤️</span>
                    </div>
                  </div>

                  {/* Sender Avatar */}
                  <div className="absolute left-0 bottom-0 w-7 h-7 rounded-full overflow-hidden border border-white/30 shadow-md">
                    <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
