import React, { useState, useRef } from 'react';
import { 
  Camera, CameraOff, Mic, MicOff, PhoneOff, Video, 
  MonitorUp, Settings, MoreVertical 
} from 'lucide-react';
import { Card, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const VideoCalling: React.FC = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // 1. Logic: Start/End Call
  const toggleCall = async () => {
    if (!isCalling) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setIsCalling(true);
      } catch (err) {
        console.error("Error accessing media devices:", err);
        alert("Please allow camera/mic access to start the mock call.");
      }
    } else {
      stopAllTracks();
      setIsCalling(false);
      setIsSharing(false);
    }
  };

  const stopAllTracks = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  // 2. Logic: Video + Audio Toggle
  const toggleMic = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks()[0].enabled = isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleCamera = () => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks()[0].enabled = isCamOff;
      setIsCamOff(!isCamOff);
    }
  };

  // 3. Logic: Screen Share
  const toggleScreenShare = async () => {
    if (!isSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = screenStream;
        setIsSharing(true);
        
        // Listen for when user clicks "Stop Sharing" on the browser popup
        screenStream.getVideoTracks()[0].onended = () => {
          if (videoRef.current) videoRef.current.srcObject = streamRef.current;
          setIsSharing(false);
        };
      } catch (err) {
        console.error("Screen share cancelled", err);
      }
    } else {
      if (videoRef.current) videoRef.current.srcObject = streamRef.current;
      setIsSharing(false);
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800 overflow-hidden shadow-2xl">
      <CardBody className="p-0 relative">
        {/* Main Video Window */}
        <div className="aspect-video bg-black flex items-center justify-center relative">
          {isCalling ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted // Muted locally to prevent feedback loops
              className={`w-full h-full object-cover ${isCamOff && !isSharing ? 'hidden' : 'block'}`}
            />
          ) : (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                <Video size={40} className="text-gray-600" />
              </div>
              <p className="text-gray-400 font-medium">Ready to join the meeting?</p>
            </div>
          )}

          {/* Placeholder when camera is off */}
          {isCalling && isCamOff && !isSharing && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                MA
              </div>
            </div>
          )}

          {/* Call UI Overlays */}
          {isCalling && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-red-500/80 text-white border-none animate-pulse">● REC 00:12</Badge>
            </div>
          )}
        </div>

        {/* Control Bar */}
        <div className="p-4 bg-gray-800/50 backdrop-blur-md flex items-center justify-between">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className={`rounded-full p-3 border-gray-600 ${isMuted ? 'bg-red-500/20 text-red-500 border-red-500/50' : 'text-gray-300'}`}
              onClick={toggleMic}
              disabled={!isCalling}
            >
              {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            </Button>
            <Button 
              variant="outline" 
              className={`rounded-full p-3 border-gray-600 ${isCamOff ? 'bg-red-500/20 text-red-500 border-red-500/50' : 'text-gray-300'}`}
              onClick={toggleCamera}
              disabled={!isCalling}
            >
              {isCamOff ? <CameraOff size={20} /> : <Camera size={20} />}
            </Button>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className={`rounded-full px-4 border-gray-600 ${isSharing ? 'bg-primary-600 border-primary-600 text-white' : 'text-gray-300'}`}
              onClick={toggleScreenShare}
              disabled={!isCalling}
              leftIcon={<MonitorUp size={18} />}
            >
              Share
            </Button>
            <Button 
              onClick={toggleCall}
              variant={isCalling ? "danger" : "primary"}
              className="rounded-full px-6 font-bold"
              leftIcon={isCalling ? <PhoneOff size={18} /> : <Video size={18} />}
            >
              {isCalling ? "End Call" : "Start Call"}
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" className="text-gray-400 p-2"><Settings size={20} /></Button>
            <Button variant="ghost" className="text-gray-400 p-2"><MoreVertical size={20} /></Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};