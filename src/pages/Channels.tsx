
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, Trash2, Users, PlusCircle } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Channel {
  id: string;
  channel_name: string;
  telegram_channel_id: string;
}

const Channels = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [channelName, setChannelName] = useState('');
  const [channelId, setChannelId] = useState('');
  const [addingChannel, setAddingChannel] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const fetchChannels = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('channels')
        .select('*')
        .eq('user_id', user?.id);
      
      if (error) throw error;
      setChannels(data || []);
    } catch (err: any) {
      console.error('Error fetching channels:', err);
      setError(err.message || 'Failed to fetch channels');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchChannels();
    }
  }, [user]);

  const handleAddChannel = async () => {
    setError(null);
    
    if (!channelName || !channelId) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setAddingChannel(true);
      
      // Insert the channel into the database
      const { data, error } = await supabase
        .from('channels')
        .insert({
          user_id: user?.id,
          channel_name: channelName,
          telegram_channel_id: channelId,
        })
        .select();
      
      if (error) throw error;
      
      // Reset form and close dialog
      setChannelName('');
      setChannelId('');
      setAddDialogOpen(false);
      
      // Refresh the channels list
      fetchChannels();
    } catch (err: any) {
      console.error('Error adding channel:', err);
      setError(err.message || 'Failed to add channel');
    } finally {
      setAddingChannel(false);
    }
  };

  const handleDeleteChannel = async (id: string) => {
    try {
      const { error } = await supabase
        .from('channels')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Refresh the channels list
      fetchChannels();
    } catch (err: any) {
      console.error('Error deleting channel:', err);
      setError(err.message || 'Failed to delete channel');
    }
  };

  return (
    <div className="container mx-auto p-4 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link to="/dashboard" className="mr-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Telegram Channels</h1>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Channel
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Telegram Channel</DialogTitle>
              <DialogDescription>
                Add your Telegram channel to start running giveaways
              </DialogDescription>
            </DialogHeader>
            
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="channelName">Channel Name</Label>
                <Input 
                  id="channelName" 
                  placeholder="My Awesome Channel"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="channelId">Channel ID or Username</Label>
                <Input 
                  id="channelId" 
                  placeholder="@mychannel or -1001234567890"
                  value={channelId}
                  onChange={(e) => setChannelId(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Enter your channel username (with @) or channel ID
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddChannel} disabled={addingChannel}>
                {addingChannel ? 'Adding...' : 'Add Channel'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && !addDialogOpen && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-sm text-muted-foreground">Loading channels...</p>
          </div>
        ) : channels.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No channels yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Add your Telegram channels to start creating giveaways
              </p>
              <Button className="mt-4" onClick={() => setAddDialogOpen(true)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Channel
              </Button>
            </CardContent>
          </Card>
        ) : (
          channels.map((channel) => (
            <Card key={channel.id}>
              <CardHeader className="pb-3">
                <CardTitle>{channel.channel_name}</CardTitle>
                <CardDescription>
                  {channel.telegram_channel_id.startsWith('@') ? 
                    channel.telegram_channel_id : 
                    `Channel ID: ${channel.telegram_channel_id}`}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View Subscribers</Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove the channel and all associated giveaways. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteChannel(channel.id)}>
                        Remove Channel
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Channels;
