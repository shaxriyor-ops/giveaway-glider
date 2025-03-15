
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from './Button';
import GlassCard from './GlassCard';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden hero-gradient">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <div className="animate-slide-down">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground mb-6 text-balance">
                Automate Your Telegram Giveaways with Ease
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance">
                Simplify subscriber verification, winner selection, and giveaway management with our intuitive bot and dashboard.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button size="lg" icon={<ArrowRight />} iconPosition="right">
                  Get Started
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 relative w-full max-w-lg mx-auto">
            <div className="absolute -top-5 -right-5 w-40 h-40 bg-primary/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full filter blur-3xl animate-pulse-slow delay-300"></div>
            
            <div className="relative animate-float">
              <GlassCard className="mb-6 transform rotate-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    🎉
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">New Giveaway</h3>
                    <p className="text-sm text-muted-foreground">iPhone 14 Pro Max - Ends in 3 days</p>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard className="ml-10 transform -rotate-1">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    🏆
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Winner Selected!</h3>
                    <p className="text-sm text-muted-foreground">@username won the PlayStation 5</p>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard className="-ml-6 mt-6 transform rotate-1">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    👥
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Participants</h3>
                    <p className="text-sm text-muted-foreground">1,234 participants and counting!</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
