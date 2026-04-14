import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { AdBanner } from './AdBanner';

interface ConfessionGuideScreenProps {
  onBack: () => void;
}

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, isOpen, onToggle, children }) => {
  return (
    <div className="mb-4 rounded-xl bg-obsidian/40 border border-primary-dim/30 overflow-hidden transition-all duration-300 hover:border-primary/40">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left active:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <h3 className={`text-[16px] font-bold font-display leading-tight transition-colors ${isOpen ? 'text-parchment' : 'text-parchment/80'}`}>
            {title}
          </h3>
        </div>
        <ChevronDown 
          className={`text-parchment-dim transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
          size={20} 
        />
      </button>
      
      <div 
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="p-5 pt-0 text-parchment-dim text-[15px] font-sans leading-relaxed space-y-4 border-t border-primary-dim/10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ConfessionGuideScreen: React.FC<ConfessionGuideScreenProps> = ({ onBack }) => {
  // Estado inicial null para que todas iniciem fechadas
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative flex h-full w-full flex-col bg-transparent text-parchment overflow-hidden font-display animate-in fade-in duration-500">
      
      {/* Background Texture Simulation */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent mix-blend-overlay"></div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between p-4 bg-transparent shrink-0">
        <button 
          onClick={onBack}
          className="text-parchment/70 hover:text-parchment transition-colors flex w-10 h-10 items-center justify-center rounded-full hover:bg-white/5"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-parchment text-lg font-medium tracking-wide">
          Guia de Confissão
        </h2>
        <div className="w-10 h-10"></div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 px-4 w-full max-w-lg mx-auto overflow-y-auto scroll-smooth pb-8">
        <div className="py-2">
            
          {/* Item 1 */}
          <AccordionItem 
            title="1. Entenda por que se confessar" 
            isOpen={openIndex === 0}
            onToggle={() => handleToggle(0)}
          >
            <p>
              A confissão é um encontro de renovação e alívio. Segundo o Papa Francisco, o perdão não é algo que damos a nós mesmos, mas sim um presente de Deus (um dom do Espírito Santo). Nesse momento, o padre atua em nome de Cristo para que sua alma seja verdadeiramente curada de suas falhas, restaurando a sua paz interior.
            </p>
            
          
              <h4 className="text-parchment font-bold text-base mb-2">Por que se confessar com frequência?</h4>
              <ul className="list-disc list-outside ml-4 space-y-2 marker:text-primary">
                <li><strong>Faxina na alma:</strong> Remove as falhas e aproxima você de Deus, trazendo alívio imediato.</li>
                <li><strong>Treino para o bem:</strong> Ajuda a perceber e vencer pequenos maus hábitos antes que eles cresçam.</li>
                <li><strong>Remédio, não castigo:</strong> Funciona como um auxílio para você se tornar uma pessoa melhor e mais forte.</li>
                <li><strong>Paz e alegria:</strong> Devolve a tranquilidade interior que o erro costuma roubar.</li>
              </ul>
           

            <h4 className="text-parchment font-bold text-base mb-2">A Origem da Confissão: Base Bíblica</h4>
            <p className="font-serif text-parchment/90 bg-white/5 p-3 rounded-lg border border-white/5 mt-2 mb-3">
              Tendo proferido estas palavras, soprou sobre eles e disse-lhes: "Recebei o Espírito Santo. Aqueles a quem perdoardes os pecados, ser-lhes-ão perdoados; àqueles a quem os retiverdes, ser-lhes-ão retidos. <span className="block text-xs text-right mt-1 opacity-60">- Jo 20, 22-23</span>
            </p>
            
            <ul className="space-y-2 mt-2">
                <li><strong>Vem de Jesus:</strong> Na Bíblia (João 20, 22-23), Jesus deu aos seus apóstolos o poder de perdoar pecados em Seu nome.</li>
                <li><strong>O Padre como Representante:</strong> O sacerdote funciona como uma ponte, agindo no lugar de Cristo para entregar a misericórdia de Deus a você.</li>
                <li><strong>Amizade Restaurada:</strong> O objetivo desse mandamento é reconstruir sua ligação com Deus e devolver a alegria ao seu coração.</li>
            </ul>
          </AccordionItem>

          {/* Item 2 */}
          <AccordionItem 
            title="2. Como se preparar agora" 
            isOpen={openIndex === 1}
            onToggle={() => handleToggle(1)}
          >
             <h4 className="text-parchment font-bold text-base">Os 5 Passos para uma boa confissão:</h4>
             <ol className="list-decimal list-inside space-y-2 ml-1 marker:text-primary marker:font-bold">
                <li><strong>Exame de Consciência:</strong> Reflita com calma sobre suas faltas.</li>
                <li><strong>Arrependimento:</strong> Peça a Deus a graça da dor sincera pelo pecado.</li>
                <li><strong>Propósito:</strong> Decida firmemente não voltar a pecar.</li>
                <li><strong>Confissão:</strong> Declare os pecados ao sacerdote.</li>
                <li><strong>Penitência:</strong> Cumpra o ato de reparação indicado.</li>
             </ol>

             <div className="bg-confess/10 border border-confess/20 rounded-lg p-4 mt-4">
                <h4 className="text-parchment font-bold text-base mb-2">Quando um pecado é mortal?</h4>
                <p className="text-base mb-2">Para romper gravemente a amizade com Deus, três condições são necessárias simultaneamente:</p>
                <ul className="list-disc list-outside ml-4 space-y-1 text-base marker:text-confess">
                    <li>Matéria Grave (contra a Lei de Deus).</li>
                    <li>Plena Advertência (sabia que era errado).</li>
                    <li>Pleno Consentimento (escolheu fazer livremente).</li>
                </ul>
                <p className="text-base mt-3 opacity-70">
                    *Na dúvida, confesse mesmo assim para paz de consciência.
                </p>
             </div>
          </AccordionItem>

          {/* Item 3 */}
          <AccordionItem 
            title="3. O que fazer e dizer na hora" 
            isOpen={openIndex === 2}
            onToggle={() => handleToggle(2)}
          >
             <h4 className="text-parchment font-bold text-base">O Passo a Passo da Confissão</h4>
             <ul className="space-y-3 mt-2">
                 <li className="flex gap-3">
                    <span className="bg-primary/20 text-primary font-bold text-xs h-5 w-5 flex items-center justify-center rounded-full shrink-0 mt-0.5">1</span>
                    <span><strong>Início e Acolhida:</strong> Escolha o formato (com ou sem divisória). Faça o sinal da cruz e informe ao padre há quanto tempo você não se confessa.</span>
                 </li>
                 <li className="flex gap-3">
                    <span className="bg-primary/20 text-primary font-bold text-xs h-5 w-5 flex items-center justify-center rounded-full shrink-0 mt-0.5">2</span>
                    <div className="flex flex-col gap-1">
                        <span><strong>A Confissão dos Pecados (Os 4 C's):</strong> Para que sua fala seja bem feita, tente seguir estas quatro regras:</span>
                        <div className="grid grid-cols-1 gap-2 mt-1 text-sm opacity-90">
                            <div className="bg-white/5 p-2 rounded">
                                <strong>Clara:</strong> Dê nome ao erro (ex: menti, roubei, senti ódio) sem usar palavras vagas que confundam o padre.
                            </div>
                            <div className="bg-white/5 p-2 rounded">
                                <strong>Concreta:</strong> Fale o que aconteceu de fato, sem generalizar. Se necessário, mencione quantas vezes o erro ocorreu.
                            </div>
                            <div className="bg-white/5 p-2 rounded">
                                <strong>Concisa:</strong> Seja direto. Não é necessário contar histórias longas, dar nomes de terceiros ou tentar se justificar.
                            </div>
                            <div className="bg-white/5 p-2 rounded">
                                <strong>Completa:</strong> Não esconda nada, especialmente o que for mais grave. A honestidade total é o que traz a cura.
                            </div>
                        </div>
                    </div>
                 </li>
                 <li className="flex gap-3">
                    <span className="bg-primary/20 text-primary font-bold text-xs h-5 w-5 flex items-center justify-center rounded-full shrink-0 mt-0.5">3</span>
                    <span><strong>Orientação e Penitência:</strong> O padre dará um conselho e passará uma "penitência" (uma oração ou boa ação) para ajudar no seu processo de mudança.</span>
                 </li>
                 <li className="flex gap-3">
                    <span className="bg-primary/20 text-primary font-bold text-xs h-5 w-5 flex items-center justify-center rounded-full shrink-0 mt-0.5">4</span>
                    <span><strong>Arrependimento e Perdão:</strong> Você reza o Ato de Contrição e o padre faz a oração da Absolvição, o momento em que Deus apaga os seus pecados.</span>
                 </li>
             </ul>

             <div className="mt-4 pt-4 border-t border-primary/20">
                 <h4 className="text-parchment font-bold text-base mb-2">Qual Ato de Contrição devo rezar?</h4>
                 <p>
                    Existem diferentes formas de expressar seu arrependimento. Você pode escolher a que mais tocar seu coração ou a que souber de cor. No final do seu exame, ofereceremos uma versão para que você leve ao confessionário. Não se preocupe, você poderá lê-la na hora.
                 </p>
             </div>
          </AccordionItem>

          {/* Item 4 */}
          <AccordionItem 
            title="4. Quando voltar a se confessar" 
            isOpen={openIndex === 3}
            onToggle={() => handleToggle(3)}
          >
            <p>
                A Igreja recomenda a confissão ao menos <strong>uma vez por ano</strong>. Porém, a confissão frequente (mensal, por exemplo) é poderosa para formar a consciência e progredir na vida espiritual.
            </p>
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 text-center">
                <h4 className="text-parchment font-bold text-lg font-display mb-1">Um Novo Começo</h4>
                <p className="font-serif text-base opacity-90">
                    "O Pai não espera que o filho chegue para decidir se o perdoará. Ele o vê de longe e corre ao seu encontro."
                </p>
                <p className="mt-2 text-sm">
                    Aproxime-se com confiança. O Pai espera por você.
                </p>
            </div>
          </AccordionItem>

        </div>
      </main>

       {/* Footer */}
       <footer className="relative z-20 w-full p-6 pt-2 shrink-0 flex flex-col items-center">
        <AdBanner className="mb-4" />

        <button
          onClick={onBack}
          className="w-full h-14 rounded-lg bg-primary hover:bg-primary-dim active:scale-[0.98] transition-all duration-200 flex items-center justify-center shadow-lg"
        >
          <span className="text-obsidian text-sm font-bold tracking-[0.1em] uppercase font-sans">
            Voltar para o início
          </span>
        </button>
      </footer>

    </div>
  );
};