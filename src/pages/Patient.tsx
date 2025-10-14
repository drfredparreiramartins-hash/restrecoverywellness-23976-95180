import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar as CalendarIcon, LogOut, FileText, Video, Upload } from "lucide-react";

const Patient = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isPatient, setIsPatient] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "patient")
      .single();

    if (!roleData) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para acessar esta página.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setIsPatient(true);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <p className="text-white">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Área do Paciente</h1>
              <p className="text-blue-200">Gerencie suas consultas e documentos médicos</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Agendar Consulta</CardTitle>
                <CardDescription>
                  Veja os horários disponíveis e agende sua consulta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Ver Horários Disponíveis
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Minhas Consultas</CardTitle>
                <CardDescription>
                  Veja suas consultas agendadas e histórico
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-4">
                  Nenhuma consulta agendada
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documentos e Exames</CardTitle>
                <CardDescription>
                  Faça upload e gerencie seus documentos médicos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Fazer Upload
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prontuário Médico</CardTitle>
                <CardDescription>
                  Acesse seu histórico médico e prescrições
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Ver Prontuário
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Consulta por Vídeo</CardTitle>
                <CardDescription>
                  Participe de consultas online com seu médico
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  <Video className="mr-2 h-4 w-4" />
                  Entrar na Consulta
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Patient;
