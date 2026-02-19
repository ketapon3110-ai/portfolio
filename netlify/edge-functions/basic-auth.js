const base64 = (str) => {
  // Edge(Deno)でも動くBase64
  return btoa(unescape(encodeURIComponent(str)));
};

export default async (request, context) => {
  const user = Deno.env.get("BASIC_USER") || "";
  const pass = Deno.env.get("BASIC_PASS") || "";

  if (!user || !pass) {
    return new Response("Auth is not configured.", { status: 500 });
  }

  const expected = "Basic " + base64(`${user}:${pass}`);
  const auth = request.headers.get("authorization") || "";

  if (auth !== expected) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Portfolio"' },
    });
  }

  return context.next();
};
