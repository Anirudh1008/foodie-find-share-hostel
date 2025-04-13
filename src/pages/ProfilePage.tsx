
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import FoodCard from "@/components/FoodCard";

// Mock data
const mockPostedFood = [
  {
    id: "101",
    title: "Pasta Leftovers",
    description: "Half a pot of pasta with garlic bread. Made too much for dinner.",
    quantity: "2-3 servings",
    location: "Block B, Room 105",
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    postedBy: "You",
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFzdGF8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "102",
    title: "Cookies",
    description: "Homemade chocolate chip cookies. Too many for just me!",
    quantity: "12 cookies",
    location: "Block B, Room 105",
    expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString(), // 20 hours from now
    postedBy: "You",
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29va2llc3xlbnwwfHwwfHx8MA%3D%3D"
  }
];

const mockClaimedFood = [
  {
    id: "201",
    title: "Vegetable Sandwich",
    description: "Fresh vegetable sandwich made this morning.",
    quantity: "1 sandwich",
    location: "Block D, Room 304",
    expiresAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago (expired)
    postedBy: "Deepak T.",
    imageUrl: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlJTIwc2FuZHdpY2h8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "202",
    title: "Fruit Salad",
    description: "Mixed fruit salad with apple, orange, and grapes.",
    quantity: "1 bowl",
    location: "Block A, Common Room",
    expiresAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago (expired)
    postedBy: "Meera K.",
    imageUrl: "https://images.unsplash.com/photo-1564093497595-593b96d80180?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJ1aXQlMjBzYWxhZHxlbnwwfHwwfHx8MA%3D%3D"
  }
];

const ProfilePage = () => {
  const { toast } = useToast();
  const [postedFood, setPostedFood] = useState(mockPostedFood);
  const [claimedFood, setClaimedFood] = useState(mockClaimedFood);
  
  const handleDeletePost = (id: string) => {
    setPostedFood(postedFood.filter(item => item.id !== id));
    toast({
      title: "Food post deleted",
      description: "Your food post has been removed successfully."
    });
  };
  
  const handleClaim = (id: string) => {
    // This is for demonstration only - normally you wouldn't claim your own food
    toast({
      title: "Action not allowed",
      description: "You cannot claim your own food posts.",
      variant: "destructive"
    });
  };
  
  const userProfile = {
    name: "Arjun Sharma",
    email: "arjun.sharma@example.com",
    hostelBlock: "Block B",
    roomNumber: "105",
    joinedDate: "February 2024"
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="h-24 w-24 rounded-full bg-food-green-light text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-semibold">{userProfile.name}</h3>
                  <p className="text-gray-500">Student</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Email</h4>
                    <p>{userProfile.email}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Hostel & Room</h4>
                    <p>{userProfile.hostelBlock}, Room {userProfile.roomNumber}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Member Since</h4>
                    <p>{userProfile.joinedDate}</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Link to="/profile/edit">
                    <Button variant="outline" className="w-full">Edit Profile</Button>
                  </Link>
                  <Link to="/">
                    <Button variant="outline" className="w-full mt-2 text-food-red hover:text-red-600">
                      Logout
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:w-2/3">
            <Tabs defaultValue="posted">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="posted">Food You've Shared</TabsTrigger>
                <TabsTrigger value="claimed">Food You've Claimed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="posted" className="pt-6">
                {postedFood.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-600">You haven't shared any food yet</h3>
                    <p className="text-gray-500 mt-2 mb-4">Start sharing your leftovers with the community</p>
                    <Link to="/post">
                      <Button className="bg-food-green hover:bg-food-green-light">
                        Share Food Now
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {postedFood.map(item => (
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
                        onClaim={() => handleDeletePost(item.id)}
                        className="h-full"
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="claimed" className="pt-6">
                {claimedFood.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-600">You haven't claimed any food yet</h3>
                    <p className="text-gray-500 mt-2 mb-4">Browse available food items and claim some</p>
                    <Link to="/">
                      <Button className="bg-food-green hover:bg-food-green-light">
                        Find Food
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {claimedFood.map(item => (
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
                        className="h-full"
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
