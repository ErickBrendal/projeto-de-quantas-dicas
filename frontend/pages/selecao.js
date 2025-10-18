import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Selecao() {
  const [tema, setTema] = useState('coisas');
  const [modo, setModo] = useState('individual');
  const router = useRouter();

  const iniciarJogo = () => {
    router.push(`/jogo?tema=${tema}&modo=${modo}`);
  };

  return (
    <div className="game-bg flex flex-col items-center justify-center text-white p-8 min-h-screen">
      <h2 className="text-3xl font-bold mb-8">Escolha seu Tema e Modo! 🧩</h2>
      
      <div className="bg-white/20 backdrop-blur-md rounded-lg p-8 max-w-md w-full">
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Tema:</label>
          <select 
            value={tema} 
            onChange={(e) => setTema(e.target.value)} 
            className="w-full p-3 rounded text-black"
          >
            <option value="coisas">Coisas</option>
            <option value="ator_atriz">Ator/Atriz</option>
            <option value="serie_filme">Série/Filme</option>
            <option value="marvel">Marvel</option>
            <option value="dc">DC</option>
            <option value="biblia">Bíblia</option>
            <option value="pais">País</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Modo de Jogo:</label>
          <select 
            value={modo} 
            onChange={(e) => setModo(e.target.value)} 
            className="w-full p-3 rounded text-black"
          >
            <option value="individual">Individual</option>
            <option value="dupla">Dupla</option>
            <option value="casal">Casal</option>
          </select>
        </div>

        <button 
          onClick={iniciarJogo} 
          className="btn-primary w-full"
        >
          Iniciar Jogo! 🎮
        </button>
      </div>

      <button 
        onClick={() => router.push('/')} 
        className="mt-8 btn-secondary"
      >
        Voltar
      </button>
    </div>
  );
}

