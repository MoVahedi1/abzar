'use client';

import { useState } from 'react';
import { Star, Heart, Share2, Truck, Shield, RefreshCw, Minus, Plus, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const product = {
  id: 1,
  name: "Professional Power Drill",
  nameFa: "دریل برقی حرفه‌ای",
  nameAr: "مثقاب كهربائي احترافي",
  price: 299.99,
  originalPrice: 399.99,
  rating: 4.5,
  reviews: 234,
  images: [
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
    "/api/placeholder/600/600"
  ],
  category: "Power Tools",
  brand: "Vahedi Pro",
  sku: "VP-DRILL-001",
  inStock: true,
  description: "Experience unparalleled performance with our Professional Power Drill. Engineered for both professional contractors and serious DIY enthusiasts, this drill delivers exceptional power and precision in a compact, ergonomic design.",
  features: [
    "20V MAX lithium-ion battery for extended runtime",
    "1/2-inch chuck for secure bit retention",
    "LED work light for improved visibility in dark spaces",
    "Ergonomic grip for reduced fatigue",
    "Variable speed trigger for precise control",
    "Compact and lightweight design (3.5 lbs)",
    "Built-in belt hook for convenience",
    "2-year manufacturer warranty"
  ],
  specifications: {
    "Power Source": "20V Lithium-Ion Battery",
    "Chuck Size": "1/2 inch",
    "No-Load Speed": "0-1,500 RPM",
    "Max Torque": "450 in-lbs",
    "Weight": "3.5 lbs",
    "Length": "7.5 inches",
    "Warranty": "2 Years",
    "Included": "Drill, 2 Batteries, Charger, Carrying Case"
  },
  reviews: [
    {
      id: 1,
      author: "John Smith",
      rating: 5,
      date: "2024-12-15",
      title: "Excellent Power Drill",
      content: "This drill exceeded my expectations. The battery life is incredible, and it has plenty of power for any job I've thrown at it. Highly recommend!",
      verified: true
    },
    {
      id: 2,
      author: "Sarah Johnson",
      rating: 4,
      date: "2024-12-10",
      title: "Great for Home Projects",
      content: "Perfect for my home renovation projects. Lightweight but powerful. The LED light is a nice touch for working in tight spaces.",
      verified: true
    },
    {
      id: 3,
      author: "Mike Wilson",
      rating: 5,
      date: "2024-12-05",
      title: "Professional Grade Tool",
      content: "As a contractor, I need reliable tools. This drill has been through heavy use and still performs like new. Worth every penny.",
      verified: true
    }
  ]
};

const relatedProducts = [
  {
    id: 2,
    name: "Industrial Hammer Set",
    price: 89.99,
    rating: 4.8,
    image: "/api/placeholder/200/200"
  },
  {
    id: 3,
    name: "Heavy-Duty Wrench Kit",
    price: 159.99,
    rating: 4.6,
    image: "/api/placeholder/200/200"
  },
  {
    id: 4,
    name: "Circular Saw Pro",
    price: 449.99,
    rating: 4.7,
    image: "/api/placeholder/200/200"
  },
  {
    id: 5,
    name: "Socket Set Complete",
    price: 129.99,
    rating: 4.4,
    image: "/api/placeholder/200/200"
  }
];

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) => {
    const sizeClass = size === "lg" ? "w-6 h-6" : "w-4 h-4";
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${sizeClass} ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-sm text-muted-foreground ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <a href="#" className="hover:text-foreground">Home</a>
          <ChevronRight className="w-4 h-4" />
          <a href="#" className="hover:text-foreground">Power Tools</a>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Professional Power Drill</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-8xl opacity-50">🔧</div>
              </div>
            </div>
            <Carousel className="w-full">
              <CarouselContent className="-ml-2">
                {product.images.map((_, index) => (
                  <CarouselItem key={index} className="pl-2 basis-1/4">
                    <div
                      className={`aspect-square bg-gray-100 rounded-lg cursor-pointer border-2 transition-colors ${
                        selectedImage === index ? 'border-tools-primary' : 'border-transparent'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-4xl opacity-50">🔧</div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground mb-4">Brand: {product.brand} | SKU: {product.sku}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <StarRating rating={product.rating} size="lg" />
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-bold text-tools-primary">${product.price}</div>
                <div className="text-xl text-muted-foreground line-through">${product.originalPrice}</div>
                <Badge className="bg-green-100 text-green-800">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </Badge>
              </div>

              <div className="flex items-center gap-2 mb-6">
                {product.inStock ? (
                  <>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">In Stock - Ready to Ship</span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>

              <p className="text-muted-foreground mb-6">{product.description}</p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    className="rounded-none border-r"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="px-4 py-2 min-w-[60px] text-center">{quantity}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    className="rounded-none border-l"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="flex-1 tools-accent-gradient text-white ripple"
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  Buy Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={isWishlisted ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Truck className="w-5 h-5 text-tools-primary" />
                <div>
                  <div className="font-medium text-sm">Free Shipping</div>
                  <div className="text-xs text-muted-foreground">On orders over $100</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Shield className="w-5 h-5 text-tools-primary" />
                <div>
                  <div className="font-medium text-sm">2 Year Warranty</div>
                  <div className="text-xs text-muted-foreground">Full coverage</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <RefreshCw className="w-5 h-5 text-tools-primary" />
                <div>
                  <div className="font-medium text-sm">Easy Returns</div>
                  <div className="text-xs text-muted-foreground">30-day policy</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                  <div className="prose max-w-none text-muted-foreground">
                    <p className="mb-4">{product.description}</p>
                    <p className="mb-4">
                      Designed with the professional in mind, this power drill combines cutting-edge technology 
                      with user-friendly features. The brushless motor ensures longer runtime and increased 
                      durability, while the ergonomic design reduces user fatigue during extended use.
                    </p>
                    <p>
                      Whether you're drilling through wood, metal, or masonry, this versatile tool delivers 
                      consistent performance. The variable speed trigger allows for precise control, making it 
                      perfect for both delicate tasks and heavy-duty applications.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Customer Reviews</h3>
                    <Button>Write a Review</Button>
                  </div>
                  
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <StarRating rating={review.rating} />
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  <Check className="w-3 h-3 mr-1" />
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <h4 className="font-semibold">{review.author}</h4>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <h5 className="font-medium mb-2">{review.title}</h5>
                        <p className="text-muted-foreground">{review.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="hover-lift cursor-pointer">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-4xl opacity-50">🔧</div>
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <StarRating rating={relatedProduct.rating} />
                  </div>
                  <div className="text-lg font-bold text-tools-primary">${relatedProduct.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}