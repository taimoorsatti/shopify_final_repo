import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { HERO_SLIDES, HeroSlide } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface HeroCarouselSectionProps {
  onSelectProductById: (productId: string) => void;
}

export function HeroCarouselSection({ onSelectProductById }: HeroCarouselSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const handleSlideAction = (slide: HeroSlide) => {
    if (slide.targetProductId) {
      onSelectProductById(slide.targetProductId);
    } else if (slide.targetAnchor) {
      const el = document.querySelector(slide.targetAnchor);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="fabaddons featured collections"
      className="relative w-full h-[500px] sm:h-[560px] lg:h-[640px] overflow-hidden bg-[#0f2942]"
    >
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === activeIndex;
        return (
          <article
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <ResilientImage
              src={slide.imageUrl}
              alt={slide.imageAlt}
              fallbackTitle={slide.heading}
              className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                isActive && !isPaused ? 'scale-[1.04]' : 'scale-100'
              }`}
            />

            {/* Measured contrast scrim */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15"
              aria-hidden="true"
            />

            <div className="absolute inset-0 flex items-end">
              <div className="max-w-[1280px] w-full mx-auto px-5 sm:px-8 pb-16 sm:pb-20">
                <div className="max-w-xl text-white space-y-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85">
                    {slide.eyebrow}
                  </p>
                  <h1 className="font-editorial text-[34px] sm:text-[46px] lg:text-[54px] font-semibold leading-[1.1] tracking-tight text-balance">
                    {slide.heading}
                  </h1>
                  <p className="text-sm sm:text-base text-white/90 max-w-md leading-relaxed">
                    {slide.subtext}
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => handleSlideAction(slide)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#17212c] hover:bg-slate-100 text-sm font-semibold transition-colors whitespace-nowrap"
                    >
                      {slide.ctaLabel}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}

      {/* Bottom Controls Bar: Dots + Pause + Arrows */}
      <div className="absolute bottom-5 left-0 right-0 z-20 max-w-[1280px] mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}: ${slide.heading}`}
              className={`h-2 rounded-full transition-all ${
                idx === activeIndex ? 'w-7 bg-white' : 'w-2 bg-white/45 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            aria-label={isPaused ? 'Play hero slideshow' : 'Pause hero slideshow'}
            className="w-10 h-10 rounded-full bg-black/45 hover:bg-black/65 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
          >
            {isPaused ? <Play className="w-4 h-4 ml-0.5" /> : <Pause className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() =>
              setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
            }
            aria-label="Previous hero slide"
            className="w-10 h-10 rounded-full bg-black/45 hover:bg-black/65 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
            aria-label="Next hero slide"
            className="w-10 h-10 rounded-full bg-black/45 hover:bg-black/65 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
