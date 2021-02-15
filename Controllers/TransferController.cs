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
    public class TransferController : ControllerBase
    {
        private readonly AppDBContext _context;

        public TransferController(AppDBContext context)
        {
            _context = context;
        }

        // GET: api/Transfer
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transfer>>> GetTransfers()
        {
            return await _context.Transfers.ToListAsync();
        }

        // GET: api/Transfer/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transfer>> GetTransfer(long id)
        {
            var transfer = await _context.Transfers.FindAsync(id);

            if (transfer == null)
            {
                return NotFound();
            }

            return transfer;
        }

        // PUT: api/Transfer/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransfer(long id, Transfer transfer)
        {
            if (id != transfer.id)
            {
                return BadRequest();
            }

            _context.Entry(transfer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransferExists(id))
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

        // POST: api/Transfer
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Transfer>> PostTransfer(Transfer transfer)
        {
            _context.Transfers.Add(transfer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransfer", new { id = transfer.id }, transfer);
        }

        // DELETE: api/Transfer/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransfer(long id)
        {
            var transfer = await _context.Transfers.FindAsync(id);
            if (transfer == null)
            {
                return NotFound();
            }

            _context.Transfers.Remove(transfer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TransferExists(long id)
        {
            return _context.Transfers.Any(e => e.id == id);
        }
    }
}
