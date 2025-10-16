import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Phone, Mic, MicOff, Video, VideoOff } from "lucide-react";

const Videochamada = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<any>(null);
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  
  const role = searchParams.get('role');
  const room = searchParams.get('room');

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (!containerRef.current || !room) return;

    const roomName = `telemedicina-${room}`;
    
    // @ts-ignore
    const jitsiApi = new window.JitsiMeetExternalAPI('meet.jit.si', {
      roomName: roomName,
      parentNode: containerRef.current,
      configOverride: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        enableWelcomePage: false,
      },
      interfaceConfigOverride: {
        TOOLBAR_BUTTONS: [
          'microphone',
          'camera',
          'hangup',
          'chat',
          'fullscreen',
        ],
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
      },
      userInfo: {
        displayName: role === 'doctor' ? 'Médico' : 'Paciente',
      },
    });

    setApi(jitsiApi);

    jitsiApi.addEventListener('readyToClose', () => {
      navigate(-1);
    });

    return () => {
      jitsiApi?.dispose();
    };
  }, [room, role, navigate]);

  const toggleAudio = () => {
    if (api) {
      api.executeCommand('toggleAudio');
      setAudioMuted(!audioMuted);
    }
  };

  const toggleVideo = () => {
    if (api) {
      api.executeCommand('toggleVideo');
      setVideoMuted(!videoMuted);
    }
  };

  const endCall = () => {
    api?.executeCommand('hangup');
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1" ref={containerRef} />
      
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <Button
          variant={audioMuted ? "destructive" : "outline"}
          size="icon"
          onClick={toggleAudio}
        >
          {audioMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
        
        <Button
          variant={videoMuted ? "destructive" : "outline"}
          size="icon"
          onClick={toggleVideo}
        >
          {videoMuted ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
        </Button>
        
        <Button
          variant="destructive"
          size="icon"
          onClick={endCall}
        >
          <Phone className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Videochamada;
