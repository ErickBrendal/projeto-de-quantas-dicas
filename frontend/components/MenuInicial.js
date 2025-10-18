import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function MenuInicial() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/selecao');
  }, [user, router]);

  const loginAnonimo = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email: `anon${Date.now()}@temp.com`,
        password: 'temp123',
      });
      if (error) console.error(error);
    } catch (err) {
      console.error('Erro ao fazer login anônimo:', err);
    }
  };

  const loginGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) console.error(error);
    } catch (err) {
      console.error('Erro ao fazer login com Google:', err);
    }
  };

  return (
    <div className="game-bg flex flex-col items-center justify-center text-white p-8 min-h-screen">
      <h1 className="text-5xl font-bold mb-6 animate-bounce">De Quantas Dicas Você Precisa? 🎯</h1>
      <p className="text-2xl mb-12 text-center max-w-2xl">
        Adivinhe palavras com o menor número de dicas possível e ganhe pontos épicos!
      </p>

      <div className="bg-white/20 backdrop-blur-md rounded-lg p-8 max-w-md w-full">
        <button
          onClick={loginGoogle}
          className="btn-primary w-full mb-4"
        >
          Login com Google 🔐
        </button>

        <button
          onClick={loginAnonimo}
          className="btn-secondary w-full"
        >
          Jogar Anonimamente 👤
        </button>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold mb-4">Características:</h3>
        <ul className="text-lg space-y-2">
          <li>✨ Multiplayer Online</li>
          <li>🏆 Ranking Global</li>
          <li>🎮 3 Modos de Jogo</li>
          <li>🌍 7 Temas Diferentes</li>
        </ul>
      </div>
    </div>
  );
}

