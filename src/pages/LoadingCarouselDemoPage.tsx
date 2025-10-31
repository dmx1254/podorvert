import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingCarousel } from "@/components/ui/loading-carousel"

export function LoadingCarouselDemoPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-32 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">Loading Carousel Demo</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Default LoadingCarousel</CardTitle>
          </CardHeader>
          <CardContent>
            <LoadingCarousel />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wide Aspect Ratio with Top Text</CardTitle>
          </CardHeader>
          <CardContent>
            <LoadingCarousel
              aspectRatio="wide"
              textPosition="top"
              showIndicators={false}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Background Tips + Gradient</CardTitle>
          </CardHeader>
          <CardContent>
            <LoadingCarousel
              aspectRatio="wide"
              backgroundTips={true}
              backgroundGradient={true}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Custom Interval and Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <LoadingCarousel autoplayInterval={2000} showNavigation={true} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shuffled Tips with Custom Interval</CardTitle>
          </CardHeader>
          <CardContent>
            <LoadingCarousel
              shuffleTips={true}
              autoplayInterval={3000}
              showProgress={false}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Square Aspect Ratio with Background Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <LoadingCarousel
              aspectRatio="square"
              backgroundTips={true}
              backgroundGradient={true}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoadingCarouselDemoPage;
