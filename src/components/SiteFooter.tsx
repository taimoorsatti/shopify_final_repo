import { Product } from '../data/products';

interface SiteFooterProps {
  products: Product[];
  onGoHome: () => void;
  onSelectProduct: (product: Product) => void;
  onOpenCart: () => void;
}

export function SiteFooter({
  products,
  onGoHome,
  onSelectProduct,
  onOpenCart,
}: SiteFooterProps) {
  return (
    <footer className="relative overflow-hidden bg-[#145592] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(ellipse_at_100%_100%,rgba(4,30,60,0.22),transparent_60%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-9 pt-14 pb-7">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.5fr] gap-12 lg:gap-20 pb-10 border-b border-white/15">
          <div className="space-y-4">
            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white text-[#145592] font-display text-base font-bold tracking-tight shadow-[0_8px_24px_rgba(0,25,54,0.16)] hover:-translate-y-0.5 transition-transform"
            >
              fabaddons
            </button>
            <p className="text-sm text-white/85 leading-relaxed max-w-sm">
              Find your everyday favorites. Explore the latest skincare and sleep wellness
              essentials from fabaddons and make room for something new.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white/75">
                Quick Links
              </h2>
              <ul className="space-y-2 text-sm text-white/90">
                <li>
                  <button type="button" onClick={onGoHome} className="hover:underline">
                    Home
                  </button>
                </li>
                <li>
                  <a
                    href="#bestsellers"
                    onClick={onGoHome}
                    className="hover:underline"
                  >
                    Shop Bestsellers
                  </a>
                </li>
                <li>
                  <button type="button" onClick={onOpenCart} className="hover:underline">
                    Shopping Bag
                  </button>
                </li>
                <li>
                  <a
                    href="#see-it-in-action"
                    onClick={onGoHome}
                    className="hover:underline"
                  >
                    See It In Action
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white/75">
                Our Essentials
              </h2>
              <ul className="space-y-2 text-sm text-white/90">
                {products.map((product) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="text-left hover:underline"
                    >
                      {product.shortTitle}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white/75">
                Here to Help
              </h2>
              <ul className="space-y-2 text-sm text-white/90">
                <li>
                  <a
                    href="#customer-opinions"
                    onClick={onGoHome}
                    className="hover:underline"
                  >
                    Customer Opinions
                  </a>
                </li>
                <li>
                  <a href="#faq" onClick={onGoHome} className="hover:underline">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/75">
          <p>&copy; {new Date().getFullYear()} fabaddons. All rights reserved.</p>
          <p>Skincare &amp; Sleep Wellness</p>
        </div>
      </div>
    </footer>
  );
}
