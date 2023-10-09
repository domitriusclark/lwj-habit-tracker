import CursorsProvider from "./cursors-provider";
import Cursors from "./cursors";

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CursorsProvider>
      <Cursors />
      {children}
    </CursorsProvider>
  );
}
