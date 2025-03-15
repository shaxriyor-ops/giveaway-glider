
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, FileText, GiftIcon, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Manage your Telegram giveaways from here.
          </p>
        </div>
        <Link to="/create-giveaway">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New Giveaway
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="giveaways">Giveaways</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Giveaways</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Channels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common things you might want to do</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Link to="/create-giveaway">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <GiftIcon className="h-4 w-4" />
                    Create New Giveaway
                  </Button>
                </Link>
                <Link to="/channels">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Users className="h-4 w-4" />
                    Add New Channel
                  </Button>
                </Link>
                <Link to="/giveaways">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <FileText className="h-4 w-4" />
                    View All Giveaways
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>New to Telegram Giveaways?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Follow these steps to create your first giveaway:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Add your Telegram bot as an admin to your channel</li>
                  <li>Add your channel to the platform</li>
                  <li>Create a new giveaway</li>
                  <li>Share the giveaway with your subscribers</li>
                </ol>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">
                  View Documentation
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="giveaways" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Giveaways</CardTitle>
              <CardDescription>Manage all your giveaway campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <GiftIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No giveaways yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Create your first giveaway to start engaging with your audience
                </p>
                <Link to="/create-giveaway" className="mt-4 inline-block">
                  <Button className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Create Giveaway
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Channels</CardTitle>
              <CardDescription>Manage your connected Telegram channels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No channels connected</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Connect your Telegram channels to start creating giveaways
                </p>
                <Link to="/channels" className="mt-4 inline-block">
                  <Button className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Add Channel
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
