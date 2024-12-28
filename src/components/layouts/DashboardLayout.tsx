import { NavigationMenu } from "@/components/navigation/NavigationMenu";
import { Navigation } from "@/components/Navigation";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex flex-col md:flex-row pt-20">
        <aside className="hidden md:block w-64 shrink-0">
          <NavigationMenu className="fixed h-[calc(100vh-4rem)] w-64" />
        </aside>
        <main className="flex-1 px-4 md:px-8 py-8 max-w-full md:ml-64">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};