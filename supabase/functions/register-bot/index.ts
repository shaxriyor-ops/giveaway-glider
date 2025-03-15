
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.1';

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handle CORS preflight requests
const handleCors = (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
};

serve(async (req: Request) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  // Create Supabase client
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  try {
    // Get request body
    const { botToken } = await req.json();
    
    // Validate bot token format
    const botTokenRegex = /^\d+:[A-Za-z0-9_-]+$/;
    if (!botTokenRegex.test(botToken)) {
      return new Response(
        JSON.stringify({ error: 'Invalid bot token format' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Check if token already exists
    const { data: existingToken, error: tokenError } = await supabaseClient
      .from('user_tokens')
      .select('user_id')
      .eq('bot_token', botToken)
      .single();

    if (tokenError && tokenError.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error('Error checking for existing token:', tokenError);
      throw new Error('Error checking for existing token');
    }

    if (existingToken) {
      // If token exists, return the user_id
      return new Response(
        JSON.stringify({ user_id: existingToken.user_id }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If token doesn't exist, create a new user and add the token
    // Generate email from bot token
    const tokenParts = botToken.split(':');
    const email = `${tokenParts[0]}@telegram.bot`;
    
    // Create a new user
    const { data: newUser, error: userError } = await supabaseClient.auth.admin.createUser({
      email,
      password: botToken, // Use the bot token as the password
      email_confirm: true,
    });

    if (userError) {
      console.error('Error creating user:', userError);
      throw new Error('Error creating user');
    }

    // Store the bot token
    const { error: insertError } = await supabaseClient
      .from('user_tokens')
      .insert({
        user_id: newUser.user.id,
        bot_token: botToken,
      });

    if (insertError) {
      console.error('Error storing bot token:', insertError);
      throw new Error('Error storing bot token');
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true,
        user_id: newUser.user.id,
        message: 'Bot registered successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in register-bot function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'An unexpected error occurred' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
