
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Bell, AlertCircle, MessageSquare, Check, X } from "lucide-react";

interface Notification {
  id: string;
  type: "food_posted" | "food_claimed" | "food_expired" | "system" | "feedback";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// Mock notifications
const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "food_posted",
    title: "New Food Available",
    message: "Pizza slices are now available in Block C Common Room",
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25 minutes ago
    read: false,
    actionUrl: "/"
  },
  {
    id: "2",
    type: "food_claimed",
    title: "Your Food Was Claimed",
    message: "Vegetable Biryani has been claimed by Rahul S.",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    read: false,
    actionUrl: "/profile"
  },
  {
    id: "3",
    type: "food_expired",
    title: "Food Post Expired",
    message: "Your Pasta Leftovers post has expired and is no longer visible",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    read: true
  },
  {
    id: "4",
    type: "system",
    title: "Welcome to FoodShare",
    message: "Thank you for joining the hostel food sharing community!",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    read: true
  },
  {
    id: "5",
    type: "feedback",
    title: "Feedback Request",
    message: "How was your experience with claiming the fruit salad?",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    read: true,
    actionUrl: "/feedback"
  }
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };
  
  const getIconForType = (type: Notification["type"]) => {
    switch (type) {
      case "food_posted":
        return <Bell className="text-food-green" />;
      case "food_claimed":
        return <Check className="text-food-blue" />;
      case "food_expired":
        return <Clock className="text-food-red" />;
      case "system":
        return <AlertCircle className="text-food-orange" />;
      case "feedback":
        return <MessageSquare className="text-purple-500" />;
    }
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-food-green">Notifications</h1>
            <p className="text-gray-600">Stay updated with food sharing activities</p>
          </div>
          
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              onClick={markAllAsRead}
              className="text-sm"
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell size={48} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-600">No notifications</h3>
              <p className="text-gray-500 mt-2 text-center">
                You don't have any notifications at the moment.
                <br />
                Check back later for updates on food sharing activities.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map(notification => (
              <Card 
                key={notification.id} 
                className={notification.read ? "bg-white" : "bg-food-green-light bg-opacity-10"}
              >
                <CardContent className="p-4 flex gap-4">
                  <div className="mt-1">
                    {getIconForType(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{notification.title}</h3>
                        <p className="text-gray-600 mt-1">{notification.message}</p>
                      </div>
                      
                      <div className="flex items-center">
                        {!notification.read && (
                          <Badge variant="default" className="bg-food-green mr-2">
                            New
                          </Badge>
                        )}
                        
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-600"
                          aria-label="Delete notification"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-gray-400">
                        {formatTime(notification.timestamp)}
                      </p>
                      
                      <div className="flex gap-2">
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-xs"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                        
                        {notification.actionUrl && (
                          <a href={notification.actionUrl}>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-7 text-xs"
                            >
                              View
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
