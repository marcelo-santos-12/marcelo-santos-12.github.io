import { useEffect, useRef, useState } from 'react';

const images = [
  'imgs/image01.jpeg',
  'imgs/image02.jpeg',
  'imgs/image03.jpeg',
  'imgs/image04.jpeg',
  'imgs/image05.jpeg',
  'imgs/image06.jpeg',
  'imgs/image07.jpeg',
  'imgs/image08.jpeg',
  'imgs/image09.jpeg',
  'imgs/image10.jpeg',
  'imgs/image11.jpeg',
];

function App() {
  const [current, setCurrent] = useState(0);
  const [days, setDays] = useState(0);
  const [code, setCode] = useState('');
  const [authorized, setAuthorized] = useState(false);

  const correctCode = '12052014'; // <- Defina aqui o "código de acesso"

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const startDate = new Date("2014-05-12");
    const today = new Date();
    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch((err) => {
        console.error("Falha ao tocar áudio:", err);
      });
    }
  };

  // 🔐 Verificação do código de acesso
  if (!authorized) {
    return (
      <div className='flex h-screen w-screen items-center justify-center bg-pink-50'>

      <div className="flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Acesso restrito</h2>
        <input
          type="password"
          placeholder="Digite o código de acesso"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border border-pink-300 rounded px-4 py-2 mb-4"
          />
        <button
          onClick={() => setAuthorized(code === correctCode)}
          className="bg-pink-500 text-white px-4 py-2 rounded"
          >
          Entrar
        </button>
        {code && code !== correctCode && (
          <p className="text-red-500 mt-2">Código incorreto 😢</p>
        )}
      </div>
        </div>
    );
  }

  // ✅ Conteúdo liberado após o código correto:
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 min-h-screen bg-pink-50 text-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-700 mb-4">
        Bem-vinda, Bruna Oliveira!
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 max-w-xl">
        Onze anos juntos, compartilhando sorrisos, sonhos e desafios que só fortaleceram o que construímos...
        cada momento ao seu lado é uma parte preciosa da minha história...
      </p>

      <div className="text-center p-4">
        <h1 className="text-2xl font-bold">Somente pra você 💖</h1>
        <button
          onClick={togglePlay}
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded"
          >
          {playing ? 'Pausar música' : 'Tocar música'}
        </button>
        <audio ref={audioRef} src="/romantic-song.mp3" loop />
      </div>

      <div className="w-full h-full">
        <img
          src={images[current]}
          alt="slideshow"
        />
      </div>

      <span className="text-base sm:text-lg md:text-xl text-gray-800 max-w-xl">
        ...e eu mal posso esperar para viver todos os próximos capítulos, de mãos dadas, descobrindo novos caminhos,
        com o mesmo amor e carinho que sempre nos uniu. São <strong>{days}</strong> dias juntos 💖
      </span>
    </div>
  );
}

export default App;
