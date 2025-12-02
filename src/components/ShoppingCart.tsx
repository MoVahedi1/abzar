'use client';

import { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Shield, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

const cartItems = [
  {
    id: 1,
    name: "Professional Power Drill",
    price: 299.99,
    originalPrice: 399.99,
    quantity: 1,
    image: "/api/placeholder/100/100",
    category: "Power Tools"
  },
  {
    id: 2,
    name: "Industrial Hammer Set",
    price: 89.99,
    originalPrice: 119.99,
    quantity: 2,
    image: "/api/placeholder/100/100",
    category: "Hand Tools"
  },
  {
    id: 3,
    name: "Heavy-Duty Wrench Kit",
    price: 159.99,
    originalPrice: 199.99,
    quantity: 1,
    image: "/api/placeholder/100/100",
    category: "Hand Tools"
  }
];

const promoCodes = [
  "SAVE10 - 10% off orders over $200",
  "FREESHIP - Free shipping on orders over $100",
  "TOOLS15 - 15% off power tools"
];

export default function ShoppingCart() {
  const [items, setItems] = useState(cartItems);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");

  const updateQuantity = (id: number, change: number) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const discount = appliedPromo === "SAVE10" && subtotal > 200 ? subtotal * 0.1 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping - discount + tax;

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "SAVE10" && subtotal > 200) {
      setAppliedPromo("SAVE10");
    } else if (promoCode.toUpperCase() === "FREESHIP" && subtotal > 100) {
      setAppliedPromo("FREESHIP");
    } else {
      alert("Invalid promo code or minimum order not met");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any tools to your cart yet. Start shopping to fill it up!
            </p>
            <Button size="lg" className="tools-accent-gradient text-white">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart ({items.length} items)</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-3xl opacity-50">🔧</div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Badge variant="secondary" className="mb-2">{item.category}</Badge>
                          <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-tools-primary">${item.price}</span>
                            <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="rounded-none border-r"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <div className="px-3 py-1 min-w-[50px] text-center">{item.quantity}</div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="rounded-none border-l"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Subtotal: ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Promo Code */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Promo Code</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={applyPromoCode} variant="outline">
                    Apply
                  </Button>
                </div>
                {appliedPromo && (
                  <div className="mt-2 text-sm text-green-600">
                    Promo code {appliedPromo} applied successfully!
                  </div>
                )}
                <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                  <p>Available promo codes:</p>
                  {promoCodes.map((code, index) => (
                    <p key={index} className="text-xs">• {code}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-6">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedPromo})</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-tools-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Truck className="w-4 h-4" />
                    <span>Free shipping on orders over $100</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>Secure checkout</span>
                  </div>
                </div>
                
                <Button className="w-full tools-accent-gradient text-white mb-3" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Need Help?</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Our customer service team is available 24/7 to assist you.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-tools-primary">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Circular Saw Pro", price: 449.99, rating: 4.7 },
              { name: "Socket Set Complete", price: 129.99, rating: 4.4 },
              { name: "Impact Driver Max", price: 279.99, rating: 4.9 },
              { name: "Tool Box Premium", price: 89.99, rating: 4.5 }
            ].map((product, index) => (
              <Card key={index} className="hover-lift cursor-pointer">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-4xl opacity-50">🔧</div>
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </div>
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
                  </div>
                  <div className="text-lg font-bold text-tools-primary">${product.price}</div>
                  <Button className="w-full mt-3" variant="outline">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}