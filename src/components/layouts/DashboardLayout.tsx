import { NavigationMenu } from "@/components/navigation/NavigationMenu";
import { Navigation } from "@/components/Navigation";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex">
        <aside className="hidden md:block w-64 fixed top-16 bottom-0">
          <NavigationMenu className="h-[calc(100vh-4rem)] w-64" />
        </aside>
        <main className="w-full md:pl-64 pt-16">
          <div className="p-4">{children}</div>
        </main>
      </div>
    </div>
  );
};