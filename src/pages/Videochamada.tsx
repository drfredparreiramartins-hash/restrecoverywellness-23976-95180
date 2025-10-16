import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Phone, Mic, MicOff, Video, VideoOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

const Videochamada = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<any>(null);
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [loading, setLoading] = useState(true);
  
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

    const initJitsi = () => {
      if (!window.JitsiMeetExternalAPI) {
        console.log('Aguardando carregamento do Jitsi...');
        setTimeout(initJitsi, 500);
        return;
      }

      try {
        const roomName = `telemedicina-${room}`;
        
        const jitsiApi = new window.JitsiMeetExternalAPI('meet.jit.si', {
          roomName: roomName,
          parentNode: containerRef.current,
          width: '100%',
          height: '100%',
          configOverride: {
            startWithAudioMuted: false,
            startWithVideoMuted: false,
            enableWelcomePage: false,
            prejoinPageEnabled: false,
            disableDeepLinking: true,
          },
          interfaceConfigOverride: {
            TOOLBAR_BUTTONS: [
              'microphone',
              'camera',
              'closedcaptions',
              'desktop',
              'fullscreen',
              'fodeviceselection',
              'hangup',
              'chat',
              'settings',
              'videoquality',
              'filmstrip',
              'tileview',
            ],
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            MOBILE_APP_PROMO: false,
          },
          userInfo: {
            displayName: role === 'doctor' ? 'Médico' : 'Paciente',
          },
        });

        jitsiApi.addEventListener('videoConferenceJoined', () => {
          console.log('Conferência iniciada');
          setLoading(false);
          toast({
            title: "Conectado!",
            description: "Você entrou na sala de consulta",
          });
        });

        jitsiApi.addEventListener('readyToClose', () => {
          navigate(-1);
        });

        jitsiApi.addEventListener('participantJoined', (participant: any) => {
          console.log('Participante entrou:', participant);
        });

        setApi(jitsiApi);
      } catch (error) {
        console.error('Erro ao inicializar Jitsi:', error);
        toast({
          title: "Erro",
          description: "Não foi possível iniciar a videochamada",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    initJitsi();

    return () => {
      if (api) {
        api.dispose();
      }
    };
  }, [room, role, navigate, toast]);

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
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg">Carregando sala de consulta...</p>
          </div>
        </div>
      )}
      <div className="flex-1 w-full h-full" ref={containerRef} />
    </div>
  );
};

export default Videochamada;
