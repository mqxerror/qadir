import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed blends
  const blends = [
    {
      name: 'ASL',
      slug: 'asl',
      role: 'Authority',
      meaning: 'ASL (أصل) — Origin, Foundation. The root from which all else grows.',
      description:
        'ASL is the foundation of the QADIR collection — a fragrance that speaks before you do. Built on a base of refined oud and dry saffron, it opens with quiet confidence and deepens into a warm, resinous signature that lingers long after you\'ve left the room. This is not a fragrance that announces; it is one that remains.',
      olfactiveProfile: [
        { category: 'Top', notes: ['Dry Saffron', 'Black Pepper', 'Bergamot'], description: 'A measured opening — saffron\'s warmth tempered by the precision of black pepper and a whisper of bergamot.' },
        { category: 'Heart', notes: ['Refined Oud', 'Rose Absolute', 'Leather'], description: 'The core reveals itself slowly: oud in its most refined expression, softened by rose absolute and a subtle leather accord.' },
        { category: 'Base', notes: ['Amber Resin', 'Cedarwood', 'Musk'], description: 'The foundation settles into amber warmth, grounded by cedarwood and carried by clean musk into the hours ahead.' },
      ],
      imageUrl: '/images/blends/asl.webp',
      sortOrder: 1,
      price: 42500,
      sku: 'QADIR-ASL-50',
      inventory: 100,
      currency: 'CAD',
    },
    {
      name: 'NOOR',
      slug: 'noor',
      role: 'Light',
      meaning: 'NOOR (نور) — Light, Radiance. The illumination that reveals without overwhelming.',
      description:
        'NOOR is luminosity rendered in scent — the lightest expression in the QADIR collection, yet no less considered. Where ASL speaks through depth, NOOR communicates through clarity. A fragrance for moments that require presence without weight, confidence without heaviness.',
      olfactiveProfile: [
        { category: 'Top', notes: ['Neroli', 'Lemon Zest', 'Pink Pepper'], description: 'An immediate brightness — neroli\'s clean radiance lifted by citrus and given edge by pink pepper\'s gentle warmth.' },
        { category: 'Heart', notes: ['White Oud', 'Jasmine Sambac', 'Iris'], description: 'The heart opens into white oud\'s translucent character, woven with jasmine\'s richness and iris\'s powdery elegance.' },
        { category: 'Base', notes: ['Sandalwood', 'White Musk', 'Ambrette'], description: 'A whisper of sandalwood, clean musk, and ambrette\'s skin-like warmth create a finish that feels like light on warm skin.' },
      ],
      imageUrl: '/images/blends/noor.webp',
      sortOrder: 2,
      price: 38500,
      sku: 'QADIR-NOOR-50',
      inventory: 100,
      currency: 'CAD',
    },
    {
      name: 'HAYBA',
      slug: 'hayba',
      role: 'Presence',
      meaning: 'HAYBA (هيبة) — Awe, Commanding Respect. The quality that fills a room before a word is spoken.',
      description:
        'HAYBA is presence made tangible — a fragrance that occupies space with quiet authority. Neither loud nor subtle, it exists in the territory between: unmistakable yet never aggressive. This is the blend for rooms that notice you before you speak, for impressions that form before introductions.',
      olfactiveProfile: [
        { category: 'Top', notes: ['Cardamom', 'Incense', 'Elemi Resin'], description: 'The opening is ceremonial — cardamom\'s warmth meeting incense smoke and the bright resinous quality of elemi.' },
        { category: 'Heart', notes: ['Aged Oud', 'Amber', 'Tobacco Leaf'], description: 'At the core, aged oud in its most complex expression, enriched by warm amber and the dry, sophisticated character of tobacco leaf.' },
        { category: 'Base', notes: ['Vetiver', 'Benzoin', 'Labdanum'], description: 'The finish is deep and lasting — vetiver\'s earthy sophistication, benzoin\'s vanilla warmth, and labdanum\'s rich, honeyed resin.' },
      ],
      imageUrl: '/images/blends/hayba.webp',
      sortOrder: 3,
      price: 47500,
      sku: 'QADIR-HAYBA-50',
      inventory: 100,
      currency: 'CAD',
    },
    {
      name: 'MIQDAR',
      slug: 'miqdar',
      role: 'Depth',
      meaning: 'MIQDAR (مقدار) — Measure, Proportion. The precise calibration that transforms ingredients into art.',
      description:
        'MIQDAR is depth with precision — the most introspective blend in the QADIR collection. Where HAYBA commands attention outward, MIQDAR draws attention inward. A fragrance for contemplation, for evenings that slow down, for the quality of stillness that only careful measure can achieve.',
      olfactiveProfile: [
        { category: 'Top', notes: ['Cinnamon Bark', 'Nutmeg', 'Dark Plum'], description: 'A warm, spiced opening — cinnamon\'s depth, nutmeg\'s complexity, and the rich sweetness of dark plum creating an immediate sense of occasion.' },
        { category: 'Heart', notes: ['Oud Noir', 'Orris Root', 'Saffron Absolute'], description: 'The darkest expression of oud in the collection, balanced by orris root\'s refined earthiness and saffron absolute\'s luxurious warmth.' },
        { category: 'Base', notes: ['Mysore Sandalwood', 'Castoreum', 'Oakmoss'], description: 'A foundation of rare Mysore sandalwood, the animalic depth of castoreum, and oakmoss\'s green, forest-floor richness. The finish lasts for hours.' },
      ],
      imageUrl: '/images/blends/miqdar.webp',
      sortOrder: 4,
      price: 52500,
      sku: 'QADIR-MIQDAR-50',
      inventory: 100,
      currency: 'CAD',
    },
  ];

  for (const blend of blends) {
    await prisma.blend.upsert({
      where: { slug: blend.slug },
      update: blend,
      create: blend,
    });
  }
  console.log(`  Seeded ${blends.length} blends`);

  // Seed page content
  const pages = [
    {
      page: 'home',
      content: {
        hero: {
          headline: 'Modern perfumery rooted in oud tradition. Conceived in Montreal.',
          subtitle: 'Four Signature Blends. Each one a deliberate statement of character.',
          cta_primary: { label: 'Discover the Collection', href: '/collection' },
          cta_secondary: { label: 'Book a Consultation', href: '/appointments' },
        },
        brandStory: {
          headline: 'The House of QADIR',
          sections: [
            {
              title: 'Origin',
              body: "QADIR Montreal was founded at the intersection of two traditions: the ancient art of oud-based perfumery from the Arabian Gulf, and the modern restraint of Montreal's creative culture. The result is a fragrance house that treats scent as architecture — where every note is placed with deliberate intent, and silence between notes matters as much as the notes themselves.",
            },
            {
              title: 'Philosophy',
              body: 'We believe luxury is not decoration — it is confidence. Our four Signature Blends are not products; they are statements. Each blend carries a name rooted in Arabic, a role within the collection, and an olfactive profile designed to evolve on skin over hours. We do not chase trends. We craft permanence.',
            },
          ],
        },
        collectionPreview: {
          headline: 'The Signature Collection',
          subtitle: 'Four blends. Each one a deliberate statement.',
        },
      },
    },
    {
      page: 'about',
      content: {
        hero: {
          headline: 'About QADIR Montreal',
          subtitle: 'A fragrance house rooted in oud tradition, interpreted through modern restraint.',
        },
        origin: {
          title: 'Our Origin',
          body: "QADIR was born in Montreal — a city that understands the power of measured expression. In a market saturated with mass-produced fragrances and loud marketing, we chose a different path: restraint, precision, and the confidence to let quality speak without amplification.\n\nThe name QADIR (قدير) means 'capable' and 'powerful' in Arabic — not the power of volume, but the power of mastery. Every decision in our house reflects this principle.",
        },
        founder: {
          title: 'The Founder',
          body: "Our founder's journey began with the scent of oud in family gatherings — raw, uncompromising, impossibly rich. Years later, surrounded by Montreal's minimalist design culture, a question formed: what happens when you apply restraint to one of the world's most complex fragrance traditions?\n\nThe answer is QADIR. Four Signature Blends that honour oud tradition while speaking the language of modern luxury.",
        },
        philosophy: {
          title: 'Our Philosophy',
          body: 'Luxury is not decoration. It is the confidence to present less, knowing that what remains is exceptional. Our fragrances are conceived as a collection — not individual products competing for attention, but four voices in deliberate conversation.\n\nASL speaks authority. NOOR illuminates. HAYBA commands presence. MIQDAR provides depth. Together, they represent a complete olfactive philosophy.',
        },
      },
    },
  ];

  for (const page of pages) {
    await prisma.pageContent.upsert({
      where: { page: page.page },
      update: { content: page.content },
      create: page,
    });
  }
  console.log(`  Seeded ${pages.length} page contents`);

  // Seed admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@qadir.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      passwordHash,
      role: 'admin',
    },
  });
  console.log(`  Seeded admin user: ${adminEmail}`);

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
