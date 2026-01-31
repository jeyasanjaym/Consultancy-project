import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, Search, Heart } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeMobileCategory, setActiveMobileCategory] = useState(null)
  const { user, logout, isAuthenticated } = useAuth()
  const { getCartItemCount } = useCart()
  const navigate = useNavigate()

  const navigation = [
    {
      name: 'Men',
      sections: [
        {
          heading: 'Topwear',
          items: ['T-Shirts', 'Casual Shirts', 'Formal Shirts', 'Sweatshirts']
        },
        {
          heading: 'Bottomwear',
          items: ['Jeans', 'Trousers', 'Track Pants', 'Shorts']
        },
        {
          heading: 'Footwear',
          items: ['Casual Shoes', 'Sports Shoes', 'Sandals & Slippers']
        }
      ]
    },
    {
      name: 'Women',
      sections: [
        {
          heading: 'Topwear',
          items: ['Tops', 'T-Shirts', 'Shirts', 'Sweatshirts']
        },
        {
          heading: 'Bottomwear',
          items: ['Jeans', 'Trousers', 'Skirts', 'Leggings']
        },
        {
          heading: 'Footwear',
          items: ['Flats', 'Heels', 'Casual Shoes']
        }
      ]
    },
    {
      name: 'Kids',
      sections: [
        {
          heading: 'Boys Clothing',
          items: ['T-Shirts', 'Shirts', 'Shorts', 'Jeans']
        },
        {
          heading: 'Girls Clothing',
          items: ['Dresses', 'Tops', 'Skirts']
        },
        {
          heading: 'Footwear',
          items: ['Casual Shoes', 'Sandals']
        }
      ]
    }
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`)
      setSearchQuery('')
      setIsMenuOpen(false)
    }
  }

  const toggleMobileCategory = (categoryName) => {
    setActiveMobileCategory(activeMobileCategory === categoryName ? null : categoryName)
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold">
            Jolly Enterprises
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-r-md hover:bg-gray-800"
            >
              <Search size={20} />
            </button>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/my-orders" className="hidden md:flex items-center gap-1 hover:text-gray-600">
                  <User size={20} />
                  <span className="text-sm">{user?.name}</span>
                </Link>
                <button onClick={logout} className="hidden md:block text-sm hover:text-gray-600">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="hidden md:flex items-center gap-1 hover:text-gray-600">
                <User size={20} />
                <span className="text-sm">Sign In</span>
              </Link>
            )}

            <Link to="/cart" className="relative">
              <ShoppingCart size={24} />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Navigation - Desktop (Hover Mega Menu) */}
        <nav className="hidden md:flex items-center justify-center border-t border-gray-200 py-3 relative">
          <ul className="flex items-center gap-8">
            <li><Link to="/" className="font-medium hover:text-gray-600 uppercase tracking-wide">Home</Link></li>
            {navigation.map((category) => (
              <li key={category.name} className="relative group">
                <div className="py-2 cursor-pointer border-b-2 border-transparent group-hover:border-black transition-all">
                  <span className="font-medium uppercase tracking-wide">{category.name}</span>
                </div>

                {/* Mega Menu Dropdown */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-[800px] bg-white shadow-xl rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border-t border-gray-100">
                  <div className="grid grid-cols-3 gap-8 p-8">
                    {category.sections.map((section) => (
                      <div key={section.heading}>
                        <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">{section.heading}</h3>
                        <ul className="space-y-2">
                          {section.items.map((item) => (
                            <li key={item}>
                              <Link
                                to={`/category/${category.name}?subcategory=${item}`}
                                className="text-gray-600 hover:text-black hover:bg-gray-50 block py-1 transition-colors text-sm"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
            <li><Link to="/about" className="font-medium hover:text-gray-600 uppercase tracking-wide">About</Link></li>
            <li><Link to="/contact" className="font-medium hover:text-gray-600 uppercase tracking-wide">Contact</Link></li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu (Tap Accordion) */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white absolute top-full left-0 w-full shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="p-4 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                <Search size={18} />
              </button>
            </form>

            <ul className="space-y-2">
              <li className="border-b border-gray-100 pb-2">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 font-medium">Home</Link>
              </li>

              {navigation.map((category) => (
                <li key={category.name} className="border-b border-gray-100 last:border-0">
                  <button
                    onClick={() => toggleMobileCategory(category.name)}
                    className="flex items-center justify-between w-full py-3 font-medium text-left"
                  >
                    {category.name}
                    <span className={`transform transition-transform ${activeMobileCategory === category.name ? 'rotate-180' : ''}`}>
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>

                  {activeMobileCategory === category.name && (
                    <div className="pl-4 pb-4 space-y-4 bg-gray-50 rounded-md p-4">
                      {category.sections.map((section) => (
                        <div key={section.heading}>
                          <h4 className="font-medium text-sm text-gray-900 mb-2 uppercase">{section.heading}</h4>
                          <ul className="space-y-2 pl-2 border-l-2 border-gray-200">
                            {section.items.map((item) => (
                              <li key={item}>
                                <Link
                                  to={`/category/${category.name}?subcategory=${item}`} // Kept existing URL pattern
                                  onClick={() => setIsMenuOpen(false)}
                                  className="block py-1 text-sm text-gray-600 hover:text-black"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}

              <li className="border-b border-gray-100 py-2">
                <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block py-2 font-medium">About Us</Link>
              </li>
              <li className="border-b border-gray-100 py-2">
                <Link to="/festival-offers" onClick={() => setIsMenuOpen(false)} className="block py-2 font-medium">Festival Offers</Link>
              </li>
              <li className="border-b border-gray-100 py-2">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block py-2 font-medium">Contact</Link></li>
              <li className="py-2">
                <Link to="/track-order" onClick={() => setIsMenuOpen(false)} className="block py-2 font-medium">Track Your Order</Link>
              </li>

              {!isAuthenticated && (
                <li className="pt-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 py-2 font-medium text-black"
                  >
                    <User size={20} />
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

