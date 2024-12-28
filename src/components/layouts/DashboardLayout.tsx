import { NavigationMenu } from "@/components/navigation/NavigationMenu";
import { Navigation } from "@/components/Navigation";
import { cn } from "@/lib/utils";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex pt-16">
        <aside className="hidden md:block w-64 shrink-0">
          <NavigationMenu className="fixed h-[calc(100vh-4rem)] w-64" />
        </aside>
        <main className="flex-1 container mx-auto px-4 py-8 md:ml-64">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};