const BENEFIT_ITEMS = [
  '3-Day Express Delivery',
  'Secure Checkout',
  '24/7 Customer Support',
  'Curated Daily Essentials',
];

function FourPointStar() {
  return (
    <svg
      className="w-3.5 h-3.5 text-[#145592] shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C13.6 7.4 16.6 10.4 24 12C16.6 13.6 13.6 16.6 12 24C10.4 16.6 7.4 13.6 0 12C7.4 10.4 10.4 7.4 12 0Z" />
    </svg>
  );
}

export function BenefitsMarqueeStrip() {
  const repeated = [...BENEFIT_ITEMS, ...BENEFIT_ITEMS, ...BENEFIT_ITEMS, ...BENEFIT_ITEMS];

  return (
    <div
      role="region"
      aria-label="Shopping benefits"
      className="w-full overflow-hidden bg-[#f4f7fa] border-b border-[#e3e8ed] py-3.5"
    >
      <div className="animate-marquee-slow flex items-center">
        {repeated.map((label, idx) => (
          <div key={`${label}-${idx}`} className="flex items-center gap-6 px-3 shrink-0">
            <span className="text-xs sm:text-[13px] font-medium text-[#17212c] tracking-wide whitespace-nowrap">
              {label}
            </span>
            <FourPointStar />
          </div>
        ))}
      </div>
    </div>
  );
}
