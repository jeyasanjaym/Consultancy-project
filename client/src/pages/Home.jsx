import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import {
  ShoppingBag,
  Truck,
  Shield,
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Gift,
  Tag,
  ArrowRight,
} from 'lucide-react'
import slide1 from '../../istockphoto-1201024668-612x612.jpg'
import slide2 from '../../istockphoto-1300966679-612x612.jpg'
import slide3 from '../../istockphoto-1308246727-612x612.jpg'
import slide4 from '../../istockphoto-1409728562-612x612.jpg'
import slide5 from '../../istockphoto-1453723844-612x612.jpg'
import slide6 from '../../istockphoto-626856214-612x612.jpg'
import slide7 from '../../istockphoto-653003428-612x612.jpg'
import slide8 from '../../istockphoto-831656828-612x612.jpg'
import slide9 from '../../pic1.jpg'

const festivalHighlights = [
  { id: 'diwali', name: 'Diwali', icon: '🪔', color: 'from-yellow-500 to-orange-500' },
  { id: 'christmas', name: 'Christmas', icon: '🎄', color: 'from-green-500 to-red-500' },
  { id: 'newyear', name: 'New Year', icon: '🎉', color: 'from-blue-500 to-purple-500' },
  { id: 'eid', name: 'Eid', icon: '🌙', color: 'from-green-400 to-emerald-600' },
  { id: 'pongal', name: 'Pongal', icon: '🌾', color: 'from-yellow-400 to-orange-600' },
  { id: 'holi', name: 'Holi', icon: '🌈', color: 'from-pink-500 to-purple-500' },
]

const shopCategories = [
  { name: 'T-Shirt', slug: 'T-Shirt', icon: '👕' },
  { name: 'Pant / Track', slug: 'Pant / Track', icon: '👖' },
  { name: 'Co-Ord Set', slug: 'Co-Ord Set', icon: '👔' },
  { name: 'Shirt', slug: 'Shirt', icon: '🧥' },
  { name: 'Hoodies', slug: 'Hoodies', icon: '🧣' },
  { name: 'Shoes', slug: 'Shoes', icon: '👟' },
  { name: 'Slipper', slug: 'Slipper', icon: '🥿' },
  { name: 'Perfume', slug: 'Perfume', icon: '✨' },
]

const heroSlides = [
  { src: slide5, caption: 'Sharp formals for standout events.' },
  { src: slide3, caption: 'Premium layering for every season.' },
  { src: slide1, caption: 'Tailored fits with modern lines.' },
  { src: slide6, caption: 'Statement outerwear, refined details.' },
  { src: slide2, caption: 'Weekend-ready casual sophistication.' },
  { src: slide4, caption: 'Elevated essentials, sleek silhouettes.' },
  { src: slide7, caption: 'Comfort-first polos, premium fabrics.' },
  { src: slide8, caption: 'Luxury knitwear for cooler days.' },
  { src: slide9, caption: 'Curated looks from our latest drop.' },
]

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([])
  const [backInStock, setBackInStock] = useState([])
  const [featured, setFeatured] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [])

  const fetchProducts = async () => {
    try {
      const [newArrivalsRes, backInStockRes, featuredRes] = await Promise.all([
        axios.get('/api/products?newArrival=true&limit=6'),
        axios.get('/api/products?backInStock=true&limit=6'),
        axios.get('/api/products?featured=true&limit=6'),
      ])

      setNewArrivals(newArrivalsRes.data.products || [])
      setBackInStock(backInStockRes.data.products || [])
      setFeatured(featuredRes.data.products || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 grid gap-10 lg:grid-cols-2 items-center">
          <div className="text-center lg:text-left space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">
              Welcome to
            </p>
            <h1 className="text-5xl font-bold leading-tight">
              Jolly Enterprises
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
              Premium clothing for every occasion — discover curated looks,
              tailored fits, and elevated essentials. From sharp formals to
              weekend casuals, we bring you quality fabrics and modern designs
              that last.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-1 text-gray-300 text-sm">
              <li>Curated styles</li>
              <li>Premium fabrics</li>
              <li>Fast delivery</li>
              <li>5 stores in Coimbatore</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <Link to="/products" className="btn-primary inline-block">
                Shop Now
              </Link>
              <Link to="/festival-offers" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-white/50 text-white hover:bg-white/10 transition">
                <Gift size={18} />
                Festival Offers
              </Link>
              <span className="text-sm text-gray-400">
                Handpicked styles updated weekly. Free delivery on orders above ₹2,000.
              </span>
            </div>
          </div>

          <div className="relative w-full">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gray-800 aspect-[4/3]">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.src}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={slide.src}
                    alt={slide.caption}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-300">
                        Premium Clothing
                      </p>
                      <p className="text-lg font-semibold">{slide.caption}</p>
                    </div>
                    <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur">
                      {index + 1}/{heroSlides.length}
                    </span>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full backdrop-blur hover:bg-black/70 transition"
                aria-label="Previous slide"
                onClick={() =>
                  setCurrentSlide(
                    (prev) =>
                      (prev - 1 + heroSlides.length) % heroSlides.length
                  )
                }
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full backdrop-blur hover:bg-black/70 transition"
                aria-label="Next slide"
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
                }
              >
                <ChevronRight size={20} />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      index === currentSlide
                        ? 'bg-white'
                        : 'bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Why shop with us</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              We combine quality products with reliable service so you can shop with confidence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
              <Truck className="mx-auto mb-3 text-black" size={44} />
              <h3 className="font-semibold mb-2">Fast Shipping</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Orders ship within 24–48 hours. Track your parcel from checkout to doorstep.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
              <Star className="mx-auto mb-3 text-black" size={44} />
              <h3 className="font-semibold mb-2">4.8★ Rating</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Trusted by 8,000+ customers. Read reviews and join our happy community.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
              <Shield className="mx-auto mb-3 text-black" size={44} />
              <h3 className="font-semibold mb-2">Secure Checkout</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Safe payments and buyer protection. Your data and transactions are secure.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
              <ShoppingBag className="mx-auto mb-3 text-black" size={44} />
              <h3 className="font-semibold mb-2">Store Location</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Visit our 5 stores in Coimbatore. Try before you buy, in person.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Festival Offers */}
      <section className="py-14 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-amber-600" size={28} />
              <h2 className="text-3xl font-bold">Festival Offers</h2>
            </div>
            <Link
              to="/festival-offers"
              className="inline-flex items-center gap-2 font-semibold text-black hover:underline"
            >
              View all offers
              <ArrowRight size={20} />
            </Link>
          </div>
          <p className="text-gray-600 mb-2 max-w-2xl">
            Light up your wardrobe with seasonal deals — Diwali, Christmas, New Year, Eid, Pongal, Holi and more. Up to 50% off on selected items.
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Use code <span className="font-mono font-semibold bg-amber-100 px-2 py-0.5 rounded">FESTIVAL10</span> for an extra 10% off on orders above ₹2,000.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {festivalHighlights.map((f) => (
              <Link
                key={f.id}
                to="/festival-offers"
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${f.color} p-5 text-white shadow-lg hover:scale-[1.02] transition transform`}
              >
                <span className="text-4xl block mb-2">{f.icon}</span>
                <span className="font-semibold">{f.name}</span>
                <div className="absolute bottom-2 right-2 opacity-80">
                  <Tag size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Gift size={28} className="text-black" />
            <h2 className="text-3xl font-bold">Shop by Category</h2>
          </div>
          <p className="text-gray-600 mb-2 max-w-2xl">
            Whether you need casual wear, formals, sportswear, or accessories — start from a category below. Each section has subcategories so you find exactly what you want.
          </p>
          <p className="text-gray-500 text-sm mb-6">
            T-Shirts, Pants & Tracks, Co-Ord Sets, Shirts, Hoodies, Shoes, Slippers, Perfumes and more.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-4">
            {shopCategories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${encodeURIComponent(cat.slug)}`}
                className="group flex flex-col items-center justify-center p-6 rounded-xl border-2 border-gray-200 bg-white hover:border-black hover:shadow-lg transition text-center"
              >
                <span className="text-4xl mb-2 block group-hover:scale-110 transition">{cat.icon}</span>
                <span className="font-semibold text-sm">{cat.name}</span>
                <ArrowRight size={16} className="mt-2 opacity-0 group-hover:opacity-100 transition" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-14 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2">New Arrivals</h2>
            <p className="text-gray-600 mb-6 max-w-xl">Just landed — the latest styles and trends, updated regularly. Be the first to wear what’s new.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back in Stock */}
      {backInStock.length > 0 && (
        <section className="py-14 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2">Back in Stock</h2>
            <p className="text-gray-600 mb-6 max-w-xl">Back by popular demand — previously sold-out favourites are here again. Grab them before they go.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {backInStock.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="py-14 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-gray-600 mb-6 max-w-xl">Editor’s picks — our most loved styles and bestsellers. Quality and design that our customers keep coming back for.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {featured.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats / Social proof */}
      <section className="py-10 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold">8,000+</p>
              <p className="text-gray-400 text-sm mt-1">Happy customers</p>
            </div>
            <div>
              <p className="text-3xl font-bold">5</p>
              <p className="text-gray-400 text-sm mt-1">Stores in Coimbatore</p>
            </div>
            <div>
              <p className="text-3xl font-bold">50+</p>
              <p className="text-gray-400 text-sm mt-1">Categories & subcategories</p>
            </div>
            <div>
              <p className="text-3xl font-bold">4.8★</p>
              <p className="text-gray-400 text-sm mt-1">Average rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore more */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2 text-center">Explore more</h2>
          <p className="text-gray-600 text-center mb-8 max-w-lg mx-auto">
            Jump to festival offers, all products, about us, contact, or track your order — everything you need in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/festival-offers"
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white border-2 border-gray-200 hover:border-black font-semibold transition"
            >
              <Gift size={20} />
              Festival Offers
            </Link>
            <Link
              to="/products"
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white border-2 border-gray-200 hover:border-black font-semibold transition"
            >
              <ShoppingBag size={20} />
              All Products
            </Link>
            <Link
              to="/about"
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white border-2 border-gray-200 hover:border-black font-semibold transition"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white border-2 border-gray-200 hover:border-black font-semibold transition"
            >
              Contact
            </Link>
            <Link
              to="/track-order"
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white border-2 border-gray-200 hover:border-black font-semibold transition"
            >
              <Truck size={20} />
              Track Order
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

