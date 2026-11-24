import { useState } from 'react';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { ProductFaq } from '../data/products';

const DEFAULT_FAQS: ProductFaq[] = [
  {
    question: 'How long does shipping and delivery take?',
    answer:
      'Orders are processed within 24 hours on business days. Express delivery typically arrives within 3 business days depending on your destination.',
  },
  {
    question: 'Are Dr. Melaxin products authentic and sealed?',
    answer:
      'Yes. Every skincare and wellness item stocked by fabaddons ships in original, sealed retail packaging directly from verified distribution channels.',
  },
  {
    question: 'Can I bundle multiple packs or products in one order?',
    answer:
      'Yes. Use the Buy 2 or Buy 3 quantity options on any product page for multi-pack savings, or mix and match products directly inside your shopping bag.',
  },
  {
    question: 'How do I mold and care for the Anti Snore Mouth-Piece?',
    answer:
      'Each mouthpiece includes a step-by-step warm-water fitting guide and a ventilated matte case. Rinse with cool water after use and store dry.',
  },
  {
    question: 'What is your return and customer support policy?',
    answer:
      'If an item arrives damaged or you need help with your order, reach out to our support team anytime and we will resolve it promptly.',
  },
];

interface FaqSectionProps {
  id?: string;
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
  faqs?: ProductFaq[];
  onContactAction?: () => void;
}

export function FaqSection({
  id = 'faq',
  eyebrow = 'HERE TO HELP',
  heading = 'Frequently Asked Questions',
  subtitle = 'Helpful answers before you place your order.',
  faqs = DEFAULT_FAQS,
  onContactAction,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id={id} className="bg-white py-16 md:py-20 border-t border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.4fr] gap-10 lg:gap-16 items-start">
          {/* Left Sticky Header Column */}
          <div className="lg:pt-2">
            <span className="block text-[10px] font-bold uppercase tracking-[0.19em] text-[#145592] mb-4">
              {eyebrow}
            </span>
            <h2 className="font-editorial text-[32px] md:text-[44px] font-semibold leading-[1.13] tracking-tight text-[#20232a] text-balance">
              {heading}
            </h2>
            <p className="text-sm text-[#6c737b] leading-relaxed mt-4 max-w-[320px]">
              {subtitle}
            </p>
            <button
              type="button"
              onClick={onContactAction}
              className="inline-flex items-center gap-4 min-h-[44px] mt-5 border-b border-[#b9cddd] text-[#145592] text-sm font-semibold hover:border-[#145592] transition-colors group"
            >
              <span>Share a question or feedback</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Accordion Column */}
          <div className="divide-y divide-[#e3e8ed] border-y border-[#e3e8ed]">
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={item.question} className="py-1">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full py-4 flex items-center justify-between gap-4 text-left focus-visible:outline-2 focus-visible:outline-[#145592]"
                  >
                    <span className="text-[15px] font-semibold text-[#17212c] leading-snug">
                      {item.question}
                    </span>
                    <span className="w-8 h-8 rounded-full border border-[#e3e8ed] flex items-center justify-center text-[#145592] shrink-0">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pb-4 pr-10 text-sm text-[#65717e] leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
