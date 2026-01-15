using Microsoft.AspNetCore.Mvc;
using EnterpriseApp.Application.Interfaces;
using EnterpriseApp.Application.DTOs;
using EnterpriseApp.Domain.Entities;

namespace EnterpriseApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobApplicationsController : ControllerBase
{
    private readonly IJobApplicationRepository _repository;

    // Inject the Repository
    public JobApplicationsController(IJobApplicationRepository repository)
    {
        _repository = repository;
    }

    // GET: api/JobApplications
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var applications = await _repository.GetAllAsync();
        return Ok(applications);
    }

    // GET: api/JobApplications/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var application = await _repository.GetByIdAsync(id);
        if (application == null) return NotFound();
        return Ok(application);
    }

    // POST: api/JobApplications
    [HttpPost]
    public async Task<IActionResult> Create(CreateJobApplicationDto dto)
    {
        // 1. Map DTO to Entity (Manual mapping for now)
        var entity = new JobApplication
        {
            CompanyName = dto.CompanyName,
            JobTitle = dto.JobTitle,
            JobUrl = dto.JobUrl,
            Location = dto.Location,
            SalaryRange = dto.SalaryRange,
            Status = dto.Status
        };

        // 2. Save to DB
        var id = await _repository.AddAsync(entity);

        // 3. Return 201 Created
        return CreatedAtAction(nameof(GetById), new { id = id }, entity);
    }

    // DELETE: api/JobApplications/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _repository.DeleteAsync(id);
        return NoContent();
    }
}