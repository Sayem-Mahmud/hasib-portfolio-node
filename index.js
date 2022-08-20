const express = require('express');// 1st step
const app = express();// 2nd step
const port = process.env.port || 5000; //3rd step
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;

//cors express middlewire .....using for browser 3000 and 5000/... url cross handling 
app.use(cors())

//express.json() middilewire er kaj hocche stringify er data k json er datai auto updated rakha 
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.57mpq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri)


//Mongodb system

// client.connect(err => {
//     const collection = client.db("foodMaster").collection("users");
//     // perform actions on the collection object
//     console.log('Hitting the database')
//     const user = { name: 'Sayem Mahmud', email: 'sayem.mahmud97@gmail.com', phone: '01626909723' };
//     collection.insertOne(user)
//         .then(() => {
//             console.log('insert success')
//         })
//     // console.error(err);
//     // client.close();
// });



// mongodb system with node(alternative) url link: https://docs.mongodb.com/drivers/node/current/usage-examples/insertOne/ 
async function run() {
    try {
        await client.connect();
        console.log('database connected successfully');
        const database = client.db("hasib_portfolio");
        const portfolioCollection = database.collection("portfolios");
        const blogCollection = database.collection("blogs");
        const otherCollection = database.collection("others");

        //Get API
        //https://docs.mongodb.com/drivers/node/current/usage-examples/find/
        app.get('/portfolios', async (req, res) => {
            const cursor = portfolioCollection.find({});
            const portfolios = await cursor.toArray();
            res.send(portfolios);
        })

        //post single portfolio
        app.post('/portfolio', async (req, res) => {
            const newUser = req.body;
            const result = await portfolioCollection.insertOne(newUser);
            console.log('Got new portfolio', req.body);
            console.log('added portfolio', result);
            res.json(result);
        });

        //find single portfolio
        app.get('/portfolio/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const portfolio = await portfolioCollection.findOne(query);
            console.log('load user with id: ', id);
            console.log(portfolio);
            res.send(portfolio);
        })


        //update single portfolio
        app.put('/portfolio/:id', async (req, res) => {
            const id = req.params.id;
            const updatedPortfolio = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true }; //optional dile hobe na dileo hbe..upsert(update & insert mile upsert hoise works for update hole id dhore update hbe nahoi oi id dhore nahoi inser kore dibe)..module(64_5-2)
            const updateDoc = {
                $set: {
                    title: updatedPortfolio.title,
                    role: updatedPortfolio.role,
                    img1: updatedPortfolio.img1,
                    description1: updatedPortfolio.description1,
                    description1bold: updatedPortfolio.description1bold,
                    img2: updatedPortfolio.img2,
                    description2: updatedPortfolio.description2,
                    description2bold: updatedPortfolio.description2bold,
                    img3: updatedPortfolio.img3,
                    description3: updatedPortfolio.description3,
                    description3bold: updatedPortfolio.description3bold,
                    img4: updatedPortfolio.img4,
                    description4: updatedPortfolio.description4,
                    description4bold: updatedPortfolio.description4bold,
                    img5: updatedPortfolio.img5,
                    description5: updatedPortfolio.description5,
                    description5bold: updatedPortfolio.description5bold,
                    img6: updatedPortfolio.img6,
                    description6: updatedPortfolio.description6,
                    description6bold: updatedPortfolio.description6bold,
                    img7: updatedPortfolio.img7,
                    description7: updatedPortfolio.description7,
                    description7bold: updatedPortfolio.description7bold,
                    img8: updatedPortfolio.img8,
                    description8: updatedPortfolio.description8,
                    description8bold: updatedPortfolio.description8bold
                },
            };
            const result = await portfolioCollection.updateOne(filter, updateDoc, options)
            console.log('updating user', result); 
            res.json(result);
        })


        app.get('/blogs', async (req, res) => {
            const cursor = blogCollection.find({});
            const blogs = await cursor.toArray();
            res.send(blogs);
        })

          //post single blog
          app.post('/blog', async (req, res) => {
            const newUser = req.body;
            const result = await blogCollection.insertOne(newUser);
            console.log('Got new blog', req.body);
            console.log('added blog', result);
            res.json(result);
        });

        //find single blog
        app.get('/blog/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const blog = await blogCollection.findOne(query);
            console.log('load user with id: ', id);
            console.log(blog);
            res.send(blog); 
        })

        //update single blog
        app.put('/blog/:id', async (req, res) => {
            const id = req.params.id;
            const updatedBlog = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true }; //optional dile hobe na dileo hbe..upsert(update & insert mile upsert hoise works for update hole id dhore update hbe nahoi oi id dhore nahoi inser kore dibe)..module(64_5-2)
            const updateDoc = {
                $set: {
                    title: updatedBlog.title,
                    date: updatedBlog.date,
                    img1: updatedBlog.img1,
                    article1: updatedBlog.article1,
                    article1bold: updatedBlog.article1bold,
                    img2: updatedBlog.img2,
                    article2: updatedBlog.article2,
                    article2bold: updatedBlog.article2bold,
                    img3: updatedBlog.img3,
                    article3: updatedBlog.article3,
                    article3bold: updatedBlog.article3bold,
                    img4: updatedBlog.img4,
                    article4: updatedBlog.article4,
                    article4bold: updatedBlog.article4bold,
                    img5: updatedBlog.img5,
                    article5: updatedBlog.article5,
                    article5bold: updatedBlog.article5bold,
                    img6: updatedBlog.img6,
                    article6: updatedBlog.article6,
                    article6bold: updatedBlog.article6bold,
                    img7: updatedBlog.img7,
                    article7: updatedBlog.article7,
                    article7bold: updatedBlog.article7bold,
                    img8: updatedBlog.img8,
                    article8: updatedBlog.article8,
                    article8bold: updatedBlog.article8bold
                },
            };
            const result = await blogCollection.updateOne(filter, updateDoc, options)
            console.log('updating user', result);
            res.json(result);
        })

        //get all others

        app.get('/others', async (req, res) => {
            const cursor = otherCollection.find({});
            const others = await cursor.toArray();
            res.send(others);
        })


         //update other
         app.put('/other/:id', async (req, res) => {
            const id = req.params.id;
            const updatedOther = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true }; //optional dile hobe na dileo hbe..upsert(update & insert mile upsert hoise works for update hole id dhore update hbe nahoi oi id dhore nahoi inser kore dibe)..module(64_5-2)
            const updateDoc = {
                $set: {
                    name: updatedOther.name,
                    headerImage: updatedOther.headerImage,
                    aboutSite: updatedOther. aboutSite,
                    aboutMeImage: updatedOther.aboutMeImage,
                    aboutMe1stPara: updatedOther.aboutMe1stPara,
                    aboutMe2ndPara: updatedOther.aboutMe2ndPara,
                    downloadCv: updatedOther.downloadCv,
                    email: updatedOther.email,
                    phone: updatedOther.phone,
                    fax: updatedOther.fax,
                    facebookLink: updatedOther.facebookLink,
                    twitterLink: updatedOther.twitterLink,
                    instagramLink: updatedOther.instagramLink,
                    linkedinLink: updatedOther.linkedinLink,
                    
                },
            };
            const result = await otherCollection.updateOne(filter, updateDoc, options)
            console.log('updating other', result);
            res.json(result);
        })


        //get single element details from database by id.....url: https://docs.mongodb.com/drivers/node/current/usage-examples/findOne/


        // app.get('/users/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) }
        //     const user = await usersCollection.findOne(query);
        //     console.log('load user with id: ', id);
        //     res.send(user);
        // })


        //post api


        app.post('/blogs', async (req, res) => {
            const newBlog = req.body;
            const result = await blogCollection.insertOne(newBlog);
            console.log('Got new blog', req.body);
            console.log('added blog', result);
            // res.send(JSON.stringify(result)) 

            //alternative of stringify kore posting....  res.send(JSON.stringify(newUser)) & post jehetu pura  result tak json hishebe client side e pathno jabe
            res.json(result);
        });

        app.post('/portfolios', async (req, res) => {
            const newPortfolio = req.body;
            const result = await portfolioCollection.insertOne(newPortfolio);
            console.log('Got new portfolio', req.body);
            console.log('added portfolio', result);
            // res.send(JSON.stringify(result)) 

            //alternative of stringify kore posting....  res.send(JSON.stringify(newUser)) & post jehetu pura  result tak json hishebe client side e pathno jabe
            res.json(result);
        });

        //update api (presents here in mongodb by PUT)...url.. https://docs.mongodb.com/drivers/node/current/usage-examples/updateOne/


        // app.put('/users/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const updatedUser = req.body;
        //     const filter = { _id: ObjectId(id) }
        //     const options = { upsert: true }; //optional dile hobe na dileo hbe..upsert(update & insert mile upsert hoise works for update hole id dhore update hbe nahoi oi id dhore nahoi inser kore dibe)..module(64_5-2)
        //     const updateDoc = {
        //         $set: {
        //             name: updatedUser.name,
        //             email: updatedUser.email
        //         },
        //     };
        //     const result = await usersCollection.updateOne(filter, updateDoc, options)
        //     console.log('updating user', req);
        //     res.json(result);
        // })

        //Delete API
        //https://docs.mongodb.com/drivers/node/current/usage-examples/deleteOne/


        app.delete('/blogs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await blogCollection.deleteOne(query);
            console.log('Deleting blog with id', result);

            res.json(result);
        })
        app.delete('/portfolios/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await portfolioCollection.deleteOne(query);
            console.log('Deleting portfolio with id', result);

            res.json(result);
        })


        // // create a document to insert
        // const doc = {
        //     name: "brand new user",
        //     email: "user@gmail.com",
        // }
        // const result = await usersCollection.insertOne(doc);
        // console.log(`A document was inserted with the _id: ${result.insertedId}`);
        // console.log(result);

    } finally {
        // await client.close();
    }
}
run().catch(console.dir); //error catch only aync function e possible



app.get('/', (req, res) => {
    res.send('Running hasib_portfolio services') //4th step
})

app.listen(port, () => {//5th step
    console.log('Running Server on Port', port);
})