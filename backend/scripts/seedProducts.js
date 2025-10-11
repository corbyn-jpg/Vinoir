const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const products = [
  {
    name: 'Noir Essence',
    description: 'A sophisticated blend of dark woods, amber, and subtle spices. This captivating fragrance evokes mystery and elegance with its deep, complex character.',
    price: 245.00,
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Bergamot', 'Black Pepper', 'Cardamom'],
      middleNotes: ['Oud', 'Rose', 'Cedarwood'],
      baseNotes: ['Amber', 'Leather', 'Vanilla']
    },
    size: '100ml',
    stock: 25,
    featured: true,
    rating: 4.8,
    reviewCount: 142,
    salesCount: 89,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750285070/dior1_s2qxso.jpg',
      altText: 'Noir Essence luxury fragrance bottle'
    }]
  },
  {
    name: "Lumière d'Or",
    description: 'Radiant golden citrus notes dance with delicate white flowers in this luminous fragrance that captures the essence of sunlight and luxury.',
    price: 180.00,
    category: 'Eau de Toilette',
    fragranceNotes: {
      topNotes: ['Bergamot', 'Mandarin', 'Neroli'],
      middleNotes: ['Jasmine', 'Orange Blossom', 'Ylang Ylang'],
      baseNotes: ['Musk', 'Amberwood', 'White Cedar']
    },
    size: '100ml',
    stock: 32,
    featured: true,
    rating: 4.6,
    reviewCount: 98,
    salesCount: 67,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750284849/dior2_g5aq9q.jpg',
      altText: 'Lumière d\'Or elegant perfume bottle'
    }]
  },
  {
    name: 'Velvet Rose',
    description: 'Luxurious rose petals blended with creamy vanilla and soft musk create a romantic, timeless fragrance that feels like wearing velvet.',
    price: 220.00,
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Turkish Rose', 'Peony', 'Pink Pepper'],
      middleNotes: ['Damask Rose', 'Violet', 'Orris'],
      baseNotes: ['Vanilla', 'Sandalwood', 'White Musk']
    },
    size: '100ml',
    stock: 18,
    featured: false,
    rating: 4.7,
    reviewCount: 76,
    salesCount: 45,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750441644/dior4_sejvq4.jpg',
      altText: 'Velvet Rose floral perfume bottle'
    }]
  },
  {
    name: 'Oud Royal',
    description: 'Regal and intense, this fragrance combines precious oud with rich spices and smoky woods for a truly majestic olfactory experience.',
    price: 320.00,
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Saffron', 'Cinnamon', 'Bergamot'],
      middleNotes: ['Oud', 'Rose', 'Patchouli'],
      baseNotes: ['Agarwood', 'Leather', 'Amber']
    },
    size: '100ml',
    stock: 12,
    featured: true,
    rating: 4.9,
    reviewCount: 54,
    salesCount: 28,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750338278/dior6_trw6e5.jpg',
      altText: 'Oud Royal luxury fragrance bottle'
    }]
  },
  {
    name: 'Amber Mystique',
    description: 'Warm amber notes wrapped in oriental spices and creamy vanilla create a mysterious and sensual fragrance that lingers beautifully.',
    price: 195.00,
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Amber', 'Incense', 'Cardamom'],
      middleNotes: ['Vanilla', 'Tonka Bean', 'Heliotrope'],
      baseNotes: ['Benzoin', 'Labdanum', 'Musk']
    },
    size: '100ml',
    stock: 22,
    featured: false,
    rating: 4.5,
    reviewCount: 63,
    salesCount: 38,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750442464/dior13_zxe3sn.jpg',
      altText: 'Amber Mystique warm fragrance bottle'
    }]
  },
  {
    name: 'Citrus Bloom',
    description: 'A vibrant burst of citrus fruits meets delicate spring flowers in this fresh, uplifting fragrance perfect for everyday wear.',
    price: 165.00,
    category: 'Eau de Toilette',
    fragranceNotes: {
      topNotes: ['Grapefruit', 'Lemon', 'Bergamot'],
      middleNotes: ['Magnolia', 'Lily of the Valley', 'Jasmine'],
      baseNotes: ['Cedar', 'Musk', 'Amber']
    },
    size: '100ml',
    stock: 28,
    featured: false,
    rating: 4.4,
    reviewCount: 87,
    salesCount: 52,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750442354/dior12_moclfw.jpg',
      altText: 'Citrus Bloom fresh fragrance bottle'
    }]
  },
  {
    name: 'Sandalwood Whisper',
    description: 'Creamy sandalwood harmonizes with soft iris and warm musk in this subtle, sophisticated fragrance that whispers rather than shouts.',
    price: 235.00,
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Sandalwood', 'Bergamot', 'Neroli'],
      middleNotes: ['Iris', 'Violet', 'Orris Butter'],
      baseNotes: ['Musk', 'Tonka Bean', 'Amber']
    },
    size: '100ml',
    stock: 15,
    featured: false,
    rating: 4.6,
    reviewCount: 45,
    salesCount: 31,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750338252/dior8_vgcqgi.jpg',
      altText: 'Sandalwood Whisper woody fragrance bottle'
    }]
  },
  {
    name: 'Patchouli Dream',
    description: 'Earthy patchouli is elevated with rose and vanilla in this dreamy, bohemian-inspired fragrance that transports you to another realm.',
    price: 210.00,
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Patchouli', 'Bergamot', 'Black Currant'],
      middleNotes: ['Rose', 'Geranium', 'Cacao'],
      baseNotes: ['Vanilla', 'Amber', 'Musk']
    },
    size: '100ml',
    stock: 20,
    featured: false,
    rating: 4.7,
    reviewCount: 58,
    salesCount: 42,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750441791/dior0_hs7dgd.jpg',
      altText: 'Patchouli Dream earthy fragrance bottle'
    }]
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany();
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log('Successfully seeded products');

    // Log product counts
    const productCount = await Product.countDocuments();
    const featuredCount = await Product.countDocuments({ featured: true });
    
    console.log(`Total products: ${productCount}`);
    console.log(`Featured products: ${featuredCount}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();