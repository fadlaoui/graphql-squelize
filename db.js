import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';
const Connection = new Sequelize(
  'relay',
  'mohamed',
  '',
    {
      dialect : 'postgres',
      host : 'localhost'
    }
);


const Person = Connection.define('person',{
  firstName : {
    type : Sequelize.STRING,
    allowNull:false
  },
  lastName : {
    type : Sequelize.STRING,
    allowNull:false
  },
  email : {
    type : Sequelize.STRING,
    allowNull:false,
    validate:{
      isEmail: true
    }
  }
});

const Post = Connection.define('post',{
  title : {
    type : Sequelize.STRING,
    allowNull:false,
  },
  content : {
    type : Sequelize.STRING,
    allowNull:false
  }
});

Person.hasMany(Post);
Post.belongsTo(Person);


// Openning connection
Connection.sync({force:true })
  .then( () => {
              _.times(10,()=> {
                return Person.create({
                  firstName : Faker.name.firstName(),
                  lastName :  Faker.name.lastName(),
                  email : Faker.internet.email()
                })
              })
            }
      );

export default Connection;
