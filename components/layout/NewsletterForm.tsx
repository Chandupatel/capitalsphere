"use client";

export function NewsletterForm() {
  return (
    <form
      className="flex overflow-hidden rounded-full border border-white/15 bg-white/5"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        required
        placeholder="Enter your email"
        className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-navy-100/40 focus:outline-none"
      />
      <button
        type="submit"
        className="flex shrink-0 items-center justify-center bg-gold-500 px-4 text-navy-950 transition-colors hover:bg-gold-400"
        aria-label="Subscribe"
      >
        →
      </button>
    </form>
  );
}
