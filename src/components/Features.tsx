
import React from 'react';
import GlassCard from './GlassCard';
import { Users, Gift, Calendar, Smartphone, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: <Gift className="w-6 h-6 text-primary" />,
    title: 'Effortless Giveaways',
    description: 'Set up and manage Telegram giveaways with just a few clicks from our intuitive dashboard.'
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: 'Subscriber Verification',
    description: 'Automatically verify that participants are subscribed to your Telegram channel.'
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: 'Random Winner Selection',
    description: 'Select winners completely at random with our secure and transparent selection process.'
  },
  {
    icon: <Calendar className="w-6 h-6 text-primary" />,
    title: 'Scheduled Giveaways',
    description: 'Set start and end dates for your giveaways and let the system handle the rest.'
  },
  {
    icon: <Smartphone className="w-6 h-6 text-primary" />,
    title: 'Telegram Integration',
    description: 'Seamless integration with Telegram allows for easy participation and winner announcements.'
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: 'Secure & Private',
    description: 'Your data and your subscribers' information is always kept secure and private.'
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Everything You Need for Successful Giveaways</h2>
          <p className="text-lg text-muted-foreground">Our platform provides all the tools you need to run engaging, fair, and successful giveaways on Telegram.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card h-full">
              <GlassCard className="h-full" withHover>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
