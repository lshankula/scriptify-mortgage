interface ContentItemProps {
  title: string;
  type: string;
  time: string;
}

const ContentItem = ({ title, type, time }: ContentItemProps) => (
  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
    <div>
      <h4 className="font-medium text-sm md:text-base">{title}</h4>
      <p className="text-xs md:text-sm text-gray-600">{type} • {time}</p>
    </div>
    <button className="text-primary hover:text-primary-dark text-sm">View</button>
  </div>
);

export const RecentContent = () => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg border">
      <h3 className="text-base md:text-lg font-bold mb-4">Recent Content</h3>
      <div className="space-y-3">
        <ContentItem 
          title="First-Time Homebuyer Guide"
          type="Blog Post"
          time="2 hours ago"
        />
        <ContentItem 
          title="Market Update Video Script"
          type="Video"
          time="Yesterday"
        />
        <ContentItem 
          title="Rate Change Announcement"
          type="Social Post"
          time="2 days ago"
        />
      </div>
    </div>
  );
};