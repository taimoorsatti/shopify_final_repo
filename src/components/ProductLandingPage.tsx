import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Minus,
  Pause,
  Play,
  Plus,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  Product,
  ProductVariant,
  formatMoney,
  getDiscountPercent,
} from '../data/products';
import { FaqSection } from './FaqSection';
import { ResilientImage } from './ResilientImage';

interface ProductLandingPageProps {
  product: Product;
  allProducts: Product[];
  onBackHome: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToBag: (product: Product, variant: ProductVariant, quantity: number) => void;
}

export function ProductLandingPage({
  product,
  allProducts,
  onBackHome,
  onSelectProduct,
  onAddToBag,
}: ProductLandingPageProps) {
  const galleryMedia = [
    { src: product.image, alt: product.imageAlt, label: 'Studio Product' },
    { src: product.videoPoster, alt: product.videoPosterAlt, label: 'In Use' },
    { src: product.editorialImage, alt: product.editorialImageAlt, label: 'Closer Look' },
  ];

  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [openAccordion, setOpenAccordion] = useState<'benefits' | 'howto' | null>('benefits');
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Interactive Before / After comparison slider (0-100)
  const [comparePosition, setComparePosition] = useState(50);

  // Interactive product demo video state
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [videoSceneIndex, setVideoSceneIndex] = useState(0);

  useEffect(() => {
    setSlideIndex(0);
    setSelectedVariant(product.variants[0]);
    setOpenAccordion('benefits');
    setAddedFeedback(false);
    setComparePosition(50);
    setVideoSceneIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  useEffect(() => {
    if (!isVideoPlaying) return;
    const timer = window.setInterval(() => {
      setVideoSceneIndex((prev) => (prev + 1) % product.videoScenes.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, [isVideoPlaying, product.videoScenes.length]);

  const discount = getDiscountPercent(
    selectedVariant.price,
    selectedVariant.compareAtPrice
  );

  const handleAdd = () => {
    onAddToBag(product, selectedVariant, 1);
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1800);
  };

  const scrollToBuyBox = () => {
    document.getElementById('fp-buy-box')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-[#17212c]">
      {/* Breadcrumb & Back */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-6 pb-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#65717e]">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBackHome}
            className="hover:text-[#145592] transition-colors"
          >
            Home
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            onClick={onBackHome}
            className="hover:text-[#145592] transition-colors"
          >
            Shop
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-[#17212c] font-medium">{product.title}</span>
        </nav>

        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#145592] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Storefront
        </button>
      </div>

      {/* SECTION 1: Main Product Gallery + Pack Selector Buy Box (FabProduct fp-main) */}
      <section id="fp-buy-box" className="max-w-[1240px] mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-14 items-start">
          {/* Left Sticky Gallery */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="relative aspect-[4/3] sm:aspect-square rounded-2xl bg-[#f6f7f9] overflow-hidden shadow-[0_18px_48px_rgba(20,55,85,0.08)] border border-[#e3e8ed]">
              <ResilientImage
                src={galleryMedia[slideIndex].src}
                alt={galleryMedia[slideIndex].alt}
                fallbackTitle={product.title}
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  setSlideIndex((prev) => (prev - 1 + galleryMedia.length) % galleryMedia.length)
                }
                aria-label="Previous product image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#17212c] flex items-center justify-center shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setSlideIndex((prev) => (prev + 1) % galleryMedia.length)}
                aria-label="Next product image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#17212c] flex items-center justify-center shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {galleryMedia.map((media, idx) => (
                <button
                  key={media.label}
                  type="button"
                  aria-pressed={slideIndex === idx}
                  onClick={() => setSlideIndex(idx)}
                  className={`aspect-[4/3] rounded-xl overflow-hidden bg-[#f5f6f8] border-2 transition-colors ${
                    slideIndex === idx
                      ? 'border-[#145592]'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <ResilientImage
                    src={media.src}
                    alt={media.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Purchase Column */}
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-[#e3e8ed] bg-[#f0f5fa] text-[#145592] text-xs font-semibold">
              {product.tagline}
            </span>

            <div>
              <h1 className="text-[28px] sm:text-[36px] font-bold tracking-tight text-[#17212c] leading-[1.15]">
                {product.title}
              </h1>
              <p className="text-sm text-[#65717e] mt-1.5">{product.subtitle}</p>
            </div>

            <div className="flex items-baseline gap-3 tabular-nums">
              <span className="text-2xl font-bold text-[#145592]">
                {formatMoney(selectedVariant.price)}
              </span>
              {selectedVariant.compareAtPrice &&
                selectedVariant.compareAtPrice > selectedVariant.price && (
                  <>
                    <span className="text-base text-[#65717e] line-through">
                      {formatMoney(selectedVariant.compareAtPrice)}
                    </span>
                    {discount !== null && (
                      <span className="text-xs font-bold text-[#145592]">
                        Save {discount}%
                      </span>
                    )}
                  </>
                )}
            </div>

            <p className="text-sm text-[#65717e] leading-relaxed">{product.description}</p>

            {/* Choose Quantity Pack Cards */}
            <div className="space-y-2.5 pt-1">
              <p className="text-xs font-semibold text-[#17212c]">Choose Quantity</p>
              <div className="space-y-2.5">
                {product.variants.map((variant) => {
                  const isSelected = variant.id === selectedVariant.id;
                  const packSavings = getDiscountPercent(
                    variant.price,
                    variant.compareAtPrice
                  );
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-[#145592] bg-[#f0f5fa] shadow-xs'
                          : 'border-[#e3e8ed] bg-white hover:border-[#b9cddd]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#145592]' : 'border-gray-300'
                          }`}
                        >
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-[#145592]" />
                          )}
                        </span>
                        <span className="text-sm font-semibold text-[#17212c]">
                          {variant.label}
                        </span>
                        {variant.badge && (
                          <span className="text-[11px] font-semibold text-[#145592]">
                            · {variant.badge}
                          </span>
                        )}
                      </div>

                      <div className="text-right tabular-nums">
                        <span className="text-sm font-bold text-[#17212c]">
                          {formatMoney(variant.price)}
                        </span>
                        {packSavings !== null && (
                          <span className="block text-[11px] font-medium text-[#145592]">
                            Save {packSavings}%
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total & Add to cart CTA */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between text-sm px-1 tabular-nums">
                <span className="text-[#65717e] font-medium">Total</span>
                <span className="text-lg font-bold text-[#17212c]">
                  {formatMoney(selectedVariant.price)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-3.5 px-6 rounded-xl bg-[#111827] hover:bg-[#145592] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added to Bag
                  </>
                ) : (
                  <>
                    <span>Add to cart</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Expandable Information Accordions */}
            <div className="border-t border-[#e3e8ed] pt-3 divide-y divide-[#e3e8ed]">
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setOpenAccordion(openAccordion === 'benefits' ? null : 'benefits')
                  }
                  className="w-full py-3.5 flex items-center justify-between text-sm font-semibold text-[#17212c]"
                >
                  <span>Benefits &amp; Overview</span>
                  {openAccordion === 'benefits' ? (
                    <Minus className="w-4 h-4 text-[#145592]" />
                  ) : (
                    <Plus className="w-4 h-4 text-[#145592]" />
                  )}
                </button>
                {openAccordion === 'benefits' && (
                  <ul className="pb-4 space-y-1.5 text-xs text-[#65717e] leading-relaxed">
                    {product.details.map((d) => (
                      <li key={d}>• {d}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() =>
                    setOpenAccordion(openAccordion === 'howto' ? null : 'howto')
                  }
                  className="w-full py-3.5 flex items-center justify-between text-sm font-semibold text-[#17212c]"
                >
                  <span>How to Use</span>
                  {openAccordion === 'howto' ? (
                    <Minus className="w-4 h-4 text-[#145592]" />
                  ) : (
                    <Plus className="w-4 h-4 text-[#145592]" />
                  )}
                </button>
                {openAccordion === 'howto' && (
                  <ol className="pb-4 space-y-1.5 text-xs text-[#65717e] list-decimal list-inside leading-relaxed">
                    {product.howToUse.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: See It In Action (Product Demonstration Video) */}
      <section className="py-14 md:py-16 border-t border-[#e3e8ed] bg-white">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-editorial text-[28px] md:text-[36px] font-semibold text-[#17212c]">
              See It In Action
            </h2>
            <p className="text-sm text-[#65717e] mt-1.5">{product.videoTitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-center">
            <div className="relative aspect-[9/16] max-w-[300px] mx-auto w-full rounded-2xl overflow-hidden bg-gray-950 border border-[#e3e8ed] shadow-md">
              <video
                src={product.videoUrl}
                poster={product.videoPoster}
                autoPlay
                loop
                muted={isVideoMuted}
                playsInline
                ref={(el) => {
                  if (!el) return;
                  if (isVideoPlaying && el.paused) void el.play();
                  if (!isVideoPlaying && !el.paused) el.pause();
                }}
                className="w-full h-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/75"
                aria-hidden="true"
              />
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsVideoPlaying((p) => !p)}
                  aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
                  className="w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center"
                >
                  {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsVideoMuted((m) => !m)}
                  aria-label={isVideoMuted ? 'Unmute video' : 'Mute video'}
                  className="w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center"
                >
                  {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
              <div className="pointer-events-none absolute bottom-3 left-3.5 right-3.5 text-white">
                <p className="text-[11px] text-white/85">
                  {product.videoScenes[videoSceneIndex]?.caption}
                </p>
                <p className="text-xs font-semibold mt-0.5">{product.title}</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#145592]">
                APPLICATION WALKTHROUGH
              </p>
              <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#17212c]">
                {product.storyTwoTitle}
              </h3>
              <p className="text-sm text-[#65717e] leading-relaxed">
                {product.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {product.videoScenes.map((scene, idx) => (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => setVideoSceneIndex(idx)}
                    className={`p-3 rounded-xl border text-left transition-colors ${
                      videoSceneIndex === idx
                        ? 'border-[#145592] bg-[#f0f5fa]'
                        : 'border-[#e3e8ed] bg-white hover:border-[#b9cddd]'
                    }`}
                  >
                    <span className="text-[11px] font-semibold text-[#145592] block">
                      Step {idx + 1}
                    </span>
                    <span className="text-xs text-[#17212c] font-medium mt-0.5 block">
                      {scene.caption.replace(/^0\d · /, '')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Before & After Split Comparison (fp-comparison-section) */}
      <section className="py-16 bg-[#f4f7fa] border-y border-[#e3e8ed]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#145592]">
              DAILY CONSISTENCY
            </span>
            <h2 className="font-editorial text-[30px] sm:text-[38px] font-semibold text-[#17212c] leading-tight">
              Before &amp; after
            </h2>
            <p className="text-sm sm:text-[15px] text-[#65717e] leading-relaxed max-w-md">
              Slide to compare packaging prep and real skin/routine texture. Gentle daily
              application supports comfort, hydration, and clean prep without exaggerated
              claims.
            </p>
            <button
              type="button"
              onClick={scrollToBuyBox}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#145592] hover:underline pt-1"
            >
              <span>Shop this product</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#e3e8ed] bg-white shadow-sm select-none">
              <ResilientImage
                src={product.editorialImage}
                alt={product.editorialImageAlt}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - comparePosition}% 0 0)` }}
              >
                <ResilientImage
                  src={product.image}
                  alt={product.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow"
                style={{ left: `${comparePosition}%` }}
                aria-hidden="true"
              />

              <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/65 text-white text-[11px] font-medium">
                Product Prep
              </span>
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#145592]/90 text-white text-[11px] font-medium">
                In Routine
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={90}
              value={comparePosition}
              onChange={(e) => setComparePosition(Number(e.target.value))}
              aria-label="Compare product preparation and routine view"
              className="w-full accent-[#145592] cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* SECTION 4: Blue Wave Header + 4-Card Features Grid (fp-features-section) */}
      <section className="bg-white">
        <div className="relative bg-[#145592] text-white pt-14 pb-16 px-4 sm:px-6 text-center overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80 mb-2">
              THOUGHTFUL FORMULATION
            </p>
            <h2 className="font-editorial text-[28px] sm:text-[38px] font-semibold leading-tight text-balance">
              {product.featuresHeading}
            </h2>
          </div>
          <svg
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full h-8 text-white fill-current"
            aria-hidden="true"
          >
            <path d="M0,32 C360,64 1080,0 1440,32 L1440,60 L0,60 Z" />
          </svg>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {product.features.map((feat, idx) => (
              <div
                key={feat.title}
                className="rounded-xl border border-[#e3e8ed] bg-[#f8fafc] p-6 space-y-2.5"
              >
                <span className="inline-flex w-7 h-7 rounded-full bg-[#145592] text-white text-xs font-bold items-center justify-center tabular-nums">
                  {idx + 1}
                </span>
                <h3 className="text-[15px] font-semibold text-[#17212c]">{feat.title}</h3>
                <p className="text-xs text-[#65717e] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Split Story 1 */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#145592]">
              EVERYDAY CARE
            </span>
            <h2 className="font-editorial text-[28px] sm:text-[36px] font-semibold text-[#17212c] leading-tight">
              {product.storyOneTitle}
            </h2>
            <p className="text-sm sm:text-[15px] text-[#65717e] leading-relaxed">
              {product.storyOneBody}
            </p>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#e3e8ed]">
            <ResilientImage
              src={product.image}
              alt={product.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 6: Split Story 2 (Numbered Evidence / Routine Steps) */}
      <section className="py-12 md:py-16 bg-[#f4f7fa] border-y border-[#e3e8ed]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#e3e8ed] order-2 lg:order-1">
            <ResilientImage
              src={product.editorialImage}
              alt={product.editorialImageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-5 order-1 lg:order-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#145592]">
              SIMPLE 3-STEP RITUAL
            </span>
            <h2 className="font-editorial text-[28px] sm:text-[36px] font-semibold text-[#17212c] leading-tight">
              {product.storyTwoTitle}
            </h2>
            <ol className="space-y-3.5">
              {product.storyTwoSteps.map((step, idx) => (
                <li
                  key={step}
                  className="flex items-start gap-3.5 bg-white p-4 rounded-xl border border-[#e3e8ed]"
                >
                  <span className="w-7 h-7 rounded-full bg-[#145592] text-white text-xs font-bold flex items-center justify-center shrink-0 tabular-nums">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-[#17212c] leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* SECTION 7: A Closer Look + Other Essentials */}
      <section className="py-14 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#145592] mb-2">
              COMPLETE YOUR ROUTINE
            </p>
            <h2 className="font-editorial text-[28px] sm:text-[36px] font-semibold text-[#17212c]">
              A closer look at fabaddons essentials
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allProducts
              .filter((p) => p.id !== product.id)
              .slice(0, 3)
              .map((other) => (
                <button
                  key={other.id}
                  type="button"
                  onClick={() => onSelectProduct(other)}
                  className="group text-left bg-white border border-[#e3e8ed] rounded-xl overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all"
                >
                  <div className="aspect-[4/3] bg-[#f6f7f9] overflow-hidden">
                    <ResilientImage
                      src={other.image}
                      alt={other.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-[#17212c]">
                      {other.title}
                    </span>
                    <span className="text-sm font-semibold text-[#145592] tabular-nums shrink-0">
                      {formatMoney(other.price)}
                    </span>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: Answers to Your Questions (Product FAQ) */}
      <FaqSection
        id="product-faq"
        eyebrow="PRODUCT QUESTIONS"
        heading="Answers to your questions"
        subtitle={`Common questions about ${product.title}.`}
        faqs={product.faqs}
        onContactAction={onBackHome}
      />
    </div>
  );
}
