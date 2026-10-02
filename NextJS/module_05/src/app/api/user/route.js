import { headers } from "next/headers";

const markup = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Understanding HTTP Headers and the Headers API</title>
</head>
<body>

    <h1>HTTP Headers &amp; the JavaScript Headers API</h1>

    <hr>

    <h2>1. What are HTTP Headers?</h2>
    <p>
        HTTP headers are key-value pairs sent between a client (like a browser) and a server. 
        They pass extra metadata along with an HTTP request or response, such as content formats, 
        authentication tokens, and caching policies.
    </p>

    <h2>2. Common Header Categories</h2>
    <ul>
        <li><strong>Request Headers:</strong> Sent by the client (e.g., <code>Authorization</code>, <code>User-Agent</code>, <code>Accept</code>).</li>
        <li><strong>Response Headers:</strong> Sent by the server (e.g., <code>Set-Cookie</code>, <code>Server</code>).</li>
        <li><strong>Representation/Entity Headers:</strong> Describe the payload (e.g., <code>Content-Type</code>, <code>Content-Length</code>).</li>
    </ul>

    <hr>
    <pre>
for (const [key, value] of headers.entries()) {
    console.log(key + ": " + value);
}
    </pre>

    <h3>Method C: Converting Values to an Array</h3>
    <pre>
const allValues = Array.from(headers.values());
allValues.forEach((val) =&gt; {
    console.log(val);
});
    </pre>

    <hr>

    <h2>5. Common Pitfall</h2>
    <p>
        <strong>Incorrect:</strong> <code>headers.values.array.forEach(...)</code><br>
        <strong>Why it fails:</strong> <code>headers.values()</code> is an iterator function, not an object containing a property called <code>array</code>.
    </p>

</body>
</html>`;

export async function GET(request) {
  const reqHeaders = await headers();
  return new Response(markup, {
    headers: {
      "Content-Type": "text/HTML",
    },
  });
}
