const {
  AuthenticationError,
  UserInputError,
} = require('apollo-server-express');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const sgMail = require('@sendgrid/mail');
const {
  User, Item, Category, Order,
} = require('../models');
const { signToken } = require('../utils/auth');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const resolvers = {
  Query: {
    categories: () => Category.find(),
    items: (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return Item.find(params).populate('category');
    },
    item: (parent, { _id }) => Item.findById(_id).populate('category'),
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.items',
          populate: 'category',
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.items',
          populate: 'category',
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ items: args.items });
      const { items } = await order.populate('items').execPopulate();
      const line_items = [];

      for (let i = 0; i < items.length; i += 1) {
        // generate item id
        const item = await stripe.items.create({
          name: items[i].name,
          description: items[i].description,
          images: [`${url}/images/${items[i].image}`],
        });

        // generate price id using the item id
        const price = await stripe.prices.create({
          item: item.id,
          unit_amount: items[i].price * 100,
          currency: 'usd',
        });

        // add price id to the line items array
        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { items }, context) => {
      if (context.user) {
        const order = new Order({ items });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateItem: (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return Item.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true },
      );
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    sendContactEmail: async (parent, { from, name, text }) => {
      try {
        await sgMail.send({
          to: process.env.CONTACT_EMAIL,
          from: process.env.CONTACT_EMAIL,
          subject: `Contact request - ${name}, ${new Date()}, ${from}`,
          text,
          html: `<a href="mailto:${from}>${from}</a>`,
        });
        return 'We have received your message.';
      } catch (error) {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
        throw new UserInputError(error.message);
      }
    },
  },
};

module.exports = resolvers;
