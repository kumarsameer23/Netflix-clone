import { Link } from 'react-router-dom';
import { ChevronRight, Tv, Smartphone, Tablet, Laptop, Film } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-netflix-black text-white"
    >
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=1600)', 
          filter: 'brightness(0.4)'
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-netflix-black/60 via-netflix-black/40 to-netflix-black"></div>
        
        <div className="container-fluid relative z-10 text-center max-w-3xl mx-auto pt-24">
          <motion.div {...fadeInUp}>
            <div className="flex justify-center mb-8">
              <div className="logo-shine flex items-center space-x-3">
                <Film className="w-16 h-16 text-netflix-red" />
                <span className="text-5xl font-bold tracking-wider text-netflix-red">STREAMIX</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Unlimited movies, TV shows, and more
            </h1>
            <p className="text-xl md:text-2xl mb-6">
              Watch anywhere. Cancel anytime.
            </p>
            <p className="text-lg mb-6">
              Ready to watch? Create an account to start your membership.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup" className="netflix-btn text-lg py-3 px-8">
                Sign Up
              </Link>
              <Link to="/login" className="netflix-btn-secondary text-lg py-3 px-8">
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-y border-netflix-gray/20">
        <div className="container-fluid max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Enjoy on your TV
              </h2>
              <p className="text-lg text-netflix-light">
                Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/5082567/pexels-photo-5082567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="TV with Netflix" 
                className="w-full rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-netflix-red rounded-full p-6">
                  <Tv size={48} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-netflix-gray/20">
        <div className="container-fluid max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative">
              <img 
                src="https://images.pexels.com/photos/3082341/pexels-photo-3082341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Mobile devices" 
                className="w-full rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-netflix-black border-2 border-netflix-gray/40 p-3 rounded-lg flex items-center w-3/4 max-w-xs">
                <img 
                  src="https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Boxshot" 
                  className="w-12 h-16 object-cover rounded mr-4"
                />
                <div className="flex-1">
                  <p className="font-medium">Stranger Things</p>
                  <p className="text-sm text-blue-500">Downloading...</p>
                </div>
                <div className="text-netflix-red">
                  <Smartphone size={24} />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Download your shows to watch offline
              </h2>
              <p className="text-lg text-netflix-light">
                Save your favorites easily and always have something to watch.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-netflix-gray/20">
        <div className="container-fluid max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Watch everywhere
              </h2>
              <p className="text-lg text-netflix-light">
                Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
              </p>
            </div>
            <div className="relative grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center">
                <div className="bg-netflix-gray/20 p-4 rounded-lg mb-2">
                  <Smartphone size={48} className="text-netflix-red" />
                </div>
                <p>Phone</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-netflix-gray/20 p-4 rounded-lg mb-2">
                  <Tablet size={48} className="text-netflix-red" />
                </div>
                <p>Tablet</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-netflix-gray/20 p-4 rounded-lg mb-2">
                  <Laptop size={48} className="text-netflix-red" />
                </div>
                <p>Computer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container-fluid max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4 mb-12">
            {faqItems.map((item, index) => (
              <details 
                key={index} 
                className="bg-netflix-dark rounded group"
              >
                <summary className="flex justify-between items-center p-4 cursor-pointer font-medium">
                  {item.question}
                  <ChevronRight className="transform group-open:rotate-90 transition-transform" />
                </summary>
                <div className="p-4 border-t border-netflix-gray/20">
                  <p className="text-netflix-light">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-lg mb-6">
              Ready to watch? Create an account to start your membership.
            </p>
            <Link to="/signup" className="netflix-btn text-lg py-3 px-8">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const faqItems = [
  {
    question: "What is Netflix?",
    answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices."
  },
  {
    question: "How much does Netflix cost?",
    answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $8.99 to $17.99 a month."
  },
  {
    question: "Where can I watch?",
    answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device."
  },
  {
    question: "How do I cancel?",
    answer: "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks."
  },
  {
    question: "What can I watch on Netflix?",
    answer: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."
  }
];

export default Home;