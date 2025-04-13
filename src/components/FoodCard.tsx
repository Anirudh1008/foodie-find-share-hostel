
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

interface FoodCardProps {
  id: string;
  title: string;
  description: string;
  quantity: string;
  location: string;
  expiresAt: string;
  postedBy: string;
  imageUrl?: string;
  className?: string;
  onClaim: (id: string) => void;
}

const FoodCard = ({
  id,
  title,
  description,
  quantity,
  location,
  expiresAt,
  postedBy,
  imageUrl,
  className,
  onClaim
}: FoodCardProps) => {
  // Calculate time remaining
  const calculateTimeRemaining = () => {
    const now = new Date();
    const expiryTime = new Date(expiresAt);
    const diff = expiryTime.getTime() - now.getTime();
    
    // If expired
    if (diff <= 0) {
      return { expired: true, text: "Expired" };
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return { 
        expired: false, 
        text: `${hours}h ${minutes}m remaining`,
        urgent: hours < 2
      };
    } else {
      return { 
        expired: false, 
        text: `${minutes}m remaining`,
        urgent: true
      };
    }
  };
  
  const timeRemaining = calculateTimeRemaining();
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      {imageUrl && (
        <div className="h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      )}
      <CardHeader className="p-4">
        <CardTitle className="text-lg text-food-green">{title}</CardTitle>
        <CardDescription>{quantity}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin size={16} className="mr-2" />
          {location}
        </div>
        <div className={cn(
          "flex items-center text-sm mb-2",
          timeRemaining.expired ? "text-food-red" : 
          timeRemaining.urgent ? "text-food-orange" : "text-gray-500"
        )}>
          <Clock size={16} className="mr-2" />
          {timeRemaining.text}
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <Utensils size={16} className="mr-2" />
          Posted by {postedBy}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onClaim(id)} 
          className="w-full bg-food-orange hover:bg-food-orange-light"
          disabled={timeRemaining.expired}
        >
          {timeRemaining.expired ? "No Longer Available" : "Claim Food"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FoodCard;
