export default function handler(req, res) {
  // 1. Validação do Facebook (Método GET)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Substitua 'MEU_TOKEN_SECRETO' pelo que você definir no Meta
    if (mode === 'subscribe' && token === 'meutoken123') {
      return res.status(200).send(challenge);
    }
    return res.status(403).send('Token inválido');
  }

  // 2. Recebimento de dados (Método POST)
  if (req.method === 'POST') {
    console.log('Dados recebidos:', req.body);
    return res.status(200).send('EVENT_RECEIVED');
  }
}
