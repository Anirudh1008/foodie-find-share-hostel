
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, MapPin } from "lucide-react";

const PostFoodPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    location: "",
    expiryHours: "2",
    expiryMinutes: "0",
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description || !formData.quantity || !formData.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would make an API call to post the food
    toast({
      title: "Food Posted!",
      description: "Your food has been posted successfully. Others can now see and claim it.",
    });
    
    // Navigate back to home page
    navigate("/");
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-food-green mb-2">Share Your Food</h1>
        <p className="text-gray-600 mb-8">Help reduce food waste by sharing your leftovers with others</p>
        
        <Card>
          <CardHeader>
            <CardTitle>Food Details</CardTitle>
            <CardDescription>Describe the food you want to share</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Food Name<span className="text-food-red">*</span>
                  </label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Ex: Pizza, Biryani, Sandwich, etc."
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description<span className="text-food-red">*</span>
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the food, its condition, why you're sharing it, etc."
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="quantity" className="text-sm font-medium">
                    Quantity<span className="text-food-red">*</span>
                  </label>
                  <Input
                    id="quantity"
                    name="quantity"
                    placeholder="Ex: 2 slices, 3 servings, half cake, etc."
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Pickup Location<span className="text-food-red">*</span>
                  </label>
                  <div className="flex items-center">
                    <MapPin className="mr-2 text-gray-400" size={20} />
                    <Input
                      id="location"
                      name="location"
                      placeholder="Ex: Block A, Room 102, Main Mess, etc."
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <Clock className="mr-2 text-gray-400" size={20} />
                    Available Until<span className="text-food-red">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <Select 
                      value={formData.expiryHours}
                      onValueChange={(value) => handleSelectChange("expiryHours", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Hours" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i} hour{i !== 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select 
                      value={formData.expiryMinutes}
                      onValueChange={(value) => handleSelectChange("expiryMinutes", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Minutes" />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 15, 30, 45].map((min) => (
                          <SelectItem key={min} value={min.toString()}>
                            {min} min{min !== 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-gray-500">
                    Specify how long the food will be available for pickup
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="imageUrl" className="text-sm font-medium">
                    Image URL (Optional)
                  </label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="https://example.com/your-food-image.jpg"
                    value={formData.imageUrl}
                    onChange={handleChange}
                  />
                  <p className="text-sm text-gray-500">
                    Adding an image helps others know what the food looks like
                  </p>
                </div>
              </div>
              
              <CardFooter className="flex justify-end space-x-4 px-0 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-food-green hover:bg-food-green-light"
                >
                  Post Food
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostFoodPage;
