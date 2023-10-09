import { ReactNode } from 'react';

export default function ConditionalRendering({
  condition,
  children,
}: {
  condition: boolean;
  children: ReactNode;
}) {
  if (condition) return <>{children}</>;
  else {
    return <></>;
  }
}
