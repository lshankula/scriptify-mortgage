import { TrendingUp, Users, Target } from 'lucide-react';

const StatCard = ({ 
  icon, 
  title, 
  value, 
  subtitle, 
  color 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  subtitle: string; 
  color: string; 
}) => (
  <div className="bg-white p-4 md:p-6 rounded-lg border">
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 ${color} rounded-lg`}>
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-sm md:text-base">{title}</h3>
        <p className="text-xl md:text-2xl font-bold">{value}</p>
      </div>
    </div>
    <div className="text-sm">{subtitle}</div>
  </div>
);

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
      <StatCard 
        icon={<TrendingUp className="w-5 h-5 text-green-600" />}
        title="Content Created"
        value="24"
        subtitle="↑ 12% from last week"
        color="bg-green-100"
      />
      <StatCard 
        icon={<Users className="w-5 h-5 text-primary" />}
        title="Active Co-Marketing"
        value="5"
        subtitle="3 pending invites"
        color="bg-primary/10"
      />
      <StatCard 
        icon={<Target className="w-5 h-5 text-accent" />}
        title="Weekly Goals"
        value="7/10"
        subtitle="3 tasks remaining"
        color="bg-accent/10"
      />
    </div>
  );
};