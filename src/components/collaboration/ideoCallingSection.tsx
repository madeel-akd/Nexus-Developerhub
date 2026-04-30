import React, { useState, useRef, useEffect } from 'react';
import { Camera, CameraOff, Mic, MicOff, PhoneOff, MonitorUp, User } from 'lucide-react';
import { Card, CardBody } from '../ui/Card';
import { Button } from '../ui/Button';

export const VideoCallingSection: React.FC = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  // Mock starting a call (Accessing local media)
  const startCall = async () => {
    setIsCallActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  const endCall = () => {
    setIsCallActive(false);
    const stream = localVideoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
  };

  return (
    <Card className="bg-gray-900 border-gray-800 overflow-hidden">
      <CardBody className="p-0 relative bg-black aspect-video flex items-center justify-center">
        {isCallActive ? (
          <>
            {/* Main Video Feed (Remote - Mocked as local for now) */}
            <video 
              ref={localVideoRef} 
              autoPlay 
              muted={isMuted}
              className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : 'block'}`}
            />
            
            {/* Placeholder when Video is Off */}
            {isVideoOff && (
              <div className="flex flex-col items-center text-gray-500">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <User size={48} />
                </div>
                <p>Camera is Off</p>
              </div>
            )}

            {/* Mini Self View (Bottom Right) */}
            <div className="absolute bottom-20 right-4 w-32 h-24 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-2xl">
               <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">Self View</div>
            </div>
          </>
        ) : (
          <div className="text-center p-8">
            <div className="bg-primary-500/10 p-4 rounded-full inline-block mb-4">
              <Camera size={40} className="text-primary-500" />
            </div>
            <h3 className="text-white text-xl font-semibold">Ready to connect?</h3>
            <p className="text-gray-400 mt-2 mb-6">Start a secure video meeting with your team or investors.</p>
            <Button onClick={startCall} className="bg-primary-600 hover:bg-primary-700">
              Start New Call
            </Button>
          </div>
        )}

        {/* Control Bar */}
        {isCallActive && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-center items-center gap-4">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-700'} text-white transition-colors`}
            >
              {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            
            <button 
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-3 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-gray-700'} text-white transition-colors`}
            >
              {isVideoOff ? <CameraOff size={20} /> : <Camera size={20} />}
            </button>

            <button className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600">
              <MonitorUp size={20} />
            </button>

            <button 
              onClick={endCall}
              className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors ml-4"
            >
              <PhoneOff size={20} />
            </button>
          </div>
        )}
      </CardBody>
    </Card>
  );
};