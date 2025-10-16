import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, FileText, LogOut, Users, Video } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Doctor = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Portal do Médico</h1>
            <p className="text-muted-foreground mt-2">
              Bem-vindo(a), Dr(a). {user?.user_metadata?.full_name || user?.email}
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Calendar className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Gerenciar Agenda</CardTitle>
              <CardDescription>
                Configure seus horários disponíveis para consultas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Configurar Horários</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Clock className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Consultas Agendadas</CardTitle>
              <CardDescription>
                Veja e gerencie suas consultas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">Ver Agenda</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Users className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Meus Pacientes</CardTitle>
              <CardDescription>
                Acesse a lista e histórico de seus pacientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">Ver Pacientes</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Video className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Consulta Online</CardTitle>
              <CardDescription>
                Inicie consultas por vídeo chamada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" onClick={() => window.open(`/videochamada?role=doctor&room=${user?.id}`, '_blank')}>Iniciar Consulta</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <FileText className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Prontuários</CardTitle>
              <CardDescription>
                Acesse e edite prontuários dos pacientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">Ver Prontuários</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <FileText className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Relatórios</CardTitle>
              <CardDescription>
                Visualize estatísticas e relatórios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">Ver Relatórios</Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Doctor;
