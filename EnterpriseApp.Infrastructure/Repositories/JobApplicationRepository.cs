using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EnterpriseApp.Application.Interfaces;
using EnterpriseApp.Domain.Entities;
using EnterpriseApp.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EnterpriseApp.Infrastructure.Repositories;

public class JobApplicationRepository : IJobApplicationRepository
{
    private readonly ApplicationDbContext _context;

    public JobApplicationRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<JobApplication>> GetAllAsync()
    {
        // We use .AsNoTracking() for read-only lists (Faster performance)
        return await _context.JobApplications
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<JobApplication?> GetByIdAsync(Guid id)
    {
        return await _context.JobApplications
            .Include(j => j.Notes) // Eagerly load the notes
            .FirstOrDefaultAsync(j => j.Id == id);
    }

    public async Task<Guid> AddAsync(JobApplication entity)
    {
        await _context.JobApplications.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity.Id;
    }

    public async Task UpdateAsync(JobApplication entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
        // Don't modify the CreatedAt date
        _context.Entry(entity).Property(x => x.AppliedAt).IsModified = false;
        
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.JobApplications.FindAsync(id);
        if (entity != null)
        {
            _context.JobApplications.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}