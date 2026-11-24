import { Compass, Headphones, ShieldCheck, Sparkles } from 'lucide-react';

const VALUE_CARDS = [
  {
    icon: Sparkles,
    title: 'Curated Finds',
    description:
      'Explore skincare and wellness essentials selected to bring measurable ease to everyday routines.',
  },
  {
    icon: Compass,
    title: 'Thoughtful Value',
    description:
      'Practical multi-pack pricing and straightforward essentials crafted to fit your daily budget.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Checkout',
    description:
      'Complete your order through an encrypted, transparent checkout with clear shipping updates.',
  },
  {
    icon: Headphones,
    title: 'Here to Help',
    description:
      'Have a question about an ingredient, fit, or order? Our dedicated support team is ready to assist.',
  },
];

export function WhyShopSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-editorial text-[30px] md:text-[44px] font-semibold tracking-tight text-[#20232a] text-balance">
            Why Shop With Us?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUE_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="flex flex-col items-center text-center bg-[#145592] text-white rounded-xl px-6 py-8 border border-white/10 shadow-[0_8px_24px_rgba(20,85,146,0.1)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="w-[52px] h-[52px] rounded-full border border-white/25 bg-white/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-white stroke-[1.6]" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2.5 max-w-[220px]">
                  {card.title}
                </h3>
                <p className="text-sm text-white/85 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
