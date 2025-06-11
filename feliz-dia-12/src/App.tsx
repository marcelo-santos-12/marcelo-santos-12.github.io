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

  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
      });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const startDate = new Date("2014-05-12");
    const today = new Date();
    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays);
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

      <audio ref={audioRef} src="music/music-song.mp3" loop />
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
