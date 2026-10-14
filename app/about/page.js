import Link from "next/link";

const steps = [
  {
    icon: "🔑",
    title: "Sign up in seconds",
    text: "Log in with GitHub and your page goes live instantly at your own username.",
  },
  {
    icon: "🎨",
    title: "Make it yours",
    text: "Add a profile picture, a cover image and your Razorpay details from the dashboard.",
  },
  {
    icon: "☕",
    title: "Get supported",
    text: "Share your link. Fans pay in rupees, leave a message, and appear on your supporters list.",
  },
];

const features = [
  { title: "Direct payments", text: "Money goes through your own Razorpay account, so you stay in control." },
  { title: "Supporter wall", text: "Every successful payment shows up with the supporter's name and message." },
  { title: "Your own page", text: "A clean, personal page with your picture, cover and supporters." },
  { title: "No clutter", text: "No ads, no feeds, no algorithms. Just you and the people who like your work." },
];

const About = () => {
  return (
    <div className="text-[#44210d] w-full">
      {/* Hero */}
      <section className="container mx-auto px-6 py-16 text-center">
        <p className="inline-block bg-[#bea6a0] text-[#44210d] text-xl font-medium px-4 py-1 rounded-2xl mb-5 ">
          About Get Me A Coffee
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          A little coffee can fuel<br className="hidden md:block" /> a lot of creativity
        </h1>
        <p className="max-w-2xl mx-auto mt-5 text-lg font-medium">
          Get Me A Coffee is a simple way for creators to receive support from the
          people who enjoy their work, one cup at a time.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link
            href="/login"
            className="bg-[#5f3b26] hover:bg-[#9e7761] text-[#e5c5b4] text-lg px-6 py-2.5 rounded-2xl transition-colors"
          >
            Start your page
          </Link>
          <Link
            href="/"
            className="bg-[#b5907b] hover:bg-[#9e7761] hover:text-[#ddc5b7] text-lg px-6 py-2.5 rounded-2xl transition-colors"
          >
            Back home
          </Link>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-6 pb-16">
        <div className="max-w-3xl mx-auto bg-[#bea6a0] rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-3">Why we built this</h2>
          <p className="font-medium leading-relaxed">
            Designers, developers, writers and artists pour hours into work that
            people enjoy for free. Fans often want to say thanks but have no easy way
            to do it. We wanted to fix that with something small, friendly and
            quick: a page where a thank-you takes about as long as ordering a coffee.
          </p>
          <p className="font-medium leading-relaxed mt-4">
            No subscriptions to manage and no complicated setup. Share a link, and
            let your community buy you a coffee.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-center mb-10">How it works</h2>
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <div
              key={i}
              className="bg-[#bea6a0] rounded-2xl p-6 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#5f3b26] text-2xl">
                {s.icon}
              </div>
              <span className="text-sm font-bold text-[#692d0a]">STEP {i + 1}</span>
              <h3 className="text-xl font-bold mt-1 mb-2">{s.title}</h3>
              <p className="font-medium">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#3e1c08] text-[#e5c5b4] py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10 text-[#c7855f]">
            What you get
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto hover:cursor-pointer">
            {features.map((f, i) => (
              <div
                key={i}
                className="border-2 border-[#692d0a] rounded-2xl p-5 hover:border-[#c7855f] transition-colors"
              >
                <h3 className="text-lg font-bold text-[#ddc5b7] mb-1">{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers strip */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto text-center">
          {[
            ["1 min", "to set up"],
            ["₹50", "a coffee, to start"],
            ["100%", "your own account"],
          ].map(([big, small], i) => (
            <div key={i} className="bg-[#b5907b] rounded-2xl py-6">
              <div className="text-3xl font-bold">{big}</div>
              <div className="font-medium text-sm mt-1">{small}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 pb-20">
        <div className="max-w-3xl mx-auto bg-[#5f3b26] text-[#e5c5b4] rounded-2xl p-10 text-center shadow-lg">
          <h2 className="text-3xl font-bold mb-3">Ready for your first coffee?</h2>
          <p className="text-lg mb-6">
            Create your page today and let your community say thanks.
          </p>
          <Link
            href="/login"
            className="inline-block bg-[#b5907b] text-[#44210d] hover:bg-[#9e7761] hover:text-[#ddc5b7] text-lg font-medium px-8 py-3 rounded-2xl transition-colors"
          >
            Join the Coffee Community
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;

export const metadata = {
    title: 'About',
  }
  
