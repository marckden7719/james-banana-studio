import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error("[RootError]", error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. You can try refreshing or head back home.
        </p>
        <p className="mt-2 text-xs text-muted-foreground/60 font-mono break-all">
          {error?.message}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "JAMES BANANA" },
      { name: "description", content: "AI Meme Video Generator on Monad" },
      { name: "author", content: "James Banana" },
      { property: "og:site_name", content: "JAMES BANANA" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@jamescatbanana" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/logobanana.jpg" },
      { rel: "apple-touch-icon", href: "/logobanana.jpg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [isClient, setIsClient] = useState(false);
  const [WagmiProvider, setWagmiProvider] = useState<any>(null);
  const [RainbowKitProvider, setRainbowKitProvider] = useState<any>(null);
  const [wagmiConfig, setWagmiConfig] = useState<any>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);

    // Dynamic import wagmi only on client
    import("wagmi")
      .then((wagmiMod) => {
        return import("@rainbow-me/rainbowkit").then((rkMod) => {
          return import("../lib/wagmi-config").then((configMod) => {
            setWagmiProvider(() => wagmiMod.WagmiProvider);
            setRainbowKitProvider(() => rkMod.RainbowKitProvider);
            setWagmiConfig(configMod.wagmiConfig);
          });
        });
      })
      .catch((err) => {
        console.error("[WagmiLoadError]", err);
        setLoadError(err?.message || "Failed to load wallet provider");
      });
  }, []);

  // SSR / first render — no wagmi
  if (!isClient || !WagmiProvider || !RainbowKitProvider || !wagmiConfig) {
    if (loadError) {
      return (
        <QueryClientProvider client={queryClient}>
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-sm text-orange-pop">Wallet provider error: {loadError}</p>
          </div>
        </QueryClientProvider>
      );
    }
    return (
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <RainbowKitProvider modalSize="compact">
          <Outlet />
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
