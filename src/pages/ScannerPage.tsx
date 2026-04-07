import { Button } from "@/components/ui/button"
import { useCallback, useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"

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

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current!.getScreenshot()
    console.log(imageSrc)
  }, [webcamRef])

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
    <div className="flex flex-col items-center gap-4 w-full p-4 mx-auto max-w-md">
      <Webcam 
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width:  720,
          height: 1280,
          facingMode: "environment"
        }}
        className="w-full h-auto rounded-lg shadow-sm"
      />
      <Button onClick={capture} className="w-full">
        Capture
      </Button>
    </div>
  )
}

export default ScannerPage