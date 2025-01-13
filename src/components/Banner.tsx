import React from 'react';

interface BannerProps {
  icon: string; // Path to the banner icon/image
  title: string; // Banner title
  subtitle: string; // Banner subtitle
}

export const Banner: React.FC<BannerProps> = ({ icon, title, subtitle }) => {
  return (
    <div className="left-0 w-full bg-gray-900 text-white py-16 flex flex-col items-center">
      <div className="flex flex-col items-center">
        {/* Icon */}
        <img
          src={icon}
          alt="Banner Icon"
          className="w-32 h-32 mb-8"
        />
        {/* Title */}
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        {/* Subtitle */}
        <p className="text-lg text-gray-300">{subtitle}</p>
      </div>
    </div>
  );
};
