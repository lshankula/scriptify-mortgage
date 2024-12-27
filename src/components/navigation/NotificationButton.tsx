import { Bell } from 'lucide-react';

interface NotificationButtonProps {
  count: number;
}

export const NotificationButton = ({ count }: NotificationButtonProps) => {
  return (
    <button className="relative p-2 hover:bg-accent rounded-lg">
      <Bell className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute top-1 right-1 bg-destructive text-destructive-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
};