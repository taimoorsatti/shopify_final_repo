import { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Product, formatMoney } from '../data/products';

interface SeeItInActionSectionProps {
  products: Product[];
  onShopProduct: (product: Product) => void;
}

interface VideoCardProps {
  product: Product;
  onShop: (product: Product) => void;
}

function VideoDemoCard({ product, onShop }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      void videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted((prev) => !prev);
  };

  return (
    <article className="flex flex-col bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs">
      <div className="relative aspect-[9/16] w-full bg-gray-950 overflow-hidden select-none">
        <video
          ref={videoRef}
          src={product.videoUrl}
          poster={product.videoPoster}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover"
        />

        <div
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/45 via-transparent to-black/75"
          aria-hidden="true"
        />

        <div className="absolute top-3.5 left-3 right-3 z-20 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={togglePlayPause}
            aria-label={isPlaying ? `Pause ${product.title} video` : `Play ${product.title} video`}
            className="w-10 h-10 rounded-full bg-black/55 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-colors focus-visible:outline-2 focus-visible:outline-white"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? `Unmute ${product.title} video` : `Mute ${product.title} video`}
            className="w-10 h-10 rounded-full bg-black/55 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-colors focus-visible:outline-2 focus-visible:outline-white"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        <div className="absolute bottom-3 left-3.5 right-3.5 z-20 text-white pointer-events-none">
          <p className="text-[11px] font-medium text-white/85 tracking-wide">
            {product.category}
          </p>
          <p className="text-xs font-semibold text-white mt-0.5 truncate">
            {product.videoTitle}
          </p>
        </div>
      </div>

      <div className="px-3.5 py-3 bg-white flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-gray-900 truncate">
            {product.title}
          </p>
          <p className="text-xs text-slate-500 tabular-nums mt-0.5">
            {formatMoney(product.price)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onShop(product)}
          className="px-4 py-2 rounded-lg bg-[#111827] hover:bg-gray-800 text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Shop
        </button>
      </div>
    </article>
  );
}

export function SeeItInActionSection({
  products,
  onShopProduct,
}: SeeItInActionSectionProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const updateCount = () => {
      setVisibleCount(window.innerWidth < 768 ? 1 : 3);
    };
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  const maxIndex = Math.max(0, products.length - visibleCount);
  const clampedStart = Math.min(startIndex, maxIndex);

  useEffect(() => {
    if (startIndex > maxIndex) {
      setStartIndex(maxIndex);
    }
  }, [maxIndex, startIndex]);

  const handlePrev = () => {
    setStartIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const gapPx = visibleCount === 1 ? 16 : 20;

  return (
    <section id="see-it-in-action" className="bg-white py-16 md:py-20 border-t border-gray-100">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-[26px] md:text-[32px] font-semibold tracking-tight text-gray-900 text-balance">
            See It In Action
          </h2>
          <p className="text-[15px] text-slate-500 mt-2">
            Discover your daily favorites.
          </p>
        </div>

        <div
          className="relative flex items-center gap-3 md:gap-4"
          onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX === null) return;
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) {
              if (diff > 0) handleNext();
              else handlePrev();
            }
            setTouchStartX(null);
          }}
        >
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous product video"
            className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white text-gray-800 flex items-center justify-center hover:bg-gray-50 transition-colors shrink-0 shadow-xs focus-visible:outline-2 focus-visible:outline-gray-900"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex-1 overflow-hidden max-w-[330px] md:max-w-none mx-auto">
            <div
              className="grid transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                gridTemplateColumns: `repeat(${products.length}, calc((100% - ${(visibleCount - 1) * gapPx}px) / ${visibleCount}))`,
                gap: `${gapPx}px`,
                transform: `translateX(calc(-${clampedStart} * ((100% + ${gapPx}px) / ${visibleCount})))`,
              }}
            >
              {products.map((product) => (
                <VideoDemoCard
                  key={product.id}
                  product={product}
                  onShop={onShopProduct}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next product video"
            className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white text-gray-800 flex items-center justify-center hover:bg-gray-50 transition-colors shrink-0 shadow-xs focus-visible:outline-2 focus-visible:outline-gray-900"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`View video slide ${idx + 1}`}
              onClick={() => setStartIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                clampedStart === idx ? 'w-6 bg-gray-900' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
