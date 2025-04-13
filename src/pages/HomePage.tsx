
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import FoodCard from "@/components/FoodCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

// Mock data for initial display
const mockFoodItems = [
  {
    id: "1",
    title: "Vegetable Biryani",
    description: "Freshly cooked vegetable biryani from dinner. Still warm and delicious!",
    quantity: "3 servings",
    location: "Block A, Room 102",
    expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(), // 3 hours from now
    postedBy: "Rahul S.",
    imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "2",
    title: "Pizza Slices",
    description: "4 slices of cheese pizza. Ordered too much and can't finish it all.",
    quantity: "4 slices",
    location: "Block C, Common Room",
    expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(), // 1 hour from now
    postedBy: "Anjali P.",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "3",
    title: "Chocolate Cake",
    description: "Half of a birthday cake. Too much for me to finish alone!",
    quantity: "Half cake (4-5 slices)",
    location: "Girls Hostel, Room 214",
    expiresAt: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(), // 5 hours from now
    postedBy: "Priya M.",
    imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "4",
    title: "Mess Food Leftovers",
    description: "Extra portions from tonight's mess food. Includes dal, rice, and curry.",
    quantity: "2 full meals",
    location: "Main Mess Kitchen",
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    postedBy: "Mess Staff",
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356c36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D"
  },
];

const HomePage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [foodItems, setFoodItems] = useState(mockFoodItems);
  
  const handleClaim = (id: string) => {
    // In a real app, this would make an API call to claim the food
    const claimedItem = foodItems.find(item => item.id === id);
    
    if (claimedItem) {
      toast({
        title: "Food Claimed!",
        description: `You've successfully claimed ${claimedItem.title}. Head to ${claimedItem.location} within 3 hours!`,
        duration: 5000,
      });
    }
    
    // We don't remove the item now, as we show "Claimed by you" instead
    // The state change happens in the FoodCard component
  };
  
  const filteredItems = foodItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-food-green mb-2">Available Food</h1>
        <p className="text-gray-600">Find and claim leftover food from your hostel community</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search for food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={16} />
          Filter
        </Button>
      </div>
      
      {filteredItems.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium text-gray-600">No food items available</h3>
          <p className="text-gray-500 mt-2">Check back later or share your own food!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <FoodCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              quantity={item.quantity}
              location={item.location}
              expiresAt={item.expiresAt}
              postedBy={item.postedBy}
              imageUrl={item.imageUrl}
              onClaim={handleClaim}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
