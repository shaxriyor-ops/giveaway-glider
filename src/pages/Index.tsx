
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import Button from '@/components/Button';

const Index: React.FC = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center z-0 opacity-10"
            style={{ backgroundImage: `url(/src/assets/waves.svg)` }}
          ></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Supercharge Your Telegram Giveaways?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Start using GiveawayBot today and simplify your giveaway process from start to finish.
              </p>
              
              <GlassCard className="md:p-8">
                <div className="text-center max-w-xl mx-auto">
                  <h3 className="text-xl font-semibold mb-4">Get Started in Minutes</h3>
                  <p className="text-muted-foreground mb-6">
                    No complicated setup. Just connect your Telegram bot token and start creating engaging giveaways for your audience.
                  </p>
                  <Button size="lg">
                    Launch Your First Giveaway
                  </Button>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
