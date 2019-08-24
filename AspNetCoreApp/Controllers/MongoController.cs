
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace AspNetCoreApp.Controllers
{
    [Route("api/[controller]")]
    public class MongoDataController : Controller
    {
        private IMongoDatabase database;
        private MongoClient client;

        public MongoDataController()
        {
            client = new MongoClient("mongodb://mongodb:27017");
            database = client.GetDatabase("Main");
            //BsonClassMap.RegisterClassMap<Person>(cm =>
            //{
            //    cm.AutoMap();
            //});
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<Person>> RetrieveTable()
        {
            try
            {
                var collection = database.GetCollection<BsonDocument>("People");
                var documents = await collection.Find(new BsonDocument()).ToListAsync();

                List<Person> result = documents.ConvertAll(bsonObject => BsonSerializer.Deserialize<Person>(bsonObject));

                if (result.Count == 0)
                {
                    result.Add(new Person
                    {
                        Name = "Empty Example",
                        Age = 32,
                        Location = "Austin",
                        Sex = "M"
                    });
                }

                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddPerson([FromForm] Person data)
        {
            var collection = database.GetCollection<Person>("People");
            await collection.InsertOneAsync(data);

            return Ok();
        }


        public class Person
        {
            [BsonId]
            public ObjectId id { get; set; }

            [BsonElement("name")]
            public string Name { get; set; }

            [BsonElement("age")]
            public int Age { get; set; }

            [BsonElement("sex")]
            public string Sex { get; set; }

            [BsonElement("location")]
            public string Location { get; set; }
        }
    }
}
