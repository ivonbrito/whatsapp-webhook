export default async function handler(req, res) {
  const VERIFY_TOKEN = "meutoken123";

  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      res.setHeader("Content-Type", "text/plain");
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send("Forbidden");
    }
  }

  if (req.method === "POST") {
    console.log("Evento recebido:", req.body);

    await fetch("https://system-design-project-0edae.goskip.app/webhook/whatsapp-inbox", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    return res.status(200).send("OK");
  }

  return res.status(405).send("Method Not Allowed");
}