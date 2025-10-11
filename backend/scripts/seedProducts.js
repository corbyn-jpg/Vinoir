const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const products = [
  {
    name: 'Noir Essentiel',
    description: 'A profound exploration of darkness and light, where smoky oud meets velvety rose in a dance of contrasting elegance. This enigmatic fragrance reveals hidden depths with each passing hour, leaving an unforgettable trail of sophistication.',
    price: 285.00,
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Black Pepper', 'Saffron', 'Bergamot'],
      middleNotes: ['Oud Wood', 'Dark Rose', 'Leather'],
      baseNotes: ['Amber', 'Patchouli', 'Vanilla']
    },
    size: '100ml',
    stock: 15,
    featured: true,
    rating: 4.9,
    reviewCount: 127,
    salesCount: 89,
    images: [{
      url: '/images/products/dior1.jpg',
      altText: 'Noir Essentiel luxury black fragrance bottle'
    }]
  },
  {
    name: 'Lumière d\'Or',
    description: 'Golden sunlight captured in a bottle, this radiant fragrance opens with sparkling citrus and settles into a warm embrace of amber and white flowers. A timeless classic for those who carry their own light.',
    price: 220.00,
    category: 'Eau de Toilette',
    fragranceNotes: {
      topNotes: ['Bergamot', 'Mandarin', 'Neroli'],
      middleNotes: ['Jasmine', 'Orange Blossom', 'Ylang Ylang'],
      baseNotes: ['Amberwood', 'White Musk', 'Cedar']
    },
    size: '100ml',
    stock: 28,
    featured: true,
    rating: 4.7,
    reviewCount: 94,
    salesCount: 67,
    images: [{
      url: '/images/products/dior2.jpg',
      altText: 'Lumière d\'Or golden luxury fragrance bottle'
    }]
  },
  {
    name: 'Velvet Rose',
    description: 'Like crushed velvet petals against skin, this opulent rose fragrance is both delicate and profound. Bulgarian rose absolute dances with peony and violet, creating a floral masterpiece of unparalleled luxury.',
    price: 245.00,
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Turkish Rose', 'Peony', 'Pink Pepper'],
      middleNotes: ['Damask Rose', 'Violet', 'Orris'],
      baseNotes: ['Sandalwood', 'Vanilla', 'White Musk']
    },
    size: '100ml',
    stock: 22,
    featured: false,
    rating: 4.8,
    reviewCount: 156,
    salesCount: 112,
    images: [{
      url: '/images/products/dior3.jpg',
      altText: 'Velvet Rose floral luxury perfume bottle'
    }]
  },
  {
    name: 'Oud Royal',
    description: 'Regal and commanding, this fragrance features precious oud wood from Thailand, aged to perfection. Wrapped in spices and smoky leather, it creates an aura of power and sophistication fit for royalty.',
    price: 395.00,
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Saffron', 'Cinnamon', 'Cardamom'],
      middleNotes: ['Agarwood', 'Rose', 'Patchouli'],
      baseNotes: ['Leather', 'Amber', 'Oakmoss']
    },
    size: '100ml',
    stock: 8,
    featured: true,
    rating: 4.9,
    reviewCount: 83,
    salesCount: 45,
    images: [{
      url: '/images/products/dior4.jpg',
      altText: 'Oud Royal premium oud fragrance bottle'
    }]
  },
  {
    name: 'Amber Mystique',
    description: 'Warm, sensual amber unfolds like a secret whispered in the dark. This mysterious blend combines resinous notes with vanilla and tonka bean, creating a fragrance that feels both familiar and enigmatic.',
    price: 235.00,
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Amber', 'Incense', 'Bergamot'],
      middleNotes: ['Vanilla', 'Tonka Bean', 'Heliotrope'],
      baseNotes: ['Benzoin', 'Labdanum', 'Musk']
    },
    size: '100ml',
    stock: 18,
    featured: false,
    rating: 4.6,
    reviewCount: 91,
    salesCount: 63,
    images: [{
      url: '/images/products/dior5.jpg',
      altText: 'Amber Mystique warm amber fragrance bottle'
    }]
  },
  {
    name: 'Citrus Éclat',
    description: 'A burst of Mediterranean sunshine in every drop. Zesty citrus fruits dance with green herbs and white flowers, creating an uplifting fragrance that energizes the spirit and brightens the day.',
    price: 195.00,
    category: 'Eau de Toilette',
    fragranceNotes: {
      topNotes: ['Blood Orange', 'Lemon', 'Bergamot'],
      middleNotes: ['Neroli', 'Petitgrain', 'Mint'],
      baseNotes: ['Cedar', 'Amber', 'Musk']
    },
    size: '100ml',
    stock: 35,
    featured: false,
    rating: 4.5,
    reviewCount: 124,
    salesCount: 88,
    images: [{
      url: '/images/products/dior6.jpg',
      altText: 'Citrus Éclat fresh citrus fragrance bottle'
    }]
  },
  {
    name: 'Santal Blanc',
    description: 'Creamy sandalwood from Mysore meets ethereal white flowers in this serene, meditative fragrance. A minimalist masterpiece that speaks volumes in whispers rather than shouts.',
    price: 275.00,
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Sandalwood', 'Bergamot', 'Neroli'],
      middleNotes: ['Iris', 'Violet', 'Orris Butter'],
      baseNotes: ['Musk', 'Tonka Bean', 'Amber']
    },
    size: '100ml',
    stock: 12,
    featured: true,
    rating: 4.7,
    reviewCount: 67,
    salesCount: 41,
    images: [{
      url: '/images/products/dior7.jpg',
      altText: 'Santal Blanc sandalwood luxury fragrance bottle'
    }]
  },
  {
    name: 'Patchouli Nocturne',
    description: 'Earthy patchouli undergoes a nocturnal transformation, revealing its sensual, mysterious side. Dark chocolate and rose elevate this bohemian spirit to new heights of sophistication.',
    price: 255.00,
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Patchouli', 'Bergamot', 'Black Currant'],
      middleNotes: ['Rose', 'Cacao', 'Geranium'],
      baseNotes: ['Vanilla', 'Amber', 'Leather']
    },
    size: '100ml',
    stock: 16,
    featured: false,
    rating: 4.8,
    reviewCount: 78,
    salesCount: 52,
    images: [{
      url: '/images/products/dior8.jpg',
      altText: 'Patchouli Nocturne earthy fragrance bottle'
    }]
  },
  {
    name: 'Jardin Secret',
    description: 'A hidden garden where dewy greens meet blooming white flowers. This fresh, airy fragrance captures the moment morning light touches petals, creating an atmosphere of pure tranquility.',
    price: 210.00,
    category: 'Eau de Toilette',
    fragranceNotes: {
      topNotes: ['Green Leaves', 'Bergamot', 'Galbanum'],
      middleNotes: ['Lily of the Valley', 'Jasmine', 'Magnolia'],
      baseNotes: ['Moss', 'Cedar', 'White Musk']
    },
    size: '100ml',
    stock: 25,
    featured: false,
    rating: 4.4,
    reviewCount: 105,
    salesCount: 74,
    images: [{
      url: '/images/products/dior9.jpg',
      altText: 'Jardin Secret fresh garden fragrance bottle'
    }]
  },
  {
    name: 'Cuir de Nuit',
    description: 'The scent of fine leather gloves and midnight encounters. Smoky birch and smooth suede create a sophisticated leather fragrance that is both rugged and refined, mysterious and inviting.',
    price: 315.00,
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Birch', 'Saffron', 'Black Pepper'],
      middleNotes: ['Leather', 'Suede', 'Iris'],
      baseNotes: ['Vanilla', 'Amber', 'Musk']
    },
    size: '100ml',
    stock: 10,
    featured: true,
    rating: 4.9,
    reviewCount: 59,
    salesCount: 36,
    images: [{
      url: '/images/products/dior10.jpg',
      altText: 'Cuir de Nuit leather luxury fragrance bottle'
    }]
  },
  {
    name: 'Nectar de Vanille',
    description: 'A gourmand fantasy where Madagascan vanilla meets caramelized sugar and creamy tonka. This decadent fragrance is like your favorite dessert, elevated to an art form of olfactory delight.',
    price: 225.00,
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Vanilla', 'Caramel', 'Bergamot'],
      middleNotes: ['Tonka Bean', 'Heliotrope', 'Coconut'],
      baseNotes: ['Sandalwood', 'Musk', 'Amber']
    },
    size: '100ml',
    stock: 30,
    featured: false,
    rating: 4.6,
    reviewCount: 142,
    salesCount: 98,
    images: [{
      url: '/images/products/dior1.jpg', // Reusing dior1 for variety
      altText: 'Nectar de Vanille gourmand vanilla fragrance bottle'
    }]
  },
  {
    name: 'Fleur de Lys',
    description: 'The majestic lily reimagined for modern royalty. This floral masterpiece combines lily with green notes and clean musk, creating a fragrance that is both regal and effortlessly chic.',
    price: 240.00,
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Lily', 'Green Notes', 'Bergamot'],
      middleNotes: ['Jasmine', 'Tuberose', 'Ylang Ylang'],
      baseNotes: ['Musk', 'Cedar', 'Amber']
    },
    size: '100ml',
    stock: 20,
    featured: false,
    rating: 4.7,
    reviewCount: 88,
    salesCount: 61,
    images: [{
      url: '/images/products/dior2.jpg', // Reusing dior2 for variety
      altText: 'Fleur de Lys elegant floral fragrance bottle'
    }]
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany();
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log('Successfully seeded products');

    // Log product statistics
    const productCount = await Product.countDocuments();
    const featuredCount = await Product.countDocuments({ featured: true });
    const totalStock = await Product.aggregate([
      { $group: { _id: null, total: { $sum: '$stock' } } }
    ]);
    
    console.log('\n📊 Product Database Summary:');
    console.log(`Total products: ${productCount}`);
    console.log(`Featured products: ${featuredCount}`);
    console.log(`Total inventory: ${totalStock[0]?.total || 0} units`);
    
    // Log price range
    const priceStats = await Product.aggregate([
      {
        $group: {
          _id: null,
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      }
    ]);
    
    console.log(`Price range: $${priceStats[0]?.minPrice?.toFixed(2)} - $${priceStats[0]?.maxPrice?.toFixed(2)}`);
    console.log(`Average price: $${priceStats[0]?.avgPrice?.toFixed(2)}`);

    // Log categories
    const categories = await Product.distinct('category');
    console.log(`Categories: ${categories.join(', ')}`);

    console.log('\n🎉 Database seeding completed successfully!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();