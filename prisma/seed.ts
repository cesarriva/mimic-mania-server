import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await seedUsers();
  await seedWordsAndCategories();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error while seeding database: ", e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function seedUsers() {
  const proUser = await prisma.user.upsert({
    where: { email: "cesar.pro@gmail.com" },
    update: {},
    create: {
      email: "cesar.pro@gmail.com",
      name: "Cesar",
      password: "$2a$10$N7rVIhh4IRG.QYpqrayXjOKwde7mTrufcUVEHYII.MerRsK01kYC2",
      proUser: true,
    },
  });

  const regularUser = await prisma.user.upsert({
    where: { email: "cesar.regular@gmail.com" },
    update: {},
    create: {
      email: "cesar.regular@gmail.com",
      name: "Cesar",
      password: "$2a$10$N7rVIhh4IRG.QYpqrayXjOKwde7mTrufcUVEHYII.MerRsK01kYC2",
      proUser: false,
    },
  });

  console.log("seeding users ", { proUser, regularUser });
}

async function seedWordsAndCategories() {
  const actionsCategory = await prisma.wordCategory.upsert({
    where: { name: "Actions" },
    update: {},
    create: {
      name: "Actions",
      description: "Description for the actions category",
      isProCategory: false,
      words: {
        create: [
          { name: "Run" },
          { name: "Walk" },
          { name: "Jump" },
          { name: "Swim" },
          { name: "Climb" },
          { name: "Fly" },
          { name: "Drive" },
          { name: "Ride" },
          { name: "Sail" },
          { name: "Ski" },
          { name: "Skate" },
          { name: "Surf" },
          { name: "Dance" },
          { name: "Sing" },
          { name: "Play" },
          { name: "Read" },
          { name: "Write" },
          { name: "Draw" },
          { name: "Paint" },
          { name: "Cook" },
          { name: "Eat" },
        ],
      },
    },
  });

  const leisureCategory = await prisma.wordCategory.upsert({
    where: { name: "Leisure" },
    update: {},
    create: {
      name: "Leisure",
      description: "Description for the leisure category",
      isProCategory: false,
      words: {
        create: [
          { name: "Watch TV" },
          { name: "Watch a movie" },
          { name: "Watch a play" },
          { name: "Watch a concert" },
          { name: "Watch a game" },
          { name: "Play a game" },
          { name: "Play soccer" },
          { name: "Play basketball" },
          { name: "Play tennis" },
          { name: "Read a book" },
          { name: "Read a magazine" },
        ],
      },
    },
  });

  const objectsCategory = await prisma.wordCategory.upsert({
    where: { name: "Objects" },
    update: {},
    create: {
      name: "Objects",
      description: "Description for the objects category",
      isProCategory: false,
      words: {
        create: [
          { name: "Car" },
          { name: "Truck" },
          { name: "Motorcycle" },
          { name: "Bicycle" },
          { name: "Boat" },
          { name: "Airplane" },
          { name: "Helicopter" },
          { name: "Train" },
          { name: "Bus" },
          { name: "Table" },
          { name: "Chair" },
          { name: "Bed" },
          { name: "Couch" },
          { name: "Lamp" },
          { name: "Computer" },
          { name: "Phone" },
          { name: "Television" },
          { name: "Radio" },
          { name: "Headphones" },
          { name: "Toothbrush" },
          { name: "Toothpaste" },
          { name: "Soap" },
          { name: "Shampoo" },
        ],
      },
    },
  });

  const peopleCategory = await prisma.wordCategory.upsert({
    where: { name: "People" },
    update: {},
    create: {
      name: "People",
      description: "Description for the people category",
      isProCategory: false,
      words: {
        create: [
          { name: "Leonardo da Vinci" },
          { name: "Albert Einstein" },
          { name: "Isaac Newton" },
          { name: "Messi" },
          { name: "Cristiano Ronaldo" },
          { name: "Michael Jordan" },
          { name: "Muhammad Ali" },
          { name: "Will Smith" },
          { name: "Tom Cruise" },
          { name: "Brad Pitt" },
          { name: "Angelina Jolie" },
          { name: "Neo" },
          { name: "Trinity" },
          { name: "Morpheus" },
          { name: "Samurai" },
          { name: "Ninja" },
        ],
      },
    },
  });

  const difficultCategory = await prisma.wordCategory.upsert({
    where: { name: "Difficult" },
    update: {},
    create: {
      name: "Difficult",
      description: "Description for the difficult category",
      isProCategory: true,
      words: {
        create: [
          { name: "Chandelier" },
          { name: "Cinnamon" },
          { name: "Cemetery" },
          { name: "Conscience" },
          { name: "Definitely" },
          { name: "Embarrass" },
          { name: "Neurosurgeon" },
          { name: "Pharaoh" },
          { name: "Questionnaire" },
          { name: "Rhythm" },
          { name: "Illusionist" },
          { name: "Archaeologist" },
          { name: "Entrepreneur" },
          { name: "Parkour" },
          { name: "Paragraph" },
        ],
      },
    },
  });

  const mixCategory = await prisma.wordCategory.upsert({
    where: { name: "Mix" },
    update: {},
    create: {
      name: "Mix",
      description: "Description for the mix category",
      isProCategory: true,
      words: {
        create: [],
      },
    },
  });

  console.log("seeding words & categories ", {
    actionsCategory,
    leisureCategory,
    objectsCategory,
    peopleCategory,
    difficultCategory,
    mixCategory
  });
}
