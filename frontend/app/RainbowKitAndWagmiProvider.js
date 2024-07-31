"use client";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  hardhat,
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  polygonAmoy,
} from "wagmi/chains";
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    hardhat,
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    polygonAmoy,
  ],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const RainbowkitAndWagmiProvider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#7b3fe4",
            accentColorForeground: "white",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default RainbowkitAndWagmiProvider;
