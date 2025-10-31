import React, { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingCarouselProps {
  aspectRatio?: "square" | "wide"
  textPosition?: "top" | "bottom"
  showIndicators?: boolean
  backgroundTips?: boolean
  backgroundGradient?: boolean
  autoplayInterval?: number
  showNavigation?: boolean
  shuffleTips?: boolean
  showProgress?: boolean
}

const defaultTips = [
  "Podor Vert a planté plus de 15,000 arbres depuis 2020.",
  "Nos actions de reboisement aident à lutter contre la désertification au Sahel.",
  "Chaque don contribue à la formation des jeunes et à la protection de l'environnement.",
  "Le parrainage scolaire permet à un enfant de poursuivre ses études.",
  "L'agroécologie est au cœur de notre stratégie pour un développement durable.",
  "Rejoignez nos 101 ambassadeurs pour faire la différence sur le terrain.",
]

const backgroundImages = [
  "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1920",
  "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1920",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1920",
  "https://images.unsplash.com/photo-1574263867128-b9dbf5ad4b95?q=80&w=1920",
  "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=1920",
]

export function LoadingCarousel({
  aspectRatio = "square",
  textPosition = "bottom",
  showIndicators = true,
  backgroundTips = false,
  backgroundGradient = false,
  autoplayInterval = 5000,
  showNavigation = false,
  shuffleTips = false,
  showProgress = true,
}: LoadingCarouselProps) {
  const tips = useMemo(() => {
    return shuffleTips ? [...defaultTips].sort(() => Math.random() - 0.5) : defaultTips
  }, [shuffleTips])

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % tips.length)
    }, autoplayInterval)

    return () => clearInterval(timer)
  }, [autoplayInterval, tips.length])

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tips.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + tips.length) % tips.length)
  }

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index)
  }

  const containerClasses = cn(
    "relative w-full overflow-hidden rounded-lg",
    aspectRatio === "square" ? "aspect-square" : "aspect-video md:aspect-[2/1]"
  )

  const textContainerClasses = cn(
    "absolute left-0 w-full p-6 z-10",
    textPosition === "top" ? "top-0" : "bottom-0"
  )

  return (
    <div className={containerClasses}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={backgroundImages[currentIndex % backgroundImages.length]}
            alt={tips[currentIndex]}
            className="w-full h-full object-cover"
          />
          {backgroundGradient && (
            <div
              className={cn(
                "absolute inset-0",
                textPosition === "top"
                  ? "bg-gradient-to-b from-black/60 to-transparent"
                  : "bg-gradient-to-t from-black/60 to-transparent"
              )}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {backgroundTips && (
        <div className={textContainerClasses}>
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white text-sm md:text-base font-medium drop-shadow-md"
          >
            {tips[currentIndex]}
          </motion.p>
        </div>
      )}

      {showNavigation && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        </>
      )}

      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {tips.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentIndex === index ? "w-6 bg-white" : "w-2 bg-white/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {showProgress && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
          <motion.div
            key={currentIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: autoplayInterval / 1000, ease: "linear" }}
            className="h-full bg-white"
          />
        </div>
      )}
    </div>
  )
}
