const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = [
  {
    username: 'SamMina',
    email: 'sammina@example.com',
    password: 'password123',
  },
  {
    username: 'BruceWayne',
    email: 'brucewayne@example.com',
    password: 'password123',
  },
  {
    username: 'ClarkKent',
    email: 'clarkkent@example.com',
    password: 'password123',
  },
];

const postData = [
  {
    title: 'How computers would help Batman do his job today.',
    content: 'In todays world, Batman would heavily rely on advanced computing technology, AI, and data analytics to solve crimes faster and more efficiently.',
    user_id: 1,
  },
  {
    title: 'Communicating with space aliens: How math is the universal language.',
    content: 'Mathematics is the one language that could bridge the gap between humans and extraterrestrial beings. This post explores the concepts behind using math to communicate.',
    user_id: 2,
  },
  {
    title: 'RESTful API vs GraphQL: The pros and cons.',
    content: 'Both RESTful APIs and GraphQL have their strengths and weaknesses. This post discusses the differences, benefits, and drawbacks of each approach.',
    user_id: 3,
  },
];

const commentData = [
  {
    content: 'Amazing insights on how technology can assist Batman!',
    user_id: 2,
    post_id: 1,
  },
  {
    content: 'Math truly is the key to understanding the universe. Great post!',
    user_id: 3,
    post_id: 2,
  },
  {
    content: 'This comparison was very helpful. Thanks for breaking it down!',
    user_id: 1,
    post_id: 3,
  },
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postData);
  await Comment.bulkCreate(commentData);

  console.log('Database successfully seeded!');
  process.exit(0);
};

seedDatabase();
