import React, { useState } from 'react';
import { ChevronRight, RotateCcw, Volume2, CheckCircle, XCircle } from 'lucide-react';

export default function DFRGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledScenarios, setShuffledScenarios] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);

  const scenarios = [
    {
      id: 1,
      title: "SKENARIO 1",
      description: "Tidak ada perubahan arus dan tegangan. Sistem langsung trip",
      conditions: [
        "❌ Tidak ada perubahan arus dan tegangan",
        "🔴 Langsung trip"
      ],
      correctAnswer: "NSF",
      options: ["NSF", "PETIR", "POHON", "KONDUKTOR PUTUS"]
    },
    {
      id: 2,
      title: "SKENARIO 2",
      description: "Ada aktivitas petir terdeteksi pada LDS dengan karakteristik khusus",
      conditions: [
        "⚡ Ada aktivitas petir pada LDS",
        "📊 Muncul IN dalam durasi 80 ms",
        "🌊 Ada Ripple 3 fasa"
      ],
      correctAnswer: "PETIR",
      options: ["POHON", "PETIR", "USF", "FLYING OBJECT"]
    },
    {
      id: 3,
      title: "SKENARIO 3",
      description: "Gangguan dengan arus netral dan tegangan dalam range tertentu",
      conditions: [
        "❌ Tidak ada aktivitas petir",
        "📈 Terdapat IN (arus netral)",
        "⏱️ Kenaikan IN pada durasi 150 ms",
        "⚡ Tegangan pada range 0.6 - 0.9 pu"
      ],
      correctAnswer: "POHON",
      options: ["KONDUKTOR PUTUS", "POHON", "HEWAN", "USF"]
    },
    {
      id: 4,
      title: "SKENARIO 4",
      description: "Gangguan dengan unbalance arus pada salah satu fasa",
      conditions: [
        "❌ Tidak ada aktivitas petir",
        "📈 Terdapat IN (arus netral)",
        "⏱️ Kenaikan IN pada durasi 90 ms",
        "⚖️ Ada unbalance arus dan penurunan arus mendekati nol pada phasa R"
      ],
      correctAnswer: "KONDUKTOR PUTUS",
      options: ["POHON", "HEWAN", "KONDUKTOR PUTUS", "USF"]
    },
    {
      id: 5,
      title: "SKENARIO 5",
      description: "Gangguan dengan karakteristik harmonic tinggi",
      conditions: [
        "❌ Tidak ada aktivitas petir",
        "📈 Terdapat IN (arus netral)",
        "⏱️ Kenaikan IN pada durasi 80 ms",
        "⚖️ Tidak ada unbalance arus dan penurunan arus mendekati nol",
        "🔴 Gangguan 1 fasa ke tanah",
        "📊 Harmonic ke 2,4,6 di atas 3% dan THD > 20%"
      ],
      correctAnswer: "HEWAN",
      options: ["USF", "HEWAN", "FLYING OBJECT", "SAGGING KONDUKTOR"]
    },
    {
      id: 6,
      title: "SKENARIO 6",
      description: "Gangguan dengan arus netral tinggi namun tanpa harmonic",
      conditions: [
        "✓ Ada perubahan arus dan tegangan",
        "📈 Terdapat IN (arus netral)",
        "⏱️ Kenaikan IN pada durasi 95 ms",
        "❌ Tidak ada unbalance arus dan penurunan arus mendekati nol",
        "❌ Tidak muncul harmonic",
        "❌ Tidak ada gangguan fasa ke tanah"
      ],
      correctAnswer: "USF",
      options: ["HEWAN", "FLYING OBJECT", "USF", "SAGGING KONDUKTOR"]
    },
    {
      id: 7,
      title: "SKENARIO 7",
      description: "Gangguan dengan pembebanan tinggi",
      conditions: [
        "✓ Ada perubahan arus dan tegangan",
        "📈 Terdapat IN",
        "📊 Pembebanan > 80%"
      ],
      correctAnswer: "SAGGING KONDUKTOR",
      options: ["FLYING OBJECT", "SAGGING KONDUKTOR", "USF", "PETIR"]
    },
    {
      id: 8,
      title: "SKENARIO 8",
      description: "Gangguan dengan pembebanan normal",
      conditions: [
        "✓ Ada perubahan arus dan tegangan",
        "📈 Terdapat IN (arus netral)",
        "📊 Pembebanan tidak lebih dari 80%"
      ],
      correctAnswer: "FLYING OBJECT",
      options: ["SAGGING KONDUKTOR", "FLYING OBJECT", "POHON", "HEWAN"]
    }
  ];

  const scenario = shuffledScenarios[currentScenario];

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);

    if (answer === scenario.correctAnswer) {
      setScore(score + 10);
    }
    
    // Langsung next tanpa delay
    setTimeout(() => {
      handleNext();
    }, 100);
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleStartGame = () => {
    const shuffled = shuffleArray(scenarios);
    setShuffledScenarios(shuffled);
    setGameStarted(true);
  };

  const handleNext = () => {
    if (currentScenario < shuffledScenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedAnswer(null);
    } else {
      setGameEnded(true);
    }
  };

  const handleReset = () => {
    setGameStarted(false);
    setCurrentScenario(0);
    setScore(0);
    setSelectedAnswer(null);
    setShuffledScenarios([]);
    setGameEnded(false);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <h1 className="text-5xl font-bold text-purple-600 mb-2">DFR GAME</h1>
            <p className="text-gray-600 text-lg">Simulasi Analisis Defect Failure Rate</p>
          </div>

          <div className="bg-purple-100 rounded-2xl p-6 mb-8">
            <p className="text-gray-700 mb-4">
              Mainkan game ini untuk menguji kemampuan Anda dalam mendiagnosis jenis gangguan berdasarkan kriteria DFR.
            </p>
            <div className="text-sm text-gray-600 space-y-2">
              <p>🎯 <span className="font-semibold">8 Skenario</span> menanti Anda</p>
              <p>📊 Kumpulkan poin untuk setiap jawaban benar</p>
              <p>⚡ Analisis kondisi dan pilih diagnosa yang tepat</p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition transform hover:scale-105"
          >
            <span>Mulai Game</span>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    );
  }

  if (gameEnded) {
    const maxScore = shuffledScenarios.length * 10;
    const percentage = (score / maxScore) * 100;
    const isPerfect = percentage === 100;
    const isGood = percentage >= 90;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          {/* Emoji Celebration/Sad */}
          <div className="mb-6 text-9xl animate-bounce">
            {isPerfect ? '🎉' : isGood ? '😊' : '😢'}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-4">
            {isPerfect ? 'SEMPURNA! 🏆' : isGood ? 'Bagus! 👏' : 'Coba Lagi! 💪'}
          </h1>

          {/* Score Display */}
          <div className={`rounded-2xl p-8 mb-6 ${
            isPerfect 
              ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-4 border-yellow-400' 
              : isGood
              ? 'bg-gradient-to-r from-green-100 to-green-200 border-4 border-green-400'
              : 'bg-gradient-to-r from-red-100 to-red-200 border-4 border-red-400'
          }`}>
            <p className="text-6xl font-bold text-gray-800 mb-2">{score}/{maxScore}</p>
            <p className="text-3xl font-bold text-gray-700 mb-2">{Math.round(percentage)}%</p>
            <p className="text-lg text-gray-600">
              {isPerfect 
                ? 'Luar biasa! Anda menguasai semua kriteria DFR!' 
                : isGood 
                ? 'Sangat bagus! Hanya tinggal sedikit perbaikan.' 
                : 'Masih ada banyak yang perlu dipelajari. Jangan menyerah!'}
            </p>
          </div>

          {/* Confetti Animation untuk Perfect */}
          {isPerfect && (
            <div className="mb-6 space-y-2">
              <div className="flex justify-center gap-1 animate-pulse">
                <span className="text-3xl">✨</span>
                <span className="text-3xl">🌟</span>
                <span className="text-3xl">⭐</span>
                <span className="text-3xl">🌟</span>
                <span className="text-3xl">✨</span>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="bg-gray-100 rounded-xl p-4 mb-6 text-left">
            <p className="text-gray-700 mb-2"><span className="font-bold">Total Skenario:</span> {shuffledScenarios.length}</p>
            <p className="text-gray-700 mb-2"><span className="font-bold">Benar:</span> {score / 10}/{shuffledScenarios.length}</p>
            <p className="text-gray-700"><span className="font-bold">Salah:</span> {shuffledScenarios.length - (score / 10)}/{shuffledScenarios.length}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition transform hover:scale-105"
            >
              Main Lagi
            </button>
            <button
              onClick={handleReset}
              className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-3 px-6 rounded-xl transition transform hover:scale-105"
            >
              Keluar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = shuffledScenarios.length > 0 ? ((currentScenario + 1) / shuffledScenarios.length) * 100 : 0;
  const isLastScenario = shuffledScenarios.length > 0 && currentScenario === shuffledScenarios.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-purple-600">DFR GAME</h1>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">{score} Poin</p>
              <p className="text-sm text-gray-600">Skenario {currentScenario + 1}/{shuffledScenarios.length}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Scenario Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          {/* Conditions */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Analisis Kondisi Gangguan:</h3>
            <div className="space-y-3">
              {scenario.conditions.map((condition, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <span className="text-2xl">{condition.split(' ')[0]}</span>
                  <span className="text-gray-700">{condition.slice(condition.indexOf(' ') + 1)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pertanyaan */}
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Diagnosis:</h3>

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {scenario.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`p-4 rounded-xl font-bold text-lg transition transform hover:scale-105 bg-gradient-to-r from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 text-gray-800 shadow cursor-pointer`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6 shadow-lg">
          <p className="text-sm text-yellow-900">
            💡 <span className="font-bold">Tips:</span> Perhatikan setiap kondisi dengan cermat sebelum memilih jawaban!
          </p>
        </div>
      </div>
    </div>
  );
}
