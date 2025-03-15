
import React from 'react';
import { MessageSquare, UserCheck, Gift, Trophy } from 'lucide-react';

const steps = [
  {
    icon: <MessageSquare className="w-8 h-8 text-primary" />,
    title: 'Start the Bot',
    description: 'Users start the Telegram bot and provide their channel username.'
  },
  {
    icon: <UserCheck className="w-8 h-8 text-primary" />,
    title: 'Verify Subscription',
    description: 'Bot automatically verifies that the user is subscribed to the channel.'
  },
  {
    icon: <Gift className="w-8 h-8 text-primary" />,
    title: 'Join Giveaway',
    description: 'Subscribed users are automatically entered into the giveaway.'
  },
  {
    icon: <Trophy className="w-8 h-8 text-primary" />,
    title: 'Select Winners',
    description: 'When the giveaway ends, winners are randomly selected and announced.'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
          <p className="text-lg text-muted-foreground">Our bot makes running giveaways simple for both channel owners and participants.</p>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-1/2 hidden md:block"></div>
          
          <div className="space-y-16 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className={`md:flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse text-right'}`}>
                  <div className={`flex-1 mb-8 md:mb-0 text-center ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="max-w-sm mx-auto md:mx-0 md:max-w-none">
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  
                  <div className="mx-auto md:mx-0 z-10 w-16 h-16 rounded-full bg-background border-4 border-primary/20 flex items-center justify-center shadow-lg">
                    {step.icon}
                  </div>
                  
                  <div className="flex-1 hidden md:block"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
