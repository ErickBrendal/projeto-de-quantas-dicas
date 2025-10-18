import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Ranking() {
  const [rankings, setRankings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // TODO: Integrar com Supabase para dados reais
    setRankings([
      { id: 1, nome: 'Jogador1', pontos: 50 },
      { id: 2, nome: 'Jogador2', pontos: 30 },
      { id: 3, nome: 'Jogador3', pontos: 20 },
    ]);
  }, []);

  return (
    <div className="game-bg flex flex-col items-center justify-center text-white p-8 min-h-screen">
      <h2 className="text-4xl font-bold mb-8">Ranking Global! 🏅</h2>
      
      <div className="bg-white/20 backdrop-blur-md rounded-lg p-8 max-w-2xl w-full">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-white">
              <th className="text-left py-2">Posição</th>
              <th className="text-left py-2">Jogador</th>
              <th className="text-right py-2">Pontos</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((r, i) => (
              <tr key={r.id} className="border-b border-white/30 hover:bg-white/10">
                <td className="py-3 font-bold text-lg">
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                </td>
                <td className="py-3">{r.nome}</td>
                <td className="py-3 text-right font-bold">{r.pontos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button 
        onClick={() => router.push('/')} 
        className="mt-8 btn-secondary"
      >
        Voltar ao Início
      </button>
    </div>
  );
}

