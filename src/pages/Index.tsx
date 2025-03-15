
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar>
        <Link to="/auth">
          <Button variant="default">Get Started</Button>
        </Link>
      </Navbar>
      
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Boost Engagement?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Start creating engaging giveaways for your Telegram audience today.
              It only takes a few minutes to set up your first campaign.
            </p>
            <Link to="/auth">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
