'use client'
import { useState } from 'react'
import { Menu, Plane, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
//import { CustomLink } from '@/components/custom-link'
import Image from 'next/image'
import Link from 'next/link'
const navItems = [
  { name: 'Accueil', to: '/' },
  { name: 'À propos', to: '/#about' },
  { name: 'Services', to: '/#services' },
  { name: 'Promos', to: '/#promos' },
  { name: 'Contact', to: '/#contact' },
]

 const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 text-background">
      <div className="container mx-auto px-16">
        <div className="flex items-center justify-between h-22">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <img
              src='/hero.webp'
              alt="Laafi Cargo International"
              className="h-14 w-auto"
            />

            <div className='flex flex-col items-center'>
              <div className="flex gap-2 font-bold text-lg">
                <h1>LAAFI</h1>
                <h1>CARGO</h1>
                <h1>INTERNATIONAL</h1>
              </div>
              <div className='border-b border-background/30 w-full' />
              <div className='text-[10px] text-red-500'>
                Transport International
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.to}
                  className="
                    relative font-medium transition-colors duration-300

                    after:absolute after:left-0 after:-bottom-1
                    after:h-0.5 after:w-0
                    after:bg-background
                    after:transition-all after:duration-300

                    hover:after:w-full

                    data-[active=true]:after:w-full
                    data-[active=true]:after:bg-red-600
                "
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile button */}
          <button
            className="md:hidden text-secondary-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden pb-6"
            >
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-background/95"
                onClick={() => setIsOpen(false)}
              />

              <div className="relative flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    href={item.to}
                    //activeClassName="text-red-600"
                    className="font-medium px-2 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold mt-2"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Plane className="w-4 h-4" />
                    Obtenir un devis
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Header