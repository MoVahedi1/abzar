import { NextRequest, NextResponse } from 'next/server';

// Sample product data
const products = [
  {
    id: 1,
    name: "Professional Power Drill",
    nameFa: "دریل برقی حرفه‌ای",
    nameAr: "مثقاب كهربائي احترافي",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.5,
    reviews: 234,
    image: "/api/placeholder/300/300",
    category: "Power Tools",
    badge: "Best Seller",
    description: "High-performance cordless drill with 20V battery",
    features: ["20V MAX lithium-ion battery", "1/2-inch chuck", "LED work light", "Ergonomic grip"],
    specifications: {
      "Power Source": "20V Lithium-Ion Battery",
      "Chuck Size": "1/2 inch",
      "No-Load Speed": "0-1,500 RPM",
      "Max Torque": "450 in-lbs",
      "Weight": "3.5 lbs",
      "Warranty": "2 Years"
    },
    inStock: true,
    brand: "Vahedi Pro",
    sku: "VP-DRILL-001"
  },
  {
    id: 2,
    name: "Industrial Hammer Set",
    nameFa: "چکش صنعتی",
    nameAr: "مطرقة صناعية",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviews: 156,
    image: "/api/placeholder/300/300",
    category: "Hand Tools",
    badge: "Premium",
    description: "Professional hammer set with various sizes",
    features: ["Professional grade steel", "Ergonomic handles", "Various sizes", "Storage case included"],
    specifications: {
      "Material": "Professional Grade Steel",
      "Handle": "Ergonomic Rubber Grip",
      "Sizes": "3 hammers included",
      "Case": "Hard Storage Case",
      "Warranty": "5 Years"
    },
    inStock: true,
    brand: "Vahedi Pro",
    sku: "VP-HAMMER-002"
  },
  {
    id: 3,
    name: "Heavy-Duty Wrench Kit",
    nameFa: "ست آچار سنگین",
    nameAr: "طقم مفاتيح ثقيلة",
    price: 159.99,
    originalPrice: 199.99,
    rating: 4.6,
    reviews: 89,
    image: "/api/placeholder/300/300",
    category: "Hand Tools",
    badge: "New",
    description: "Complete wrench kit for industrial use",
    features: ["120-piece set", "Metric and SAE", "Durable construction", "Organized case"],
    specifications: {
      "Pieces": "120",
      "Types": "Metric & SAE",
      "Material": "Chrome Vanadium Steel",
      "Case": "Plastic Organizer",
      "Warranty": "3 Years"
    },
    inStock: true,
    brand: "Vahedi Pro",
    sku: "VP-WRENCH-003"
  },
  {
    id: 4,
    name: "Circular Saw Pro",
    nameFa: "اره گردبور حرفه‌ای",
    nameAr: "منشار دائري احترافي",
    price: 449.99,
    originalPrice: 599.99,
    rating: 4.7,
    reviews: 312,
    image: "/api/placeholder/300/300",
    category: "Power Tools",
    badge: "Hot Deal",
    description: "Professional circular saw with laser guide",
    features: ["15-amp motor", "Laser guide", "Electric brake", "Dust port"],
    specifications: {
      "Power": "15-Amp Motor",
      "Blade Size": "7-1/4 inch",
      "Depth of Cut": "2-9/16 inch at 90°",
      "Laser Guide": "Built-in",
      "Warranty": "2 Years"
    },
    inStock: true,
    brand: "Vahedi Pro",
    sku: "VP-SAW-004"
  },
  {
    id: 5,
    name: "Socket Set Complete",
    nameFa: "ست سوکت کامل",
    nameAr: "طقم مقابس كامل",
    price: 129.99,
    originalPrice: 169.99,
    rating: 4.4,
    reviews: 178,
    image: "/api/placeholder/300/300",
    category: "Hand Tools",
    badge: "Popular",
    description: "120-piece socket set with case",
    features: ["120-piece set", "3 drive sizes", "Deep and shallow sockets", "Extension bars"],
    specifications: {
      "Pieces": "120",
      "Drive Sizes": "1/4, 3/8, 1/2 inch",
      "Material": "Chrome Vanadium",
      "Case": "Metal Case",
      "Warranty": "3 Years"
    },
    inStock: true,
    brand: "Vahedi Pro",
    sku: "VP-SOCKET-005"
  },
  {
    id: 6,
    name: "Impact Driver Max",
    nameFa: "درایلر ضربه‌ای",
    nameAr: "براغي تأثيري",
    price: 279.99,
    originalPrice: 349.99,
    rating: 4.9,
    reviews: 423,
    image: "/api/placeholder/300/300",
    category: "Power Tools",
    badge: "Top Rated",
    description: "High-torque impact driver with LED light",
    features: ["20V MAX power", "2000 in-lbs torque", "LED work light", "Compact design"],
    specifications: {
      "Power": "20V MAX",
      "Max Torque": "2000 in-lbs",
      "Speed": "0-3,200 RPM",
      "LED Light": "Built-in",
      "Warranty": "2 Years"
    },
    inStock: true,
    brand: "Vahedi Pro",
    sku: "VP-IMPACT-006"
  }
];

const categories = [
  { id: 1, name: "Power Tools", nameFa: "ابزار برقی", nameAr: "الأدوات الكهربائية", count: 156 },
  { id: 2, name: "Hand Tools", nameFa: "ابزار دستی", nameAr: "الأدوات اليدوية", count: 234 },
  { id: 3, name: "Measurement", nameFa: "اندازه‌گیری", nameAr: "القياس", count: 89 },
  { id: 4, name: "Safety Gear", nameFa: "تجهیزات ایمنی", nameAr: "معدات السلامة", count: 67 },
  { id: 5, name: "Storage", nameFa: "انبارداری", nameAr: "التخزين", count: 45 },
  { id: 6, name: "Accessories", nameFa: "لوازم جانبی", nameAr: "اكسسوارات", count: 123 }
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const id = searchParams.get('id');
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const lang = searchParams.get('lang') || 'en';

  try {
    switch (type) {
      case 'products':
        let filteredProducts = products;
        
        // Filter by category
        if (category) {
          filteredProducts = filteredProducts.filter(p => 
            p.category.toLowerCase() === category.toLowerCase()
          );
        }
        
        // Filter by search term
        if (search) {
          filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase())
          );
        }
        
        // Get single product by ID
        if (id) {
          const product = products.find(p => p.id === parseInt(id));
          if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
          }
          return NextResponse.json({ product });
        }
        
        return NextResponse.json({ 
          products: filteredProducts,
          total: filteredProducts.length
        });
        
      case 'categories':
        return NextResponse.json({ categories });
        
      case 'featured':
        const featuredProducts = products.filter(p => p.badge);
        return NextResponse.json({ 
          products: featuredProducts,
          total: featuredProducts.length
        });
        
      case 'deals':
        const dealProducts = products.filter(p => 
          p.badge === 'Hot Deal' || p.badge === 'Best Seller'
        );
        return NextResponse.json({ 
          products: dealProducts,
          total: dealProducts.length
        });
        
      default:
        return NextResponse.json({ 
          products,
          categories,
          featured: products.filter(p => p.badge),
          total: products.length
        });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  
  try {
    switch (type) {
      case 'search':
        const { query, filters } = await request.json();
        
        let results = products;
        
        // Search by name or description
        if (query) {
          results = results.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
          );
        }
        
        // Apply filters
        if (filters) {
          if (filters.category) {
            results = results.filter(p => p.category === filters.category);
          }
          if (filters.minPrice) {
            results = results.filter(p => p.price >= filters.minPrice);
          }
          if (filters.maxPrice) {
            results = results.filter(p => p.price <= filters.maxPrice);
          }
          if (filters.rating) {
            results = results.filter(p => p.rating >= filters.rating);
          }
        }
        
        return NextResponse.json({ 
          products: results,
          total: results.length,
          query,
          filters
        });
        
      case 'cart':
        const { items } = await request.json();
        
        // Calculate cart totals
        const subtotal = items.reduce((sum: number, item: any) => 
          sum + (item.price * item.quantity), 0
        );
        const shipping = subtotal > 100 ? 0 : 9.99;
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;
        
        return NextResponse.json({
          items,
          totals: {
            subtotal,
            shipping,
            tax,
            total
          }
        });
        
      default:
        return NextResponse.json({ error: 'Invalid request type' }, { status: 400 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}