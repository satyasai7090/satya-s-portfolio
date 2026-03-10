import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Check, ChevronDown, ChevronRight, Lock, Globe, Server, Menu, X, FileText, Shield, Bell, Gauge } from "lucide-react";

/* ─── Microsoft Writing Style Guide compliance notes ───
  - Second person ("you") throughout
  - Active voice, present tense
  - Task-based headings
  - Short, scannable sentences
  - Consistent terminology
  - "Select" not "click", "enter" not "type"
─────────────────────────────────────────────────────── */

type PageId = "reference" | "auth" | "webhooks";

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: "reference", label: "API Reference", icon: FileText },
  { id: "auth", label: "Authentication & Security", icon: Shield },
  { id: "webhooks", label: "Webhooks & Events", icon: Bell },
];

// ─── Shared components ───

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="absolute top-3 right-3 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors" aria-label="Copy code">
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
    </button>
  );
}

function CodeBlock({ code, lang = "bash" }: { code: string; lang?: string }) {
  const colorClass = lang === "json" ? "text-blue-300/80" : "text-emerald-300/90";
  return (
    <div className="relative rounded-lg bg-[hsl(220,20%,8%)] p-4 overflow-x-auto">
      <CopyButton text={code} />
      <pre className={`text-xs font-mono ${colorClass} leading-relaxed whitespace-pre-wrap`}>{code}</pre>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold text-foreground mb-4 mt-10 first:mt-0" style={{ fontFamily: "'Playfair Display', serif" }}>{children}</h2>;
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold text-foreground mb-3 mt-8">{children}</h3>;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{children}</p>;
}

function InfoBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 mb-6">
      <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

function WarningBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 mb-6">
      <p className="text-sm font-semibold text-amber-400 mb-1">⚠ {title}</p>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

// ─── Method badge colors ───
const methodColors: Record<string, string> = {
  GET: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  POST: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  DELETE: "bg-red-500/15 text-red-400 border-red-500/30",
  PUT: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  PATCH: "bg-purple-500/15 text-purple-400 border-purple-500/30",
};

// ─── Endpoint data ───
const endpoints = [
  {
    method: "GET",
    path: "/transfers",
    summary: "List all file transfers",
    description: "Returns a paginated list of file transfers for your account. You can filter results by status, date range, and destination.",
    parameters: [
      { name: "status", type: "string", required: false, description: 'Filter by transfer status. Accepted values: "pending", "in_progress", "completed", "failed".' },
      { name: "from_date", type: "string", required: false, description: "ISO 8601 date. Returns transfers created on or after this date." },
      { name: "to_date", type: "string", required: false, description: "ISO 8601 date. Returns transfers created on or before this date." },
      { name: "limit", type: "integer", required: false, description: "Number of results per page. Default: 25. Maximum: 100." },
      { name: "offset", type: "integer", required: false, description: "Number of results to skip. Use this for pagination." },
    ],
    request: `curl -X GET "https://api.nexusmft.io/v1/transfers?status=completed&limit=10" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Accept: application/json"`,
    response: `{
  "data": [
    {
      "id": "txr_8a3b1c2d",
      "file_name": "report_Q4_2025.csv",
      "size_bytes": 2048576,
      "status": "completed",
      "source": "sftp://uploads.acme.com/outbox",
      "destination": "s3://acme-archive/reports/",
      "created_at": "2025-12-15T09:30:00Z",
      "completed_at": "2025-12-15T09:30:12Z"
    }
  ],
  "pagination": {
    "total": 142,
    "limit": 10,
    "offset": 0,
    "has_more": true
  }
}`,
    responseCode: 200,
  },
  {
    method: "POST",
    path: "/transfers",
    summary: "Create a file transfer",
    description: "Creates a new file transfer job. The system queues the transfer immediately and processes it based on priority and server availability.",
    parameters: [
      { name: "source_uri", type: "string", required: true, description: "URI of the source file. Supported protocols: sftp://, ftps://, s3://, azure://." },
      { name: "destination_uri", type: "string", required: true, description: "URI of the destination. You must pre-configure the endpoint in the Admin Console." },
      { name: "priority", type: "string", required: false, description: 'Transfer priority. Accepted values: "low", "normal", "high". Default: "normal".' },
      { name: "notify_on_complete", type: "boolean", required: false, description: "Set to true to receive a webhook notification when the transfer finishes. Default: false." },
      { name: "metadata", type: "object", required: false, description: "Custom key-value pairs. Maximum: 10 keys, 256 characters per value." },
    ],
    request: `curl -X POST "https://api.nexusmft.io/v1/transfers" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "source_uri": "sftp://uploads.acme.com/outbox/report.csv",
    "destination_uri": "s3://acme-archive/reports/",
    "priority": "high",
    "notify_on_complete": true,
    "metadata": {
      "department": "finance",
      "quarter": "Q4-2025"
    }
  }'`,
    response: `{
  "id": "txr_9f4e2d1a",
  "status": "pending",
  "source_uri": "sftp://uploads.acme.com/outbox/report.csv",
  "destination_uri": "s3://acme-archive/reports/",
  "priority": "high",
  "created_at": "2025-12-15T14:22:00Z",
  "estimated_start": "2025-12-15T14:22:05Z"
}`,
    responseCode: 201,
  },
  {
    method: "GET",
    path: "/transfers/{transfer_id}",
    summary: "Get transfer details",
    description: "Returns detailed information about a specific file transfer, including progress, transfer speed, and error details if the transfer failed.",
    parameters: [
      { name: "transfer_id", type: "string", required: true, description: "The unique identifier of the transfer. This is a path parameter." },
    ],
    request: `curl -X GET "https://api.nexusmft.io/v1/transfers/txr_8a3b1c2d" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    response: `{
  "id": "txr_8a3b1c2d",
  "file_name": "report_Q4_2025.csv",
  "size_bytes": 2048576,
  "transferred_bytes": 2048576,
  "progress_pct": 100,
  "status": "completed",
  "speed_bps": 170714,
  "source": "sftp://uploads.acme.com/outbox",
  "destination": "s3://acme-archive/reports/",
  "checksum_sha256": "a3f2c1...e8d9b4",
  "created_at": "2025-12-15T09:30:00Z",
  "completed_at": "2025-12-15T09:30:12Z",
  "retry_count": 0,
  "error": null
}`,
    responseCode: 200,
  },
  {
    method: "DELETE",
    path: "/transfers/{transfer_id}",
    summary: "Cancel a transfer",
    description: "Cancels a transfer that has a status of \"pending\" or \"queued\". You can't cancel transfers that are already in progress.",
    parameters: [
      { name: "transfer_id", type: "string", required: true, description: "The unique identifier of the transfer to cancel. This is a path parameter." },
    ],
    request: `curl -X DELETE "https://api.nexusmft.io/v1/transfers/txr_9f4e2d1a" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    response: `{
  "id": "txr_9f4e2d1a",
  "status": "cancelled",
  "cancelled_at": "2025-12-15T14:23:00Z"
}`,
    responseCode: 200,
  },
];

const errorCodes = [
  { code: 400, meaning: "Bad Request", description: "The request body is missing required fields or contains invalid values." },
  { code: 401, meaning: "Unauthorized", description: "Your API key is missing, invalid, or expired." },
  { code: 403, meaning: "Forbidden", description: "Your API key doesn't have permission for this operation." },
  { code: 404, meaning: "Not Found", description: "The specified resource doesn't exist." },
  { code: 409, meaning: "Conflict", description: "The transfer can't be modified in its current state." },
  { code: 429, meaning: "Rate Limited", description: "You've exceeded the request limit. Wait for the time specified in the Retry-After header." },
  { code: 500, meaning: "Internal Server Error", description: "An unexpected error occurred. If this persists, contact support." },
];

// ─── Endpoint block component ───

function EndpointBlock({ endpoint, index }: { endpoint: typeof endpoints[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0);
  return (
    <motion.div
      className="border border-border/60 rounded-xl overflow-hidden bg-card/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-accent/30 transition-colors">
        {isOpen ? <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
        <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${methodColors[endpoint.method]}`}>{endpoint.method}</span>
        <code className="text-sm font-mono text-foreground">{endpoint.path}</code>
        <span className="text-sm text-muted-foreground ml-auto hidden sm:block">{endpoint.summary}</span>
        <Lock className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 space-y-5 border-t border-border/40">
          <Paragraph>{endpoint.description}</Paragraph>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Parameters</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="text-left py-2 pr-4 text-xs font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-2 pr-4 text-xs font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-2 pr-4 text-xs font-medium text-muted-foreground">Required</th>
                    <th className="text-left py-2 text-xs font-medium text-muted-foreground">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {endpoint.parameters.map((param) => (
                    <tr key={param.name} className="border-b border-border/20">
                      <td className="py-2.5 pr-4"><code className="text-xs font-mono text-primary">{param.name}</code></td>
                      <td className="py-2.5 pr-4 text-xs text-muted-foreground font-mono">{param.type}</td>
                      <td className="py-2.5 pr-4">
                        {param.required
                          ? <span className="text-xs px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">required</span>
                          : <span className="text-xs text-muted-foreground">optional</span>}
                      </td>
                      <td className="py-2.5 text-xs text-muted-foreground">{param.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Request example</h4>
            <CodeBlock code={endpoint.request} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Response</h4>
              <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">{endpoint.responseCode}</span>
            </div>
            <CodeBlock code={endpoint.response} lang="json" />
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── Page: API Reference ───

function ApiReferencePage() {
  return (
    <div>
      <SectionHeading>API Reference</SectionHeading>
      <Paragraph>
        Use the Nexus MFT REST API to manage file transfers programmatically. You can create, monitor, and cancel transfers across your infrastructure.
      </Paragraph>

      <InfoBox title="Base URL">
        <div className="flex items-center gap-2 mt-1">
          <Globe className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
          <code className="text-sm font-mono text-foreground">https://api.nexusmft.io/v1</code>
        </div>
      </InfoBox>

      <SubHeading>Before you begin</SubHeading>
      <Paragraph>
        To use the API, you need an API key with the appropriate permissions. For instructions on how to generate and manage API keys, see <button className="text-primary hover:underline">Authentication & Security</button>.
      </Paragraph>

      <SubHeading>Endpoints</SubHeading>
      <div className="space-y-3">
        {endpoints.map((endpoint, i) => (
          <EndpointBlock key={`${endpoint.method}-${endpoint.path}`} endpoint={endpoint} index={i} />
        ))}
      </div>

      <SubHeading>Error codes</SubHeading>
      <Paragraph>
        When a request fails, the API returns an HTTP status code and a JSON error object. The following table lists the standard error codes.
      </Paragraph>
      <div className="overflow-x-auto rounded-xl border border-border/50">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/30 border-b border-border/40">
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Code</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            {errorCodes.map((err) => (
              <tr key={err.code} className="border-b border-border/20 hover:bg-accent/20 transition-colors">
                <td className="px-4 py-3"><code className="text-xs font-mono font-semibold text-red-400">{err.code}</code></td>
                <td className="px-4 py-3 text-sm text-foreground font-medium">{err.meaning}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{err.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubHeading>Rate limits</SubHeading>
      <Paragraph>
        The API enforces rate limits to ensure fair usage. You can make up to 100 requests per minute per API key. If you exceed this limit, the API returns a <code className="text-xs px-1 py-0.5 rounded bg-muted font-mono text-foreground">429</code> status code with a <code className="text-xs px-1 py-0.5 rounded bg-muted font-mono text-foreground">Retry-After</code> header that indicates how long to wait before you retry.
      </Paragraph>
      <InfoBox title="Rate limit headers">
        <p className="mt-1">Every response includes the following headers:</p>
        <ul className="mt-2 space-y-1 text-xs">
          <li><code className="font-mono text-foreground">X-RateLimit-Limit</code> — Maximum requests per minute</li>
          <li><code className="font-mono text-foreground">X-RateLimit-Remaining</code> — Requests remaining in the current window</li>
          <li><code className="font-mono text-foreground">X-RateLimit-Reset</code> — Unix timestamp when the limit resets</li>
        </ul>
      </InfoBox>
    </div>
  );
}

// ─── Page: Authentication & Security ───

function AuthPage() {
  return (
    <div>
      <SectionHeading>Authentication & Security</SectionHeading>
      <Paragraph>
        All requests to the Nexus MFT API require authentication. The API uses Bearer token authentication to verify your identity and authorize access to resources.
      </Paragraph>

      <SubHeading>Authenticate your requests</SubHeading>
      <Paragraph>
        Include your API key in the <code className="text-xs px-1 py-0.5 rounded bg-muted font-mono text-foreground">Authorization</code> header of every request.
      </Paragraph>
      <CodeBlock code={`Authorization: Bearer YOUR_API_KEY`} />

      <SubHeading>Generate an API key</SubHeading>
      <Paragraph>To generate a new API key:</Paragraph>
      <ol className="text-sm text-muted-foreground space-y-2 mb-6 ml-4 list-decimal list-outside">
        <li>Sign in to the Nexus MFT Admin Console.</li>
        <li>Go to <strong className="text-foreground">Settings</strong> &gt; <strong className="text-foreground">API Keys</strong>.</li>
        <li>Select <strong className="text-foreground">Create API Key</strong>.</li>
        <li>Enter a descriptive name for the key (for example, "Production - Transfer Service").</li>
        <li>Select the permissions you want to assign to the key.</li>
        <li>Select <strong className="text-foreground">Generate</strong>.</li>
      </ol>

      <WarningBox title="Important">
        <p>Copy and store your API key immediately after you generate it. For security reasons, the full key is shown only once. If you lose it, you must generate a new key.</p>
      </WarningBox>

      <SubHeading>API key permissions</SubHeading>
      <Paragraph>
        Each API key can be scoped to specific permissions. Assign only the permissions that your integration requires.
      </Paragraph>
      <div className="overflow-x-auto rounded-xl border border-border/50 mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/30 border-b border-border/40">
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Permission</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Scope</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              { perm: "transfers:read", scope: "Read", desc: "List and view transfer details." },
              { perm: "transfers:write", scope: "Write", desc: "Create and cancel transfers." },
              { perm: "webhooks:manage", scope: "Admin", desc: "Create, update, and delete webhook subscriptions." },
              { perm: "endpoints:manage", scope: "Admin", desc: "Configure source and destination endpoints." },
              { perm: "audit:read", scope: "Read", desc: "View audit logs and transfer history." },
            ].map((row) => (
              <tr key={row.perm} className="border-b border-border/20 hover:bg-accent/20 transition-colors">
                <td className="px-4 py-3"><code className="text-xs font-mono text-primary">{row.perm}</code></td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{row.scope}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubHeading>Rotate your API keys</SubHeading>
      <Paragraph>
        To maintain security, rotate your API keys regularly. When you rotate a key, the old key remains active for 24 hours to give you time to update your integrations.
      </Paragraph>
      <Paragraph>To rotate an API key:</Paragraph>
      <ol className="text-sm text-muted-foreground space-y-2 mb-6 ml-4 list-decimal list-outside">
        <li>Go to <strong className="text-foreground">Settings</strong> &gt; <strong className="text-foreground">API Keys</strong> in the Admin Console.</li>
        <li>Find the key you want to rotate and select <strong className="text-foreground">Rotate</strong>.</li>
        <li>Copy the new key and update your integration.</li>
        <li>Verify that your integration works with the new key.</li>
        <li>The old key is automatically revoked after 24 hours.</li>
      </ol>

      <SubHeading>Security best practices</SubHeading>
      <ul className="text-sm text-muted-foreground space-y-2 mb-6 ml-4 list-disc list-outside">
        <li>Never expose API keys in client-side code or public repositories.</li>
        <li>Use environment variables or a secrets manager to store your keys.</li>
        <li>Assign the minimum permissions required for each integration.</li>
        <li>Monitor the audit log for unexpected API activity.</li>
        <li>Rotate keys every 90 days or immediately if you suspect a compromise.</li>
      </ul>

      <SubHeading>IP allowlisting</SubHeading>
      <Paragraph>
        For additional security, you can restrict API access to specific IP addresses. When you enable IP allowlisting, the API rejects requests from IP addresses that aren't on your list.
      </Paragraph>
      <CodeBlock code={`{
  "allowed_ips": [
    "203.0.113.10",
    "198.51.100.0/24"
  ],
  "enforce": true
}`} lang="json" />
      <Paragraph>
        To configure IP allowlisting, go to <strong className="text-foreground">Settings</strong> &gt; <strong className="text-foreground">Security</strong> &gt; <strong className="text-foreground">IP Allowlist</strong> in the Admin Console.
      </Paragraph>
    </div>
  );
}

// ─── Page: Webhooks & Events ───

function WebhooksPage() {
  return (
    <div>
      <SectionHeading>Webhooks & Events</SectionHeading>
      <Paragraph>
        Use webhooks to receive real-time notifications when events occur in your Nexus MFT account. Instead of polling the API for status updates, you can configure the system to send HTTP POST requests to your endpoint when a transfer completes, fails, or requires attention.
      </Paragraph>

      <SubHeading>How webhooks work</SubHeading>
      <ol className="text-sm text-muted-foreground space-y-2 mb-6 ml-4 list-decimal list-outside">
        <li>You register a webhook endpoint URL and select the events you want to subscribe to.</li>
        <li>When a subscribed event occurs, the system sends an HTTP POST request to your endpoint.</li>
        <li>Your endpoint processes the payload and returns a <code className="text-xs px-1 py-0.5 rounded bg-muted font-mono text-foreground">200</code> status code to acknowledge receipt.</li>
        <li>If your endpoint doesn't respond within 10 seconds or returns a non-2xx status, the system retries up to 3 times with exponential backoff.</li>
      </ol>

      <SubHeading>Register a webhook</SubHeading>
      <Paragraph>
        To register a new webhook, send a POST request to the <code className="text-xs px-1 py-0.5 rounded bg-muted font-mono text-foreground">/webhooks</code> endpoint.
      </Paragraph>
      <CodeBlock code={`curl -X POST "https://api.nexusmft.io/v1/webhooks" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://your-app.com/webhooks/nexus",
    "events": [
      "transfer.completed",
      "transfer.failed"
    ],
    "secret": "whsec_your_signing_secret"
  }'`} />

      <SubHeading>Supported events</SubHeading>
      <div className="overflow-x-auto rounded-xl border border-border/50 mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/30 border-b border-border/40">
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Event</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Trigger</th>
            </tr>
          </thead>
          <tbody>
            {[
              { event: "transfer.created", trigger: "A new transfer job is created." },
              { event: "transfer.in_progress", trigger: "A transfer begins processing." },
              { event: "transfer.completed", trigger: "A transfer finishes successfully." },
              { event: "transfer.failed", trigger: "A transfer fails after all retry attempts." },
              { event: "transfer.cancelled", trigger: "A transfer is cancelled by a user or API call." },
              { event: "endpoint.connectivity_lost", trigger: "A configured endpoint becomes unreachable." },
              { event: "key.expiring_soon", trigger: "An API key will expire within 7 days." },
            ].map((row) => (
              <tr key={row.event} className="border-b border-border/20 hover:bg-accent/20 transition-colors">
                <td className="px-4 py-3"><code className="text-xs font-mono text-primary">{row.event}</code></td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{row.trigger}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubHeading>Webhook payload</SubHeading>
      <Paragraph>
        Each webhook delivery includes a JSON payload with the event type, timestamp, and the relevant resource data.
      </Paragraph>
      <CodeBlock code={`{
  "id": "evt_a1b2c3d4",
  "type": "transfer.completed",
  "created_at": "2025-12-15T09:30:12Z",
  "data": {
    "transfer_id": "txr_8a3b1c2d",
    "file_name": "report_Q4_2025.csv",
    "size_bytes": 2048576,
    "status": "completed",
    "source": "sftp://uploads.acme.com/outbox",
    "destination": "s3://acme-archive/reports/",
    "duration_ms": 12000,
    "checksum_sha256": "a3f2c1...e8d9b4"
  }
}`} lang="json" />

      <SubHeading>Verify webhook signatures</SubHeading>
      <Paragraph>
        Every webhook request includes a <code className="text-xs px-1 py-0.5 rounded bg-muted font-mono text-foreground">X-Nexus-Signature</code> header. Use this header to verify that the request came from Nexus MFT and wasn't tampered with.
      </Paragraph>
      <Paragraph>To verify the signature:</Paragraph>
      <ol className="text-sm text-muted-foreground space-y-2 mb-6 ml-4 list-decimal list-outside">
        <li>Compute an HMAC-SHA256 hash of the raw request body using your webhook secret as the key.</li>
        <li>Compare the computed hash with the value in the <code className="text-xs px-1 py-0.5 rounded bg-muted font-mono text-foreground">X-Nexus-Signature</code> header.</li>
        <li>If the values match, the request is authentic. If they don't match, reject the request.</li>
      </ol>
      <WarningBox title="Security">
        <p>Always verify webhook signatures before you process the payload. This prevents attackers from sending fraudulent webhook events to your endpoint.</p>
      </WarningBox>

      <SubHeading>Retry behavior</SubHeading>
      <Paragraph>
        If your endpoint doesn't respond with a 2xx status code within 10 seconds, the system retries the delivery. The retry schedule uses exponential backoff:
      </Paragraph>
      <ul className="text-sm text-muted-foreground space-y-1 mb-6 ml-4 list-disc list-outside">
        <li>First retry: 1 minute after the initial attempt</li>
        <li>Second retry: 5 minutes after the first retry</li>
        <li>Third retry: 30 minutes after the second retry</li>
      </ul>
      <Paragraph>
        After 3 failed attempts, the event is marked as failed. You can view failed deliveries and manually retry them from the Admin Console under <strong className="text-foreground">Webhooks</strong> &gt; <strong className="text-foreground">Failed Deliveries</strong>.
      </Paragraph>
    </div>
  );
}

// ─── Main component ───

const ApiDocsSample = forwardRef<HTMLDivElement>((_, ref) => {
  const [activePage, setActivePage] = useState<PageId>("reference");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case "reference": return <ApiReferencePage />;
      case "auth": return <AuthPage />;
      case "webhooks": return <WebhooksPage />;
    }
  };

  return (
    <div ref={ref} className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-accent/50 transition-colors lg:hidden"
              aria-label="Toggle navigation"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link to="/documentation-samples" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Samples</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono text-muted-foreground">NEXUS MFT API</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">v1.0</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex">
        {/* Sidebar - desktop */}
        <aside className="hidden lg:block w-56 flex-shrink-0 border-r border-border/40">
          <nav className="sticky top-14 p-4 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-3">Documentation</p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 text-left ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Sidebar - mobile overlay */}
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <motion.nav
              className="absolute left-0 top-14 bottom-0 w-64 bg-background border-r border-border/50 p-4 space-y-1"
              initial={{ x: -264 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-3">Documentation</p>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setActivePage(item.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 text-left ${
                      isActive
                        ? "bg-primary/10 text-primary font-medium border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </motion.nav>
          </motion.div>
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 sm:px-10 py-10 max-w-4xl">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>

          {/* Footer */}
          <div className="text-center py-10 mt-10 border-t border-border/30">
            <p className="text-xs text-muted-foreground">
              This is a sample API documentation created for portfolio demonstration purposes.
            </p>
            <Link to="/documentation-samples" className="text-xs text-primary hover:underline mt-2 inline-block">
              ← Back to all samples
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
});
ApiDocsSample.displayName = "ApiDocsSample";

export default ApiDocsSample;