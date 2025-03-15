
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Channel {
  id: string;
  channel_name: string;
  telegram_channel_id: string;
}

const CreateGiveaway = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prize, setPrize] = useState('');
  const [numWinners, setNumWinners] = useState(1);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)); // Default to 7 days from now
  const [selectedChannelId, setSelectedChannelId] = useState('');
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchingChannels, setFetchingChannels] = useState(true);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        setFetchingChannels(true);
        const { data, error } = await supabase
          .from('channels')
          .select('*')
          .eq('user_id', user?.id);
        
        if (error) throw error;
        setChannels(data || []);
        
        // If there's exactly one channel, select it automatically
        if (data && data.length === 1) {
          setSelectedChannelId(data[0].id);
        }
      } catch (err) {
        console.error('Error fetching channels:', err);
      } finally {
        setFetchingChannels(false);
      }
    };

    if (user) {
      fetchChannels();
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Form validation
    if (!title || !prize || !selectedChannelId) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (startDate >= endDate) {
      setError('End date must be after start date');
      return;
    }

    try {
      setLoading(true);
      
      // Insert the giveaway into the database
      const { data, error } = await supabase
        .from('giveaways')
        .insert({
          user_id: user?.id,
          channel_id: selectedChannelId,
          title,
          description,
          prize,
          num_winners: numWinners,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          status: 'pending'
        })
        .select();
      
      if (error) throw error;
      
      // Redirect to the giveaway details page or dashboard
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Error creating giveaway:', err);
      setError(err.message || 'Failed to create giveaway');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 py-8 max-w-3xl">
      <div className="flex items-center mb-6">
        <Link to="/dashboard" className="mr-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Create Giveaway</h1>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Giveaway Details</CardTitle>
          <CardDescription>
            Fill in the details for your new giveaway
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Giveaway Title *</Label>
              <Input 
                id="title" 
                placeholder="Enter a title for your giveaway"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Enter a description for your giveaway"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prize">Prize *</Label>
              <Input 
                id="prize" 
                placeholder="What are you giving away?"
                value={prize}
                onChange={(e) => setPrize(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="channel">Channel *</Label>
              {fetchingChannels ? (
                <div className="text-sm text-muted-foreground">Loading channels...</div>
              ) : channels.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  You don't have any channels yet. 
                  <Link to="/channels" className="ml-2 text-primary underline">
                    Add a channel
                  </Link>
                </div>
              ) : (
                <Select value={selectedChannelId} onValueChange={setSelectedChannelId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a channel" />
                  </SelectTrigger>
                  <SelectContent>
                    {channels.map((channel) => (
                      <SelectItem key={channel.id} value={channel.id}>
                        {channel.channel_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numWinners">Number of Winners</Label>
                <Input 
                  id="numWinners" 
                  type="number"
                  min="1"
                  value={numWinners}
                  onChange={(e) => setNumWinners(parseInt(e.target.value) || 1)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => date && setStartDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => date && setEndDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !selectedChannelId}>
              {loading ? 'Creating...' : 'Create Giveaway'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateGiveaway;
