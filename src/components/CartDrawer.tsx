import { useState } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { Product, ProductVariant, formatMoney } from '../data/products';
import { ResilientImage } from './ResilientImage';

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (variantId: string, delta: number) => void;
  onRemoveItem: (variantId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    onClearCart();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setCheckoutSuccess(false);
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md bg-white h-full flex flex-col border-l border-[#E5E7EB] shadow-2xl">
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Your Bag</h2>
          <button
            type="button"
            onClick={() => {
              setCheckoutSuccess(false);
              onClose();
            }}
            aria-label="Close bag"
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {checkoutSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Order Prepared for Checkout
              </h3>
              <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
                Your fabaddons items are ready. In your live Shopify theme, this
                action routes directly to <span className="font-mono text-xs">/checkout</span>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCheckoutSuccess(false);
                  onClose();
                }}
                className="mt-2 px-5 py-2.5 rounded-lg bg-[#111827] text-white text-xs font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
              <ShoppingBag className="w-9 h-9 text-slate-300" />
              <p className="text-sm font-medium text-gray-900">Your bag is empty</p>
              <p className="text-xs text-slate-500 max-w-[220px]">
                Select any of our four essentials from Bestselling Products or See It In Action.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.variant.id}
                  className="flex gap-4 pb-4 border-b border-gray-100 last:border-b-0"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#F8F9FA] border border-[#E5E7EB] shrink-0">
                    <ResilientImage
                      src={item.product.image}
                      alt={item.product.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {item.product.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.variant.label}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.variant.id)}
                        aria-label={`Remove ${item.product.title}`}
                        className="text-slate-400 hover:text-gray-800 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#E5E7EB] rounded-md h-8">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.variant.id, -1)}
                          aria-label="Decrease quantity"
                          className="w-7 h-full flex items-center justify-center text-gray-700 hover:bg-gray-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.variant.id, 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-full flex items-center justify-center text-gray-700 hover:bg-gray-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-gray-900 tabular-nums">
                        {formatMoney(item.variant.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && !checkoutSuccess && (
          <div className="p-6 border-t border-[#E5E7EB] bg-gray-50/70 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-semibold text-gray-900 tabular-nums">
                {formatMoney(subtotal)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full py-3 rounded-lg bg-[#111827] hover:bg-gray-800 text-white text-sm font-medium transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
