import { useEffect, useState } from 'react';
import { MessageSquarePlus, Star } from 'lucide-react';
import { Product } from '../data/products';

export interface CustomerReview {
  id: string;
  productId: string;
  productTitle: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
}

interface CustomerOpinionsSectionProps {
  products: Product[];
}

const STORAGE_KEY = 'techflex_customer_opinions_v1';

export function CustomerOpinionsSection({ products }: CustomerOpinionsSectionProps) {
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setReviews(parsed);
        }
      }
    } catch {
      // Ignore storage parsing errors
    }
  }, []);

  const handleOpenFormForProduct = (productId: string) => {
    setSelectedProductId(productId);
    setFormError('');
    setIsFormOpen(true);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      setFormError('Please enter your name and your feedback comment.');
      return;
    }

    const product = products.find((p) => p.id === selectedProductId) || products[0];
    const newReview: CustomerReview = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      productTitle: product.title,
      author: author.trim(),
      rating,
      title: title.trim() || 'Customer Experience',
      comment: comment.trim(),
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage quota errors
    }

    setAuthor('');
    setTitle('');
    setComment('');
    setRating(5);
    setIsFormOpen(false);
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <section id="customer-opinions" className="w-full bg-[#F4F7FA] py-16 md:py-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#145592] mb-2.5">
            LOVED BY CUSTOMERS
          </p>
          <h2 className="font-editorial text-[30px] md:text-[42px] font-semibold tracking-tight text-[#17212B] text-balance">
            Our Customers&apos; Opinions
          </h2>
          <p className="text-[15px] text-[#17212B]/70 mt-3 leading-relaxed">
            Real impressions from verified fabaddons shoppers. We never publish
            invented reviews or synthetic scores—every opinion shown here comes directly
            from customers.
          </p>

          {/* Star Rating Presentation */}
          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="flex items-center gap-1" aria-label="5-star feedback scale">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    reviews.length > 0 && averageRating && star <= Math.round(Number(averageRating))
                      ? 'fill-amber-500 text-amber-500'
                      : reviews.length === 0
                        ? 'fill-amber-400/35 text-amber-500'
                        : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs font-medium text-slate-600 tabular-nums">
              {reviews.length > 0
                ? `${averageRating} out of 5 · Based on ${reviews.length} submitted ${
                    reviews.length === 1 ? 'review' : 'reviews'
                  }`
                : 'Verified reviews will appear here as orders are reviewed'}
            </p>
          </div>
        </div>

        {/* Either user-submitted genuine reviews OR authentic customer feedback invitation cards */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {reviews.map((rev) => (
              <article
                key={rev.id}
                className="bg-white border border-slate-200/80 rounded-xl p-6 flex flex-col justify-between gap-4 shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-0.5" aria-label={`${rev.rating} out of 5 stars`}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= rev.rating
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400 tabular-nums">{rev.createdAt}</span>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{rev.title}</h3>
                    <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-gray-900">{rev.author}</span>
                  <span className="text-slate-500 truncate">{rev.productTitle}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {products.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="bg-white border border-slate-200/80 rounded-xl p-6 flex flex-col justify-between gap-5 shadow-xs"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-1" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 text-slate-300" />
                    ))}
                  </div>
                  <h3 className="text-[15px] font-semibold text-gray-900 leading-snug">
                    {product.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Have you added {product.shortTitle} to your routine? Share an honest
                    note on texture, comfort, or packaging for upcoming shoppers.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenFormForProduct(product.id)}
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg border border-slate-200 text-xs font-medium text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors whitespace-nowrap"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5" />
                  Share Your Feedback
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Primary feedback invitation action */}
        <div className="mt-9 text-center">
          <button
            type="button"
            onClick={() => {
              setFormError('');
              setIsFormOpen((prev) => !prev);
            }}
            className="inline-flex items-center gap-2 bg-[#111827] hover:bg-gray-800 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
          >
            <MessageSquarePlus className="w-4 h-4" />
            {isFormOpen ? 'Close Feedback Form' : 'Write a Customer Review'}
          </button>
        </div>

        {/* Interactive customer feedback submission form */}
        {isFormOpen && (
          <form
            onSubmit={handleSubmitReview}
            className="max-w-xl mx-auto mt-8 bg-white border border-slate-200 rounded-xl p-6 md:p-7 shadow-sm space-y-4"
          >
            <h3 className="text-base font-semibold text-gray-900">
              Share Your Experience
            </h3>

            {formError && (
              <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {formError}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="review-product"
                  className="block text-xs font-medium text-slate-700 mb-1.5"
                >
                  Product
                </label>
                <select
                  id="review-product"
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-2 focus:outline-gray-900"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="block text-xs font-medium text-slate-700 mb-1.5">
                  Your Rating
                </span>
                <div className="flex items-center gap-1.5 h-[38px]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      aria-label={`Rate ${star} out of 5 stars`}
                      className="p-1 focus-visible:outline-2 focus-visible:outline-gray-900 rounded"
                    >
                      <Star
                        className={`w-5 h-5 transition-colors ${
                          star <= rating
                            ? 'fill-amber-500 text-amber-500'
                            : 'text-slate-300 hover:text-amber-400'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="review-author"
                  className="block text-xs font-medium text-slate-700 mb-1.5"
                >
                  Your Name
                </label>
                <input
                  id="review-author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="First name or initials"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-gray-900 focus:outline-2 focus:outline-gray-900"
                />
              </div>
              <div>
                <label
                  htmlFor="review-title"
                  className="block text-xs font-medium text-slate-700 mb-1.5"
                >
                  Headline (optional)
                </label>
                <input
                  id="review-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Short summary"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-gray-900 focus:outline-2 focus:outline-gray-900"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="review-comment"
                className="block text-xs font-medium text-slate-700 mb-1.5"
              >
                Your Feedback
              </label>
              <textarea
                id="review-comment"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell other shoppers how you used the product and what you noticed..."
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-gray-900 focus:outline-2 focus:outline-gray-900"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-[#111827] hover:bg-gray-800 text-white text-xs font-medium transition-colors"
              >
                Submit Opinion
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
