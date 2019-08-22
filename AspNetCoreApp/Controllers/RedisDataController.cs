using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;

namespace AspNetCoreApp.Controllers
{
    [Route("api/[controller]")]
    public class RedisDataController : Controller
    {
        private ConnectionMultiplexer redis;

        public RedisDataController()
        {
            redis = ConnectionMultiplexer.Connect("redis");
        }

        [HttpGet("[action]")]
        public async Task<int> CurrentCount()
        {
            var db = redis.GetDatabase();

            var val = await db.StringGetAsync("count");

            if (!val.TryParse(out int count))
            {
                count = 0;
            }

            return count;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> UpdateCount(int newCount)
        {
            var db = redis.GetDatabase();

            await db.StringSetAsync("count", newCount);

            return NoContent();
        }
    }
}
