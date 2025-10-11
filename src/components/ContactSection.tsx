
import { Mail, Phone, Instagram } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium mb-4">
              Entre em Contato
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Pronto Para Começar Sua Jornada?
            </h2>
            <p className="text-lg text-slate-600 mb-10">
              Entre em contato para agendar uma consulta ou tirar dúvidas sobre terapia, 
              psicanálise ou parcerias profissionais.
            </p>
            
            <div className="space-y-8">

              {/* WhatsApp */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone size={24} className="text-purple-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">WhatsApp</h3>
                  <p className="text-slate-600">
                    +55 32 9193-1779
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail size={24} className="text-purple-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">E-mail (Parcerias)</h3>
                  <p className="text-slate-600">
                    parcerias@drfredmartins.com.br
                  </p>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Instagram size={24} className="text-purple-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Instagram</h3>
                  <a 
                    href="https://instagram.com/drfredmartinsjf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-700 hover:text-purple-900 font-medium"
                  >
                    @drfredmartinsjf
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-slate-900">Envie Uma Mensagem</h3>
            <div className="bg-white rounded-lg shadow-lg p-4 overflow-auto">
              <iframe
                id="JotFormIFrame-251135682357156"
                title="Rest Recovery Contact"
                onLoad={() => window.parent.scrollTo(0,0)}
                allowTransparency={true}
                allow="geolocation; microphone; camera; fullscreen"
                src="https://form.jotform.com/251135682357156"
                frameBorder={0}
                style={{ 
                  width: '100%', 
                  maxWidth: '640px', 
                  height: '600px', 
                  border: 'none',
                  margin: '0 auto',
                  display: 'block'
                }}
                scrolling="yes"
              />
              <script src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js" />
              <script dangerouslySetInnerHTML={{
                __html: `
                  window.jotformEmbedHandler("iframe[id='JotFormIFrame-251135682357156']", "https://form.jotform.com/")
                `
              }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
