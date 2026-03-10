import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Menu, X, Search, ChevronDown, ChevronRight, BookOpen, AlertTriangle, Server, Settings, Shield, CheckCircle, XCircle, Copy, Check } from "lucide-react";

/* ─── Microsoft Writing Style Guide compliance ───
  - Second person ("you")
  - Active voice, present tense
  - Task-based headings
  - Short, direct sentences
  - "Select" not "click"
─────────────────────────────────────────────────── */

type PageId = "connectivity" | "performance" | "security";

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: "connectivity", label: "Connection Issues", icon: Server },
  { id: "performance", label: "Transfer Performance", icon: Settings },
  { id: "security", label: "Authentication Errors", icon: Shield },
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

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="relative rounded-lg bg-[hsl(220,20%,8%)] p-4 overflow-x-auto my-4">
      <CopyButton text={code} />
      <pre className="text-xs font-mono text-emerald-300/90 leading-relaxed whitespace-pre-wrap">{code}</pre>
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

interface TroubleshootItem {
  symptom: string;
  cause: string;
  resolution: string[];
  code?: string;
}

function TroubleshootCard({ item, index }: { item: TroubleshootItem; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0);
  return (
    <motion.div
      className="border border-border/60 rounded-xl overflow-hidden bg-card/50"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-accent/30 transition-colors">
        {isOpen ? <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
        <span className="text-sm font-medium text-foreground">{item.symptom}</span>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 border-t border-border/40 space-y-4">
          <div className="pt-4">
            <div className="flex items-start gap-2 mb-3">
              <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Cause</p>
                <p className="text-sm text-muted-foreground">{item.cause}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Resolution</p>
                <ol className="text-sm text-muted-foreground space-y-1.5 list-decimal list-outside ml-4">
                  {item.resolution.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
            {item.code && <CodeBlock code={item.code} />}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── Page: Connection Issues ───

const connectivityIssues: TroubleshootItem[] = [
  {
    symptom: "Transfer fails with \"Connection refused\" error",
    cause: "The destination server is unreachable. The server might be down, or a firewall rule is blocking the connection on the required port.",
    resolution: [
      "Verify that the destination server is running and accepting connections.",
      "Check that your firewall allows outbound traffic on the required port (SFTP: 22, FTPS: 990, HTTPS: 443).",
      "Test connectivity from the Nexus MFT server using the diagnostic tool.",
      "If the destination uses IP allowlisting, confirm that the Nexus MFT egress IPs are on the allowlist.",
    ],
    code: `# Test connectivity from the command line
nc -zv destination-server.com 22

# Expected output if successful:
# Connection to destination-server.com 22 port [tcp/ssh] succeeded!`
  },
  {
    symptom: "Transfer hangs at \"Connecting...\" and eventually times out",
    cause: "A network route between the Nexus MFT server and the destination is dropping packets. This commonly happens when a firewall silently drops traffic instead of rejecting it.",
    resolution: [
      "Check the network route between the source and destination using traceroute.",
      "Verify that no intermediate firewalls or proxy servers are silently dropping connections.",
      "Increase the connection timeout in the endpoint configuration if the destination has high latency.",
      "Contact your network administrator to verify that the route is stable.",
    ],
  },
  {
    symptom: "SFTP connection fails with \"Host key verification failed\"",
    cause: "The destination server's SSH host key doesn't match the key stored in the Nexus MFT known_hosts file. This can happen when the destination server is rebuilt or its SSH keys are rotated.",
    resolution: [
      "Go to Settings > Endpoints in the Admin Console.",
      "Select the affected endpoint and select Edit.",
      "Under Host Key Verification, select Update Host Key.",
      "Verify that the new host key fingerprint matches the expected value from your server administrator.",
      "Save the updated endpoint configuration and retry the transfer.",
    ],
  },
];

function ConnectivityPage() {
  return (
    <div>
      <SectionHeading>Troubleshoot connection issues</SectionHeading>
      <Paragraph>
        Use this guide to diagnose and resolve connection failures between Nexus MFT and your source or destination endpoints.
      </Paragraph>
      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 mb-8">
        <p className="text-sm font-semibold text-foreground mb-1">Before you start</p>
        <p className="text-sm text-muted-foreground">
          Make sure you have access to the Admin Console and the transfer error details. You can find error details by going to <strong className="text-foreground">Transfers</strong> and selecting the failed transfer.
        </p>
      </div>
      <div className="space-y-3">
        {connectivityIssues.map((item, i) => (
          <TroubleshootCard key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

// ─── Page: Transfer Performance ───

const performanceIssues: TroubleshootItem[] = [
  {
    symptom: "Transfers complete but are significantly slower than expected",
    cause: "The transfer speed is limited by the slowest link in the chain — this could be network bandwidth, server disk I/O, or the Nexus MFT transfer concurrency settings.",
    resolution: [
      "Check the transfer details to view the average speed (speed_bps field in the API response).",
      "Compare the transfer speed against your network bandwidth. If transfer speed is below 50% of available bandwidth, the bottleneck is likely on the endpoint side.",
      "Go to Settings > Performance and increase the Max Concurrent Streams value (default: 4, maximum: 16).",
      "For large files (over 1 GB), enable chunked transfer mode to improve throughput.",
    ],
  },
  {
    symptom: "Transfers fail intermittently with \"Timeout\" errors",
    cause: "The transfer takes longer than the configured timeout period. This commonly happens with large files on slow connections or when the destination server is under heavy load.",
    resolution: [
      "Go to Settings > Endpoints and select the affected endpoint.",
      "Increase the Transfer Timeout value. The default is 300 seconds (5 minutes).",
      "For unreliable connections, enable Auto-Retry with a maximum of 3 attempts.",
      "If the issue persists, enable the checkpoint/restart feature so that interrupted transfers resume from where they stopped instead of starting over.",
    ],
    code: `# Check transfer timeout configuration via API
curl -X GET "https://api.nexusmft.io/v1/endpoints/ep_abc123" \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Look for these fields in the response:
# "transfer_timeout_seconds": 300
# "auto_retry_enabled": false
# "max_retry_count": 0`,
  },
  {
    symptom: "File integrity check fails after transfer completes",
    cause: "The file was corrupted during transfer. This can happen due to an unstable network connection or a misconfigured proxy that modifies the data stream.",
    resolution: [
      "Verify that no proxy servers between Nexus MFT and the destination modify the data stream.",
      "Enable end-to-end checksum verification in the endpoint configuration. This computes a SHA-256 hash before and after transfer.",
      "If you use FTPS, make sure the data channel uses binary mode (not ASCII mode).",
      "Retry the transfer. If the checksum fails again, contact support with the transfer ID.",
    ],
  },
];

function PerformancePage() {
  return (
    <div>
      <SectionHeading>Troubleshoot transfer performance</SectionHeading>
      <Paragraph>
        Use this guide to diagnose and resolve issues related to transfer speed, timeouts, and file integrity.
      </Paragraph>

      <SubHeading>Performance benchmarks</SubHeading>
      <Paragraph>
        The following table shows expected transfer speeds under normal conditions. If your speeds are significantly below these values, use the troubleshooting steps in this guide.
      </Paragraph>
      <div className="overflow-x-auto rounded-xl border border-border/50 mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/30 border-b border-border/40">
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">File size</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Expected duration (100 Mbps)</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Expected duration (1 Gbps)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { size: "10 MB", slow: "< 2 seconds", fast: "< 1 second" },
              { size: "100 MB", slow: "~10 seconds", fast: "~1 second" },
              { size: "1 GB", slow: "~90 seconds", fast: "~10 seconds" },
              { size: "10 GB", slow: "~15 minutes", fast: "~90 seconds" },
            ].map((row) => (
              <tr key={row.size} className="border-b border-border/20 hover:bg-accent/20 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-foreground">{row.size}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{row.slow}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{row.fast}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubHeading>Common issues</SubHeading>
      <div className="space-y-3">
        {performanceIssues.map((item, i) => (
          <TroubleshootCard key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

// ─── Page: Authentication Errors ───

const authIssues: TroubleshootItem[] = [
  {
    symptom: "API returns 401 Unauthorized on every request",
    cause: "Your API key is missing from the request, incorrectly formatted, or has expired.",
    resolution: [
      "Verify that the Authorization header is included in your request and follows the format: Bearer YOUR_API_KEY.",
      "Check that there are no extra spaces or line breaks in the API key.",
      "Go to Settings > API Keys in the Admin Console to verify that the key hasn't expired.",
      "If the key has expired, generate a new key and update your integration.",
    ],
    code: `# Correct format
curl -H "Authorization: Bearer sk_live_abc123def456" ...

# Common mistakes:
# ✗ Missing "Bearer" prefix
# ✗ Extra space: "Bearer  sk_live_abc123def456"
# ✗ Using the key ID instead of the key value`,
  },
  {
    symptom: "API returns 403 Forbidden for specific operations",
    cause: "Your API key doesn't have the required permission for the operation you're attempting.",
    resolution: [
      "Check which permission the operation requires by consulting the API Reference.",
      "Go to Settings > API Keys and select the key you're using.",
      "Verify that the key has the required permission scope.",
      "If the permission is missing, you need to generate a new key with the correct permissions. Existing key permissions can't be modified after creation.",
    ],
  },
  {
    symptom: "SFTP login fails with \"Authentication failed\" error",
    cause: "The credentials stored in the endpoint configuration are incorrect or the user account on the destination server has been disabled or locked.",
    resolution: [
      "Go to Settings > Endpoints and select the affected endpoint.",
      "Verify that the username and password (or SSH key) are correct.",
      "Test the credentials manually by connecting to the SFTP server from a terminal.",
      "If you use key-based authentication, verify that the public key is in the authorized_keys file on the destination server.",
      "Check with the server administrator whether the account is active and not locked.",
    ],
    code: `# Test SFTP credentials manually
sftp -i /path/to/private_key user@destination-server.com

# If using password authentication:
sftp user@destination-server.com`,
  },
];

function AuthErrorsPage() {
  return (
    <div>
      <SectionHeading>Troubleshoot authentication errors</SectionHeading>
      <Paragraph>
        Use this guide to resolve authentication and authorization errors when connecting to the Nexus MFT API or configuring endpoint credentials.
      </Paragraph>

      <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 mb-8">
        <p className="text-sm font-semibold text-amber-400 mb-1">⚠ Security reminder</p>
        <p className="text-sm text-muted-foreground">
          Never share API keys or credentials in support tickets, chat messages, or emails. If you suspect that a key has been compromised, revoke it immediately from the Admin Console.
        </p>
      </div>

      <div className="space-y-3">
        {authIssues.map((item, i) => (
          <TroubleshootCard key={i} item={item} index={i} />
        ))}
      </div>

      <SubHeading>Still need help?</SubHeading>
      <Paragraph>
        If you've followed the steps above and the issue persists, collect the following information before you contact support:
      </Paragraph>
      <ul className="text-sm text-muted-foreground space-y-1.5 mb-6 ml-4 list-disc list-outside">
        <li>The full error message (redact any credentials or API keys)</li>
        <li>The transfer ID or request ID from the API response</li>
        <li>The endpoint configuration name</li>
        <li>The timestamp of the failed attempt (in UTC)</li>
      </ul>
    </div>
  );
}

// ─── Main component ───

const KnowledgeBaseSample = forwardRef<HTMLDivElement>((_, ref) => {
  const [activePage, setActivePage] = useState<PageId>("connectivity");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const renderPage = () => {
    switch (activePage) {
      case "connectivity": return <ConnectivityPage />;
      case "performance": return <PerformancePage />;
      case "security": return <AuthErrorsPage />;
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
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono text-muted-foreground">NEXUS MFT KNOWLEDGE BASE</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex">
        {/* Sidebar - desktop */}
        <aside className="hidden lg:block w-56 flex-shrink-0 border-r border-border/40">
          <div className="sticky top-14 p-4">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-border/60 bg-muted/20 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
              />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-3">Troubleshooting</p>
            <nav className="space-y-1">
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
          </div>
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
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-3">Troubleshooting</p>
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
              This is a sample knowledge base created for portfolio demonstration purposes.
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
KnowledgeBaseSample.displayName = "KnowledgeBaseSample";

export default KnowledgeBaseSample;