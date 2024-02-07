// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

const target = "http://foo.bar.com:2024"
const edgeFunctionName = "foobar-proxy"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function reqHandler(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  const { pathname, search} = new URL(req.url);
  const data = await req.text();
  return fetch(target + pathname.replace(`/${edgeFunctionName}`, '') + search, {headers: req.headers, method: req.method, body: data});
}

Deno.serve(reqHandler);
