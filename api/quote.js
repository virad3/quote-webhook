export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      const googleAppsScriptUrl = "https://script.google.com/macros/s/AKfycbwLje43AV4n2R32OJl2W6_j6t3jrSbsHIhfBh-1ro0pIRdT0uSCMxPjOReG-Rbh5YyWLA/exec";

      const response = await fetch(googleAppsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });

      const text = await response.text(); // Google might return plain text
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { success: true, raw: text };
      }

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).json(data);
    } catch (error) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
