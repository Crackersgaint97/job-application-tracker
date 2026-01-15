using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EnterpriseApp.Domain.Entities;

namespace EnterpriseApp.Application.Interfaces;

public interface IJobApplicationRepository
{
    // The contract: We promise these methods will exist
    Task<IEnumerable<JobApplication>> GetAllAsync();
    Task<JobApplication?> GetByIdAsync(Guid id);
    Task<Guid> AddAsync(JobApplication entity);
    Task UpdateAsync(JobApplication entity);
    Task DeleteAsync(Guid id);
}