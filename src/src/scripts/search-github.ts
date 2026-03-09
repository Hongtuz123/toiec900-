import https from 'https';

function fetchJson(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Node.js' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function search() {
  try {
    const result = await fetchJson('https://api.github.com/search/code?q=toeic+extension:json');
    console.log(`Found ${result.total_count} results`);
    for (const item of result.items.slice(0, 5)) {
      console.log(item.html_url);
      console.log(item.raw_url || item.url);
    }
  } catch (e) {
    console.error(e);
  }
}

search();
