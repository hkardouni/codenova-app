export async function POST(req) {
    const body = await req.json();
    const { code } = body;
  
    const clientId = process.env.JDOODLE_CLIENT_ID;
    const clientSecret = process.env.JDOODLE_CLIENT_SECRET;
  
    const response = await fetch("https://api.jdoodle.com/v1/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        script: code,
        language: "python3",
        versionIndex: "3",
        clientId,
        clientSecret,
      }),
    });
  
    const result = await response.json();
  
    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }