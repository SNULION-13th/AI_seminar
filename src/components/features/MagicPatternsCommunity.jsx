import { useState } from 'react';

const MagicPatternsCommunity = () => {
  const [patterns] = useState([
    {
      id: 1,
      title: "Geometric Hexagons",
      description: "Modern hexagonal patterns perfect for tech branding",
      category: "Geometric",
      author: "DesignStudio",
      likes: 234,
      downloads: 189,
      image: "https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop",
      tags: ["hexagon", "geometric", "tech"],
      featured: true
    },
    {
      id: 2,
      title: "Organic Floral",
      description: "Elegant botanical patterns for nature-inspired designs",
      category: "Nature",
      author: "BotanicalDesigns",
      likes: 156,
      downloads: 203,
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop",
      tags: ["floral", "organic", "nature"],
      featured: false
    },
    {
      id: 3,
      title: "Abstract Waves",
      description: "Fluid wave patterns for dynamic and modern layouts",
      category: "Abstract",
      author: "WaveDesign",
      likes: 189,
      downloads: 167,
      image: "https://images.unsplash.com/photo-1557683311-eac922347aa1?w=400&h=300&fit=crop",
      tags: ["waves", "abstract", "fluid"],
      featured: true
    },
    {
      id: 4,
      title: "Minimalist Grid",
      description: "Clean grid patterns for modern interface design",
      category: "Minimal",
      author: "MinimalStudio",
      likes: 278,
      downloads: 245,
      image: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=400&h=300&fit=crop",
      tags: ["grid", "minimal", "clean"],
      featured: false
    },
    {
      id: 5,
      title: "Vintage Textures",
      description: "Retro-inspired patterns with authentic vintage feel",
      category: "Vintage",
      author: "RetroDesigns",
      likes: 134,
      downloads: 98,
      image: "https://images.unsplash.com/photo-1557683304-673a23048d34?w=400&h=300&fit=crop",
      tags: ["vintage", "retro", "texture"],
      featured: false
    },
    {
      id: 6,
      title: "Digital Circuits",
      description: "Tech-inspired circuit patterns for digital products",
      category: "Tech",
      author: "TechPatterns",
      likes: 198,
      downloads: 156,
      image: "https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop",
      tags: ["circuit", "tech", "digital"],
      featured: true
    },
    {
      id: 7,
      title: "Watercolor Splashes",
      description: "Artistic watercolor patterns for creative projects",
      category: "Artistic",
      author: "ArtStudio",
      likes: 167,
      downloads: 134,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      tags: ["watercolor", "artistic", "creative"],
      featured: false
    },
    {
      id: 8,
      title: "Neon Glow",
      description: "Cyberpunk-inspired neon patterns for futuristic designs",
      category: "Cyberpunk",
      author: "CyberDesign",
      likes: 245,
      downloads: 189,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      tags: ["neon", "cyberpunk", "glow"],
      featured: true
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const categories = ['All', 'Geometric', 'Nature', 'Abstract', 'Minimal', 'Vintage', 'Tech', 'Artistic', 'Cyberpunk'];

  const filteredPatterns = patterns
    .filter(pattern => {
      const matchesCategory = selectedCategory === 'All' || pattern.category === selectedCategory;
      const matchesSearch = pattern.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pattern.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.likes - a.likes;
        case 'downloads':
          return b.downloads - a.downloads;
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });

  const featuredPatterns = patterns.filter(pattern => pattern.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Magic Patterns</h1>
                <p className="text-gray-600 text-sm">Community-driven design patterns</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-medium">
                Upload Pattern
              </button>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                <span className="text-gray-600 font-semibold">U</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Discover Amazing
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> Patterns</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Explore thousands of free design patterns created by our creative community. 
            Perfect for web design, branding, and creative projects.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search patterns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Patterns */}
      <section className="py-12 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Featured Patterns</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPatterns.map(pattern => (
              <div key={pattern.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                  <img 
                    src={pattern.image} 
                    alt={pattern.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                      {pattern.category}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{pattern.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{pattern.description}</p>
                    <p className="text-xs text-gray-500 mb-4">by {pattern.author}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span>{pattern.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{pattern.downloads}</span>
                        </div>
                      </div>
                      
                      <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 text-sm font-medium">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Sort */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Sort Options */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="popular">Most Popular</option>
                <option value="downloads">Most Downloaded</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* All Patterns Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPatterns.map(pattern => (
              <div key={pattern.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                  <img 
                    src={pattern.image} 
                    alt={pattern.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                      {pattern.category}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{pattern.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{pattern.description}</p>
                    <p className="text-xs text-gray-500 mb-4">by {pattern.author}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {pattern.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span>{pattern.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{pattern.downloads}</span>
                        </div>
                      </div>
                      
                      <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 text-sm font-medium">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <h3 className="text-xl font-bold">Magic Patterns</h3>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The largest community-driven collection of free design patterns. 
                Perfect for designers, developers, and creatives worldwide.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Upload Pattern</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community Forum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Design Challenges</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Design Tools</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Color Palettes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Typography</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Magic Patterns Community. All patterns are free to use under Creative Commons license.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MagicPatternsCommunity;

