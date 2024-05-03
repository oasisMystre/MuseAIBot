import { isMobile } from "react-device-detect";
import {
  TelegramWebAppProvider,
  useTelegramWebApp,
} from "@telegram-web-app/react";
import { useEffect } from "react";

function TelegramWrapper({ children }: React.PropsWithChildren) {
  const Telegram = useTelegramWebApp();

  useEffect(() => {
    if (!Telegram.WebApp.isExpanded) Telegram.WebApp.expand();
  }, []);

  return children;
}

export default function TelegramProvider({
  children,
}: React.PropsWithChildren) {
  return isMobile ? (
    <TelegramWebAppProvider>
      <TelegramWrapper>{children}</TelegramWrapper>
    </TelegramWebAppProvider>
  ) : (
    children
  );
}
