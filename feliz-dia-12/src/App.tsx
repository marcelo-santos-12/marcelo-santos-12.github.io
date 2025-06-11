import { useEffect, useState } from 'react';

const images = [
  '/fotos/img1.jpg',
  '/fotos/img2.jpg',
  '/fotos/img3.jpg'
];

function App() {
  const [current, setCurrent] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    // Slideshow
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Contador de dias
    const startDate = new Date("2013-06-12");
    const today = new Date();
    // const diffTime = Math.abs(today - startDate);
    // setDays(Math.floor(diffTime / (1000 * 60 * 60 * 24)));
    setDays(1000);
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 text-gray-800 font-poppins flex items-center justify-center p-6">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold font-playfair">Bem vinda, Bruna Oliveira!</h1>
          <p className="text-lg leading-relaxed">
            Onze anos juntos, compartilhando sorrisos, sonhos e desafios que só fortaleceram o que construímos...
            cada momento ao seu lado é uma parte preciosa da minha história...
          </p>
        </div>

        <div className="w-full h-56 rounded-xl overflow-hidden shadow-md">
          <img
            src={images[current]}
            alt="slideshow"
            className="w-full h-full object-cover transition-all duration-500"
          />
        </div>

        <div className="text-center space-y-4">
          <p className="text-lg leading-relaxed">
            ...e eu mal posso esperar para viver todos os próximos capítulos, de mãos dadas, descobrindo novos caminhos,
            com o mesmo amor e carinho que sempre nos uniu.
          </p>
          <div className="text-pink-600 font-semibold text-lg">
            São {days} dias juntos 💖
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative w-12 h-12 bg-red-500 rotate-[-45deg] animate-pulse">
            <div className="absolute top-[-50%] left-0 w-12 h-12 bg-red-500 rounded-full"></div>
            <div className="absolute top-0 left-[50%] w-12 h-12 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
