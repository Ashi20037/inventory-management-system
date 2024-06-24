


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.set('strictQuery', false);
// mongoose.connect('mongodb://127.0.0.1:27017/invent', { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err) => {
//   console.error('Error connecting to MongoDB:', err);
// });

// app.use('/api/auth', authRoutes);

// const inventorySchema = new mongoose.Schema({
//   Item_Name: String,
//   Price: String,
//   Quantity: String,
//   Date: String,
//   Sold: String
// });

// const Inventory = mongoose.model('inventory', inventorySchema);  // Ensure 'inventory' is the correct collection name

// app.get('/IMS', (req, res) => {
//   Inventory.find({}, (err, foundItems) => {
//     if (!err) {
//       res.send(foundItems);
//     } else {
//       console.error(err);
//       res.status(500).send(err);
//     }
//   });
// });

// app.post('/insert', (req, res) => {
//   const { Item_Name, Price, Quantity, Date, Sold } = req.body.data;
//   const newItem = new Inventory({
//     Item_Name,
//     Price,
//     Quantity,
//     Date,
//     Sold
//   });

//   newItem.save((err) => {
//     if (!err) {
//       res.send('Successfully added a new item.');
//       console.log("Successfully added a new item.");
//     } else {
//       console.error(err);
//       res.status(500).send(err);
//     }
//   });
// });

// app.delete('/IMS/:id', (req, res) => {
//   const id = req.params.id;

//   Inventory.findByIdAndRemove(id, (err) => {
//     if (!err) {
//       console.log('Successfully deleted item.');
//       res.send('Successfully deleted item.');
//     } else {
//       console.error(err);
//       res.status(500).send(err);
//     }
//   });
// });

// app.put('/IMS/:id', (req, res) => {
//   const { Item_Name, Price, Quantity, Date, Sold } = req.body.data;
//   const id = req.params.id;

//   Inventory.findByIdAndUpdate(
//     id,
//     { Item_Name, Price, Quantity, Date, Sold },
//     { new: true },
//     (err, result) => {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         console.log('IMS data updated successfully!');
//         res.status(200).send('IMS data updated successfully!');
//       }
//     }
//   );
// });

// // Login endpoint
// app.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   // Here you would typically query your database to check if the user exists and the password is correct
//   // For simplicity, let's just assume the login is successful if email and password are provided
//   if (email && password) {
//     res.status(200).json({ message: 'Login successful' });
//   } else {
//     res.status(400).json({ error: 'Invalid credentials' });
//   }
// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });









const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}' - Body: `, req.body);
  next();
});

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/final_invent', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
const User = mongoose.model('user', userSchema);

const inventorySchema = new mongoose.Schema({
  Item_Name: String,
  Price: String,
  Quantity: String,
  Date: String,
  Sold: String
});

const Inventory = mongoose.model('inventory', inventorySchema);

app.get('/IMS', (req, res) => {
  Inventory.find({}, (err, foundItems) => {
    if (!err) {
      res.send(foundItems);
    } else {
      console.error(err);
      res.status(500).send(err);
    }
  });
});

app.post('/insert', (req, res) => {
  const { Item_Name, Price, Quantity, Date, Sold } = req.body; // Directly access req.body

  if (!Item_Name || !Price || !Quantity || !Date || !Sold) {
    return res.status(400).send('All fields are required');
  }

  const newItem = new Inventory({
    Item_Name,
    Price,
    Quantity,
    Date,
    Sold
  });

  newItem.save((err) => {
    if (!err) {
      console.log('Successfully added a new item.');
      res.status(201).send('Successfully added a new item.');
    } else {
      console.error('Error inserting item:', err);
      res.status(500).send('Error inserting item');
    }
  });
});

app.delete('/IMS/:id', (req, res) => {
  const id = req.params.id;

  Inventory.findByIdAndRemove(id, (err) => {
    if (!err) {
      console.log('Successfully deleted item.');
      res.send('Successfully deleted item.');
    } else {
      console.error(err);
      res.status(500).send(err);
    }
  });
});

app.put('/IMS/:id', (req, res) => {
  const { Item_Name, Price, Quantity, Date, Sold } = req.body;
  const id = req.params.id;

  Inventory.findByIdAndUpdate(
    id,
    { Item_Name, Price, Quantity, Date, Sold },
    { new: true },
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        console.log('IMS data updated successfully!');
        res.status(200).send('IMS data updated successfully!');
      }
    }
  );
});

// Sign up route
app.post('/api/auth/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User created successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});







//-======================================

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes'); // Ensure correct path to authRoutes

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.set('strictQuery', false);
// mongoose.connect('mongodb://127.0.0.1:27017/invent', { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err) => {
//   console.error('Error connecting to MongoDB:', err);
// });



// // Use auth routes
// app.use('/api/auth', authRoutes);

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes'); // Ensure correct path to authRoutes

// const app = express();
// app.use(express.json()); // Middleware to parse JSON requests
// app.use(cors());

// mongoose.set('strictQuery', false);
// mongoose.connect('mongodb://localhost:27017/ims1', { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err) => {
//   console.error('Error connecting to MongoDB:', err);
// });

// // Use auth routes
// app.use('/api/auth', authRoutes);

// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });