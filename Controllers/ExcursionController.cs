using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tourism.Models;

namespace tourism.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExcursionController : ControllerBase
    {
        private readonly AppDBContext _context;

        public ExcursionController(AppDBContext context)
        {
            _context = context;
        }

        // GET: api/Excursion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Excursion>>> GetExcursion()
        {
            return await _context.Excursion.ToListAsync();
        }

        // GET: api/Excursion/5
        [HttpGet("{fk}")]
        public async Task<List<Excursion>> GetTransfer(long fk)
        {
            var excursions = from s in _context.Excursion select s;

            excursions = excursions.Where(s => s.PackageId == fk);


            if (excursions == null)
            {
                return null;
            }

            return await excursions.ToListAsync();
        }

        // PUT: api/Excursion/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExcursion(long id, Excursion excursion)
        {
            if (id != excursion.id)
            {
                return BadRequest();
            }

            _context.Entry(excursion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExcursionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Excursion
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Excursion>> PostExcursion(Excursion excursion)
        {
            _context.Excursion.Add(excursion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExcursion", new { id = excursion.id }, excursion);
        }

        // DELETE: api/Excursion/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExcursion(long id)
        {
            var excursion = await _context.Excursion.FindAsync(id);
            if (excursion == null)
            {
                return NotFound();
            }

            _context.Excursion.Remove(excursion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ExcursionExists(long id)
        {
            return _context.Excursion.Any(e => e.id == id);
        }
    }
}
