import { NavigationMenu } from "../navigation/NavigationMenu";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen pt-16">
      <NavigationMenu />
      <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
        {children}
      </main>
    </div>
  );
};