import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function TelaJogo() {
  const router = useRouter();
  const { tema, modo } = router.query;
  const [pergunta, setPergunta] = useState(null);
  const [resposta, setResposta] = useState('');
  const [dicasUsadas, setDicasUsadas] = useState(0);
  const [acertou, setAcertou] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tema) return;
    
    const fetchPergunta = async () => {
      try {
        const res = await fetch(`/api/jogo/sorteio?tema=${tema}`);
        const data = await res.json();
        setPergunta(data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar pergunta:', err);
        setLoading(false);
      }
    };

    fetchPergunta();
  }, [tema]);

  const handleProxima = () => {
    if (dicasUsadas < (pergunta?.dicas?.length || 0) - 1) {
      setDicasUsadas(dicasUsadas + 1);
    }
  };

  const handleResposta = () => {
    if (resposta.toLowerCase() === pergunta?.resposta?.toLowerCase()) {
      setAcertou(true);
      // TODO: Salvar pontos no Supabase
    } else {
      alert('Resposta incorreta! Tente novamente.');
      setResposta('');
    }
  };

  if (loading || !pergunta) {
    return (
      <div className="game-bg flex items-center justify-center min-h-screen text-white">
        <div className="text-3xl font-bold">Carregando pergunta... 🎲</div>
      </div>
    );
  }

  if (acertou) {
    return (
      <div className="game-bg flex flex-col items-center justify-center min-h-screen text-white p-8">
        <h2 className="text-5xl font-bold mb-6">Parabéns! 🎉</h2>
        <p className="text-2xl mb-4">Você acertou em {dicasUsadas + 1} dica(s)!</p>
        <p className="text-xl mb-8">Resposta: <span className="font-bold">{pergunta.resposta}</span></p>
        
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-8 max-w-md w-full text-center">
          <p className="text-3xl font-bold mb-4">
            {dicasUsadas === 0 ? '+10 pontos! 🏆' : dicasUsadas === 1 ? '+7 pontos! 🥈' : '+5 pontos! 🥉'}
          </p>
          
          <button
            onClick={() => router.push('/selecao')}
            className="btn-primary w-full"
          >
            Próxima Rodada
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-bg flex flex-col items-center justify-center min-h-screen text-white p-8">
      <h1 className="text-4xl font-bold mb-8">De Quantas Dicas Você Precisa? 🎯</h1>

      <div className="bg-white/20 backdrop-blur-md rounded-lg p-8 max-w-2xl w-full">
        {/* Dica Atual */}
        <div className="hint-box bg-yellow-100 border-2 border-yellow-400 rounded-lg p-6 mb-6 text-black">
          <p className="text-sm font-semibold text-gray-600 mb-2">Dica {dicasUsadas + 1} de {pergunta.dicas?.length || 0}</p>
          <p className="text-2xl font-bold">{pergunta.dicas?.[dicasUsadas] || 'Sem dicas'}</p>
        </div>

        {/* Dicas Anteriores */}
        {dicasUsadas > 0 && (
          <div className="mb-6">
            <p className="font-semibold mb-2">Dicas anteriores:</p>
            <div className="space-y-2">
              {pergunta.dicas?.slice(0, dicasUsadas).map((dica, idx) => (
                <div key={idx} className="bg-white/10 p-3 rounded">
                  <p className="text-sm">Dica {idx + 1}: {dica}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input de Resposta */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Sua Resposta:</label>
          <input
            type="text"
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleResposta()}
            placeholder="Digite sua resposta..."
            className="w-full p-3 rounded text-black text-lg"
          />
        </div>

        {/* Botões */}
        <div className="flex gap-4">
          <button
            onClick={handleResposta}
            className="btn-primary flex-1"
          >
            Responder ✓
          </button>
          <button
            onClick={handleProxima}
            disabled={dicasUsadas >= (pergunta.dicas?.length || 0) - 1}
            className={`flex-1 px-6 py-4 rounded-lg text-lg font-semibold transition ${
              dicasUsadas >= (pergunta.dicas?.length || 0) - 1
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            Próxima Dica 💡
          </button>
        </div>
      </div>

      <button
        onClick={() => router.push('/selecao')}
        className="mt-8 btn-secondary"
      >
        Voltar
      </button>
    </div>
  );
}

