import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackgroundImagePageLayoutProps {
  children: React.ReactNode;
  imageUrl?: string;
}

const BackgroundImagePageLayout: React.FC<BackgroundImagePageLayoutProps> = ({ 
  children, 
  imageUrl = '/images/background-podorvert.png' 
}) => {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed -z-20"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />
      <div className="absolute inset-0 bg-black/70 -z-10" />

      <div className="relative z-10 min-h-screen px-8 pb-8 pt-28 md:px-16 md:pb-16 md:pt-32 flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto w-full">
          {children}
        </div>
        
        {/* Bouton Retour */}
        <div className="text-center mt-12">
          <Link 
            to="/" 
            className="inline-flex items-center bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-800 transition-colors duration-300 font-semibold shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2"/>
            Retour au site
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BackgroundImagePageLayout;
