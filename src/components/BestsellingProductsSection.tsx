import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, formatMoney, getDiscountPercent } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface BestsellingProductsSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export function BestsellingProductsSection({
  products,
  onSelectProduct,
  onQuickAdd,
}: BestsellingProductsSectionProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [showAllGrid, setShowAllGrid] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Skincare' | 'Sleep Wellness'>('All');
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
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

  const filteredProducts =
    categoryFilter === 'All'
      ? products
      : products.filter((p) => p.category === categoryFilter);

  const renderCard = (product: Product) => {
    const discount = getDiscountPercent(product.price, product.compareAtPrice);
    return (
      <article
        key={product.id}
        className="group flex flex-col bg-white border border-[#E5E7EB] rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      >
        <button
          type="button"
          onClick={() => onSelectProduct(product)}
          className="text-left flex-1 flex flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          <div className="relative aspect-[4/3] w-full bg-[#F8F9FA] overflow-hidden">
            <ResilientImage
              src={product.image}
              alt={product.imageAlt}
              fallbackTitle={product.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between gap-2.5">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-500 font-medium">{product.category}</span>
                {discount !== null && (
                  <span className="font-semibold text-[#145592] tabular-nums">
                    Save {discount}%
                  </span>
                )}
              </div>
              <h3 className="text-[16px] font-semibold text-[#17212c] leading-snug">
                {product.title}
              </h3>
            </div>

            <div className="flex items-baseline gap-2 pt-1 tabular-nums">
              <span className="text-[15px] font-semibold text-[#17212c]">
                {formatMoney(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-[13px] text-gray-400 line-through">
                  {formatMoney(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>
        </button>

        <div className="px-5 pb-5 pt-0 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onSelectProduct(product)}
            className="text-xs font-medium text-[#145592] hover:text-[#0079cf] underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            View Details
          </button>
          <button
            type="button"
            onClick={() => onQuickAdd(product)}
            className="px-3.5 py-2 text-xs font-medium text-[#17212c] border border-[#e3e8ed] rounded-lg hover:bg-[#111827] hover:text-white hover:border-[#111827] transition-colors whitespace-nowrap shrink-0"
          >
            Add to Bag
          </button>
        </div>
      </article>
    );
  };

  return (
    <section id="bestsellers" className="bg-white py-16 md:py-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <h2 className="font-editorial text-center text-[30px] md:text-[44px] font-semibold tracking-tight text-[#20232a] mb-10 text-balance">
          Bestselling Products
        </h2>

        {!showAllGrid ? (
          <>
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
                aria-label="Previous bestselling products"
                className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white text-gray-800 flex items-center justify-center hover:bg-gray-50 transition-colors shrink-0 shadow-xs focus-visible:outline-2 focus-visible:outline-gray-900"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex-1 overflow-hidden">
                <div
                  className="grid transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    gridTemplateColumns: `repeat(${products.length}, calc((100% - ${(visibleCount - 1) * 24}px) / ${visibleCount}))`,
                    gap: '24px',
                    transform: `translateX(calc(-${clampedStart} * ((100% + 24px) / ${visibleCount})))`,
                  }}
                >
                  {products.map((product) => renderCard(product))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next bestselling products"
                className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white text-gray-800 flex items-center justify-center hover:bg-gray-50 transition-colors shrink-0 shadow-xs focus-visible:outline-2 focus-visible:outline-gray-900"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {maxIndex > 0 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Show products starting at item ${idx + 1}`}
                    onClick={() => setStartIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      clampedStart === idx ? 'w-6 bg-gray-900' : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-1 p-1 bg-slate-100 rounded-lg w-fit mx-auto">
              {(['All', 'Skincare', 'Sleep Wellness'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setCategoryFilter(tab)}
                  className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    categoryFilter === tab
                      ? 'bg-white text-gray-900 shadow-xs'
                      : 'text-slate-600 hover:text-gray-900'
                  }`}
                >
                  {tab === 'All' ? `All (${products.length})` : tab}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => renderCard(product))}
            </div>
          </div>
        )}

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => {
              setShowAllGrid((prev) => !prev);
              setCategoryFilter('All');
            }}
            className="inline-flex items-center justify-center bg-[#111827] text-white px-7 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            {showAllGrid ? 'Show Carousel View' : 'View All Products'}
          </button>
        </div>
      </div>
    </section>
  );
}
