import React, { useState } from "react";
import BackgroundImagePageLayout from "../components/BackgroundImagePageLayout";

type ImageItem = {
  src: string;
  alt: string;
};

const GalleryPage: React.FC = () => {
  const allImages: ImageItem[] = [
    { src: "/images/gallery/2025_1.jpg", alt: "Podor Vert" },
    { src: "/images/gallery/2025_2.jpg", alt: "Podor Vert" },
    { src: "/images/gallery/2025_3.jpg", alt: "Podor Vert" },
    { src: "/images/gallery/2025_4.jpg", alt: "Podor Vert" },
    { src: "/images/gallery/2025_5.jpg", alt: "Podor Vert" },
    { src: "/images/gallery/2025_6.jpg", alt: "Podor Vert" },
    { src: "/images/gallery/2025_7.jpg", alt: "Podor Vert" },
    { src: "/images/gallery/2025_8.jpg", alt: "Podor Vert" },
    { src: "/images/gallery/rb1.jpg", alt: "Podor Vert" },
    { src: "/images/gallery/rb2.jpg", alt: "Podor Vert" },
    { src: "/images/gallery/rb3.jpg", alt: "Podor Vert" },
    { src: "/images/gallery/rb4.jpg", alt: "Podor Vert" },
    { src: "/images/gallery/rb5.jpg", alt: "Podor Vert" },
    { src: "/images/gallery/rb6.jpg", alt: "Podor Vert" },
    { src: "/images/gallery/rb7.jpg", alt: "Podor Vert" },
    { src: "/images/gallery/rb8.jpg", alt: "Podor Vert" },
    { src: "/images/gallery/podor_vert_ass2.png", alt: "Podor Vert" },
    { src: "/images/gallery/podor_vert_ass1.png", alt: "Podor Vert" },
    { src: "/images/gallery/amba3.png", alt: "Podor Vert" },
    { src: "/images/gallery/amba1.png", alt: "Podor Vert" },
    { src: "/images/gallery/amba-2.png", alt: "Podor Vert" },
    { src: "/images/gallery/112.webp", alt: "Podor Vert" },
    { src: "/images/gallery/111.webp", alt: "Podor Vert" },
    { src: "/images/gallery/110.webp", alt: "Podor Vert" },
    { src: "/images/gallery/109.webp", alt: "Podor Vert" },
    { src: "/images/gallery/108.webp", alt: "Podor Vert" },
    { src: "/images/gallery/107.webp", alt: "Podor Vert" },
    { src: "/images/gallery/106.webp", alt: "Podor Vert" },
    { src: "/images/gallery/105.png", alt: "Podor Vert" },
    { src: "/images/gallery/104.png", alt: "Podor Vert" },
    { src: "/images/gallery/103.png", alt: "Podor Vert" },
    { src: "/images/gallery/102.png", alt: "Podor Vert" },
    { src: "/images/gallery/101.png", alt: "Podor Vert" },
    { src: "/images/gallery/100.png", alt: "Podor Vert" },
    { src: "/images/gallery/99.png", alt: "Podor Vert" },
    { src: "/images/gallery/98.png", alt: "Podor Vert" },
    { src: "/images/gallery/97.png", alt: "Podor Vert" },
    { src: "/images/gallery/96.png", alt: "Podor Vert" },
    { src: "/images/gallery/95.png", alt: "Podor Vert" },
    { src: "/images/gallery/94.png", alt: "Podor Vert" },
    { src: "/images/gallery/93.png", alt: "Podor Vert" },
    { src: "/images/gallery/92.png", alt: "Podor Vert" },
    { src: "/images/gallery/91.png", alt: "Podor Vert" },
    { src: "/images/gallery/90.png", alt: "Podor Vert" },
    { src: "/images/gallery/89.png", alt: "Podor Vert" },
    { src: "/images/gallery/88.png", alt: "Podor Vert" },
    { src: "/images/gallery/87.png", alt: "Podor Vert" },
    { src: "/images/gallery/86.png", alt: "Podor Vert" },
    { src: "/images/gallery/85.png", alt: "Podor Vert" },
    { src: "/images/gallery/84.png", alt: "Podor Vert" },
    { src: "/images/gallery/83.png", alt: "Podor Vert" },
    { src: "/images/gallery/82.png", alt: "Podor Vert" },
    { src: "/images/gallery/81.png", alt: "Podor Vert" },
    { src: "/images/gallery/80.png", alt: "Podor Vert" },
    { src: "/images/gallery/69.png", alt: "Podor Vert" },
    { src: "/images/gallery/68.png", alt: "Podor Vert" },
    { src: "/images/gallery/67.png", alt: "Podor Vert" },
    { src: "/images/gallery/66.png", alt: "Podor Vert" },
    { src: "/images/gallery/65.png", alt: "Podor Vert" },
    { src: "/images/gallery/64.png", alt: "Podor Vert" },
    { src: "/images/gallery/63.png", alt: "Podor Vert" },
    { src: "/images/gallery/62.png", alt: "Podor Vert" },
    { src: "/images/gallery/61.png", alt: "Podor Vert" },
    { src: "/images/gallery/60.png", alt: "Podor Vert" },
    { src: "/images/gallery/59.png", alt: "Podor Vert" },
    { src: "/images/gallery/58.png", alt: "Podor Vert" },
    { src: "/images/gallery/57.png", alt: "Podor Vert" },
    { src: "/images/gallery/56.png", alt: "Podor Vert" },
    { src: "/images/gallery/55.png", alt: "Podor Vert" },
    { src: "/images/gallery/54.png", alt: "Podor Vert" },
    { src: "/images/gallery/53.png", alt: "Podor Vert" },
    { src: "/images/gallery/52.png", alt: "Podor Vert" },
    { src: "/images/gallery/51.png", alt: "Podor Vert" },
    { src: "/images/gallery/50.png", alt: "Podor Vert" },
    { src: "/images/gallery/49.png", alt: "Podor Vert" },
    { src: "/images/gallery/48.png", alt: "Podor Vert" },
    { src: "/images/gallery/47.png", alt: "Podor Vert" },
    { src: "/images/gallery/46.png", alt: "Podor Vert" },
    { src: "/images/gallery/45.png", alt: "Podor Vert" },
    { src: "/images/gallery/44.png", alt: "Podor Vert" },
    { src: "/images/gallery/43.png", alt: "Podor Vert" },
    { src: "/images/gallery/42.png", alt: "Podor Vert" },
    { src: "/images/gallery/36.png", alt: "Podor Vert" },
    { src: "/images/gallery/35.png", alt: "Podor Vert" },
    { src: "/images/gallery/34.png", alt: "Podor Vert" },
    { src: "/images/gallery/33.png", alt: "Podor Vert" },
    { src: "/images/gallery/32.png", alt: "Podor Vert" },
    { src: "/images/gallery/31.png", alt: "Podor Vert" },
    { src: "/images/gallery/30.png", alt: "Podor Vert" },
    { src: "/images/gallery/29.png", alt: "Podor Vert" },
    { src: "/images/gallery/27.png", alt: "Podor Vert" },
    { src: "/images/gallery/26.png", alt: "Podor Vert" },
    { src: "/images/gallery/21.png", alt: "Podor Vert" },
    { src: "/images/gallery/20.png", alt: "Podor Vert" },
    { src: "/images/gallery/19.png", alt: "Podor Vert" },
    { src: "/images/gallery/18.png", alt: "Podor Vert" },
    { src: "/images/gallery/17.png", alt: "Podor Vert" },
    { src: "/images/gallery/16.png", alt: "Podor Vert" },
    { src: "/images/gallery/15.png", alt: "Podor Vert" },
    { src: "/images/gallery/14.png", alt: "Podor Vert" },
    { src: "/images/gallery/13.png", alt: "Podor Vert" },
    { src: "/images/gallery/12.png", alt: "Podor Vert" },
  ];

  const totalRows = 30;
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  return (
    <BackgroundImagePageLayout imageUrl="/images/background-banner.jpg">
      <div className="w-full text-center overflow-x-hidden">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-green-600 via-yellow-400 to-green-700 bg-clip-text text-transparent">
          Notre Médiathèque
        </h1>

        <div className="space-y-10 w-full">
          {Array.from({ length: totalRows }).map((_, rowIndex) => {
            const isScrollingRight = rowIndex % 2 === 0;
            const rowImages = Array.from({ length: 6 }).map(
              (_, imgIndex) =>
                allImages[(rowIndex * 6 + imgIndex) % allImages.length]
            );

            return (
              <div key={rowIndex} className="overflow-hidden group w-full">
                <div
                  className={`flex w-full justify-start ${
                    isScrollingRight
                      ? "animate-scroll-right"
                      : "animate-scroll-left"
                  } group-hover:[animation-play-state:paused] space-x-6`}
                >
                  {[...rowImages, ...rowImages].map((image, index) => (
                    <img
                      key={`${rowIndex}-${index}`}
                      src={image.src}
                      alt={image.alt}
                      className="h-48 md:h-60 flex-shrink-0 rounded-lg shadow-xl hover:!scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Zoom */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-h-[90%] max-w-[90%] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </BackgroundImagePageLayout>
  );
};

export default GalleryPage;
