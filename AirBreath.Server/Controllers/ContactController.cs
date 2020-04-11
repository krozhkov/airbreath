using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AirBreath.Server.Models;
using System.Threading.Tasks;
using AirBreath.Server.Database;

namespace AirBreath.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ContactsController : Controller
    {
        private readonly IDbContext _context;

        public ContactsController(IDbContext context)
        {
            _context = context;
        }

        // GET api/contacts
        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            return _context.Set<Contact>().OrderBy((o) => o.LastName);
        }

        // GET api/contacts/5
        [HttpGet("{id}", Name = "GetContact")]
        public Contact Get(int id)
        {
            return _context.Find<Contact>(id);
        }

        // GET api/contacts/?=
        [HttpGet("search")]
        public IEnumerable<Contact> Search(string q)
        {
            return _context.Set<Contact>().
                Where((c) => c.LastName.ToLower().Contains(q.ToLower()) || c.FirstName.ToLower().Contains(q.ToLower())).
                OrderBy((o) => o.LastName);
        }

        // POST api/contacts
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Contact model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Add(model);
            await _context.SaveChangesAsync();
            return CreatedAtRoute("GetContact", new { id = model.Id }, model);
        }

        // PUT api/contacts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]Contact model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            model.Id = id;
            _context.Update(model);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // DELETE api/contacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            _context.Delete<Contact>(id);

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
