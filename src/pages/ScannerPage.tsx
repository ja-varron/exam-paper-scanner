import { Button } from "@/components/ui/button"
import { useCallback, useRef } from "react"
import Webcam from "react-webcam"

const ScannerPage = () => {
  const webcamRef = useRef<Webcam>(null)
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current!.getScreenshot()
    console.log(imageSrc)
  }, [webcamRef])

  return (
    <>
      <Webcam 
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: "environment"
        }}
      />
      <Button onClick={capture}>
        Capture
      </Button>
    </>
  )
}

export default ScannerPage