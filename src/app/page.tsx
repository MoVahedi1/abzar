'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronRight, Star, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Globe, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

// Sample product data
const sampleProducts = [
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
    description: "High-performance cordless drill with 20V battery"
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
    description: "Professional hammer set with various sizes"
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
    description: "Complete wrench kit for industrial use"
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
    description: "Professional circular saw with laser guide"
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
    description: "120-piece socket set with case"
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
    description: "High-torque impact driver with LED light"
  }
];

const categories = [
  { name: "Power Tools", nameFa: "ابزار برقی", nameAr: "الأدوات الكهربائية", icon: "⚡", count: 156 },
  { name: "Hand Tools", nameFa: "ابزار دستی", nameAr: "الأدوات اليدوية", icon: "🔧", count: 234 },
  { name: "Measurement", nameFa: "اندازه‌گیری", nameAr: "القياس", icon: "📏", count: 89 },
  { name: "Safety Gear", nameFa: "تجهیزات ایمنی", nameAr: "معدات السلامة", icon: "🥽", count: 67 },
  { name: "Storage", nameFa: "انبارداری", nameAr: "التخزين", icon: "📦", count: 45 },
  { name: "Accessories", nameFa: "لوازم جانبی", nameAr: "اكسسوارات", icon: "🔩", count: 123 }
];

const heroSlides = [
  {
    title: "Professional Tools for Professional Work",
    titleFa: "ابزار حرفه‌ای برای کار حرفه‌ای",
    titleAr: "أدوات احترافية للعمل الاحترافي",
    subtitle: "Up to 50% off on selected items",
    subtitleFa: "تا 50% تخفیف روی کالاهای منتخب",
    subtitleAr: "خصم يصل إلى 50٪ على المنتجات المختارة",
    cta: "Shop Now",
    ctaFa: "همین حالا خرید کنید",
    ctaAr: "تسوق الآن",
    image: "/api/placeholder/1200/600"
  },
  {
    title: "Industrial Grade Equipment",
    titleFa: "تجهیزات درجه صنعتی",
    titleAr: "معدات درجة صناعية",
    subtitle: "Built to last, designed for professionals",
    subtitleFa: "ساخته شده برای دوام، طراحی شده برای حرفه‌ای‌ها",
    subtitleAr: "مصنوعة لتدوم، مصممة للمحترفين",
    cta: "Explore Collection",
    ctaFa: "مجموعه را کاوش کنید",
    ctaAr: "استكشف المجموعة",
    image: "/api/placeholder/1200/600"
  },
  {
    title: "New Arrivals 2025",
    titleFa: "محصولات جدید 2025",
    titleAr: "وصلات جديدة 2025",
    subtitle: "Latest technology in power tools",
    subtitleFa: "جدیدترین تکنولوژی در ابزار برقی",
    subtitleAr: "أحدث التكنولوجيا في الأدوات الكهربائية",
    cta: "View New Items",
    ctaFa: "مشاهده محصولات جدید",
    ctaAr: "عرض العناصر الجديدة",
    image: "/api/placeholder/1200/600"
  }
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState(0);

  const languages = [
    { code: 'en', name: 'English', dir: 'ltr' },
    { code: 'fa', name: 'فارسی', dir: 'rtl' },
    { code: 'ar', name: 'العربية', dir: 'rtl' }
  ];

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        logo: 'Vahedi Tools',
        search: 'Search tools...',
        categories: 'Categories',
        deals: 'Hot Deals',
        featured: 'Featured Products',
        contact: 'Contact Us',
        about: 'About Us',
        phone: '+989392083721',
        email: 'mohammadvahediwork@gmail.com',
        address: 'Tehran, Iran',
        addToCart: 'Add to Cart',
        buyNow: 'Buy Now',
        freeShipping: 'Free Shipping',
        warranty: '2 Year Warranty',
        support: '24/7 Support'
      },
      fa: {
        logo: 'ابزار واحدی',
        search: 'جستجوی ابزار...',
        categories: 'دسته‌بندی‌ها',
        deals: 'پیشنهادات ویژه',
        featured: 'محصولات ویژه',
        contact: 'تماس با ما',
        about: 'درباره ما',
        phone: '+989392083721',
        email: 'mohammadvahediwork@gmail.com',
        address: 'تهران، ایران',
        addToCart: 'افزودن به سبد',
        buyNow: 'خرید فوری',
        freeShipping: 'ارسال رایگان',
        warranty: '2 سال گارانتی',
        support: 'پشتیبانی 24/7'
      },
      ar: {
        logo: 'أدوات واحدی',
        search: 'البحث عن الأدوات...',
        categories: 'الفئات',
        deals: 'عروض ساخنة',
        featured: 'المنتجات المميزة',
        contact: 'اتصل بنا',
        about: 'من نحن',
        phone: '+989392083721',
        email: 'mohammadvahediwork@gmail.com',
        address: 'طهران، إيران',
        addToCart: 'أضف للسلة',
        buyNow: 'اشتر الآن',
        freeShipping: 'شحن مجاني',
        warranty: 'ضمانة سنتان',
        support: 'دعم على مدار الساعة'
      }
    };
    return translations[currentLanguage]?.[key] || translations.en[key];
  };

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const ProductCard = ({ product }: { product: typeof sampleProducts[0] }) => {
    const productName = currentLanguage === 'fa' ? product.nameFa : 
                       currentLanguage === 'ar' ? product.nameAr : product.name;
    
    return (
      <Card className="group hover-lift overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative overflow-hidden">
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-6xl opacity-50">🔧</div>
          </div>
          {product.badge && (
            <Badge className="absolute top-2 left-2 bg-tools-accent text-white">
              {product.badge}
            </Badge>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2 scale-90 group-hover:scale-100 transition-transform">
              <Button size="sm" className="ripple tools-accent-gradient text-white">
                {t('addToCart')}
              </Button>
              <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur">
                {t('buyNow')}
              </Button>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="text-xs text-muted-foreground mb-1">{product.category}</div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{productName}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
            ))}
            <span className="text-sm text-muted-foreground ml-1">({product.reviews})</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-tools-primary">${product.price}</div>
              <div className="text-sm text-muted-foreground line-through">${product.originalPrice}</div>
            </div>
            <div className="text-xs text-green-600 font-semibold">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className={`min-h-screen bg-background ${currentLang?.dir === 'rtl' ? 'rtl' : 'ltr'}`} dir={currentLang?.dir}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-tools-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">V</span>
                </div>
                <span className="text-xl font-bold text-tools-primary">{t('logo')}</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder={t('search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-tools-primary"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <div className="relative">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">{currentLang?.name}</span>
                </Button>
              </div>

              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center gap-1"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="sm"
                className="relative flex items-center gap-1"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs">
                    {cartItems}
                  </Badge>
                )}
              </Button>

              {/* User Account */}
              <Button variant="ghost" size="sm">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="container mx-auto px-4 py-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder={t('search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-full border-gray-300"
                />
              </div>
              <nav className="flex flex-col gap-2">
                <Button variant="ghost" className="justify-start">{t('categories')}</Button>
                <Button variant="ghost" className="justify-start">{t('deals')}</Button>
                <Button variant="ghost" className="justify-start">{t('about')}</Button>
                <Button variant="ghost" className="justify-start">{t('contact')}</Button>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <Carousel className="w-full">
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[400px] md:h-[600px] bg-gradient-to-r from-tools-primary to-tools-secondary">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-2xl text-white fade-in">
                      <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        {currentLanguage === 'fa' ? slide.titleFa : 
                         currentLanguage === 'ar' ? slide.titleAr : slide.title}
                      </h1>
                      <p className="text-xl md:text-2xl mb-8 opacity-90">
                        {currentLanguage === 'fa' ? slide.subtitleFa : 
                         currentLanguage === 'ar' ? slide.subtitleAr : slide.subtitle}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="ripple tools-accent-gradient text-white px-8 py-3 rounded-lg text-lg">
                          {currentLanguage === 'fa' ? slide.ctaFa : 
                           currentLanguage === 'ar' ? slide.ctaAr : slide.cta}
                        </Button>
                        <Button size="lg" variant="outline" className="bg-white/20 backdrop-blur text-white border-white hover:bg-white/30 px-8 py-3 rounded-lg text-lg">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Features Bar */}
      <section className="bg-tools-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="font-semibold">{t('freeShipping')}</h3>
              <p className="text-sm opacity-90">On orders over $100</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-semibold">{t('warranty')}</h3>
              <p className="text-sm opacity-90">On all products</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-semibold">{t('support')}</h3>
              <p className="text-sm opacity-90">Dedicated support</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold">Secure Payment</h3>
              <p className="text-sm opacity-90">100% secure transactions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('categories')}</h2>
            <p className="text-xl text-muted-foreground">Browse our wide range of professional tools</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card key={category.name} className="hover-lift cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
                  <h3 className="font-semibold mb-1">
                    {currentLanguage === 'fa' ? category.nameFa : 
                     currentLanguage === 'ar' ? category.nameAr : category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{category.count} items</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('featured')}</h2>
            <p className="text-xl text-muted-foreground">Hand-picked selection of our best-selling tools</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" className="tools-accent-gradient text-white px-8 py-3 rounded-lg">
              View All Products <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-tools-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">Get the latest deals and new product announcements</p>
          <div className="max-w-md mx-auto flex gap-2">
            <Input
              placeholder="Enter your email"
              className="bg-white/20 backdrop-blur border-white/30 text-white placeholder-white/70"
            />
            <Button className="bg-white text-tools-primary hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-tools-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">V</span>
                </div>
                <span className="text-xl font-bold">{t('logo')}</span>
              </div>
              <p className="text-gray-400 mb-4">Your trusted partner for professional tools and equipment since 2025.</p>
              <div className="flex gap-3">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Youtube className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto">About Us</Button></li>
                <li><Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto">Products</Button></li>
                <li><Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto">Deals</Button></li>
                <li><Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto">Blog</Button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto">Contact Us</Button></li>
                <li><Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto">Shipping Info</Button></li>
                <li><Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto">Returns</Button></li>
                <li><Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto">FAQ</Button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{t('phone')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{t('email')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{t('address')}</span>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-800" />
          
          <div className="text-center text-gray-400">
            <p>&copy; 2025 {t('logo')}. All rights reserved. | Privacy Policy | Terms of Service</p>
            <p className="mt-2">Designed with ❤️ by Mohammad Vahedi</p>
          </div>
        </div>
      </footer>
    </div>
  );
}