import { useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"
import { RiArrowLeftLine, RiSettings3Line } from "@remixicon/react"

const ScannerPage = () => {
  const webcamRef = useRef<Webcam>(null)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    handleResize()
    
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!isMobile) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[50vh]">
        <h2 className="text-2xl font-bold mb-2">Mobile Version Only</h2>
        <p className="text-muted-foreground">
          The scanner feature is only available on mobile devices or smaller screen sizes. 
          Please use a mobile device or resize your browser window.
        </p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden flex flex-col">
      {/* Top Bar Layer */}
      <div className="absolute top-0 inset-x-0 h-[60px] bg-[#2f6634] flex items-center justify-between px-4 z-20 shadow-md">
        <button 
          onClick={() => window.history.back()}
          className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
        >
          <RiArrowLeftLine className="text-white w-6 h-6" />
        </button>
        <span className="text-white font-bold tracking-[0.15em] text-[15px]">SCANNING</span>
        <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
          <RiSettings3Line className="text-white w-6 h-6" />
        </button>
      </div>

      <Webcam 
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: "environment"
        }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay Mask with Cutout */}
      <div className="absolute inset-0 pt-[60px] pointer-events-none z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] max-w-[420px] aspect-[1/1.414] shadow-[0_0_0_9999px_rgba(0,0,0,0.55)]">
          {/* Top-Left Viewfinder */}
          <div className="absolute top-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-white/40 backdrop-blur-[1px]">
          </div>
          {/* Top-Right Viewfinder */}
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-white/40 backdrop-blur-[1px]">
          </div>
          {/* Bottom-Left Viewfinder */}
          <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-white/40 backdrop-blur-[1px]">
          </div>
          {/* Bottom-Right Viewfinder */}
          <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-white/40 backdrop-blur-[1px]">
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScannerPage