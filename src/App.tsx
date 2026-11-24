import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { BenefitsMarqueeStrip } from './components/BenefitsMarqueeStrip';
import { BestsellingProductsSection } from './components/BestsellingProductsSection';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CustomerOpinionsSection } from './components/CustomerOpinionsSection';
import { FaqSection } from './components/FaqSection';
import { HeroCarouselSection } from './components/HeroCarouselSection';
import { ProductLandingPage } from './components/ProductLandingPage';
import { SeeItInActionSection } from './components/SeeItInActionSection';
import { SiteFooter } from './components/SiteFooter';
import { WhyShopSection } from './components/WhyShopSection';
import { Product, ProductVariant, TECHFLEX_PRODUCTS } from './data/products';

const ANNOUNCEMENT_TEXT =
  'Welcome to fabaddons  •  Discover Our New Arrivals  •  Shop Your Daily Favorites';

export default function App() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToBag = (
    product: Product,
    variant: ProductVariant = product.variants[0],
    quantity = 1
  ) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.variant.id === variant.id);
      if (existing) {
        return prev.map((item) =>
          item.variant.id === variant.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, variant, quantity }];
    });
  };

  const handleQuickAdd = (product: Product) => {
    handleAddToBag(product, product.variants[0], 1);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (variantId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.variant.id === variantId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (variantId: string) => {
    setCartItems((prev) => prev.filter((item) => item.variant.id !== variantId));
  };

  const handleSelectProductById = (productId: string) => {
    const found = TECHFLEX_PRODUCTS.find((p) => p.id === productId);
    if (found) setActiveProduct(found);
  };

  const navigateHomeAndScroll = (anchor?: string) => {
    setActiveProduct(null);
    if (anchor) {
      window.setTimeout(() => {
        document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const totalBagCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#24211d]">
      <header className="sticky top-0 z-40 bg-white border-b border-black/8">
        <div className="w-full overflow-hidden bg-[#145592] text-white py-2">
          <div className="animate-marquee flex items-center text-[11px] sm:text-xs font-medium tracking-wide">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <span key={n} className="px-6 whitespace-nowrap">
                {ANNOUNCEMENT_TEXT}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          <button
            type="button"
            onClick={() => navigateHomeAndScroll()}
            className="font-display text-lg font-bold tracking-tight text-[#145592] whitespace-nowrap shrink-0"
          >
            fabaddons
          </button>

          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#24211d]/80"
          >
            <button
              type="button"
              onClick={() => navigateHomeAndScroll()}
              className="hover:text-[#0079cf] transition-colors whitespace-nowrap shrink-0"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => navigateHomeAndScroll('#bestsellers')}
              className="hover:text-[#0079cf] transition-colors whitespace-nowrap shrink-0"
            >
              Shop
            </button>
            <button
              type="button"
              onClick={() => setActiveProduct(TECHFLEX_PRODUCTS[0])}
              className="hover:text-[#0079cf] transition-colors whitespace-nowrap shrink-0"
            >
              Eye Cream
            </button>
            <button
              type="button"
              onClick={() => navigateHomeAndScroll('#customer-opinions')}
              className="hover:text-[#0079cf] transition-colors whitespace-nowrap shrink-0"
            >
              Reviews
            </button>
            <button
              type="button"
              onClick={() => navigateHomeAndScroll('#faq')}
              className="hover:text-[#0079cf] transition-colors whitespace-nowrap shrink-0"
            >
              FAQ
            </button>
          </nav>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#145592] hover:bg-[#0f4477] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 tabular-nums"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag ({totalBagCount})</span>
          </button>
        </div>
      </header>

      <main className="flex-1">
        {activeProduct ? (
          <ProductLandingPage
            product={activeProduct}
            allProducts={TECHFLEX_PRODUCTS}
            onBackHome={() => navigateHomeAndScroll()}
            onSelectProduct={(p) => setActiveProduct(p)}
            onAddToBag={handleAddToBag}
          />
        ) : (
          <>
            <HeroCarouselSection onSelectProductById={handleSelectProductById} />
            <BenefitsMarqueeStrip />
            <BestsellingProductsSection
              products={TECHFLEX_PRODUCTS}
              onSelectProduct={(product) => setActiveProduct(product)}
              onQuickAdd={handleQuickAdd}
            />
            <SeeItInActionSection
              products={TECHFLEX_PRODUCTS}
              onShopProduct={(product) => setActiveProduct(product)}
            />
            <CustomerOpinionsSection products={TECHFLEX_PRODUCTS} />
            <WhyShopSection />
            <FaqSection
              onContactAction={() => navigateHomeAndScroll('#customer-opinions')}
            />
          </>
        )}
      </main>

      <SiteFooter
        products={TECHFLEX_PRODUCTS}
        onGoHome={() => navigateHomeAndScroll()}
        onSelectProduct={(product) => setActiveProduct(product)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
}
