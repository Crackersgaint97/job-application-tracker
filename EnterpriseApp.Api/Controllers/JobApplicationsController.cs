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

    public JobApplicationsController(IJobApplicationRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var applications = await _repository.GetAllAsync();
        return Ok(applications);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var application = await _repository.GetByIdAsync(id);
        if (application == null) return NotFound();
        return Ok(application);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateJobApplicationDto dto)
    {
        var entity = new JobApplication
        {
            CompanyName = dto.CompanyName,
            JobTitle = dto.JobTitle,
            JobUrl = dto.JobUrl,
            Location = dto.Location,
            SalaryRange = dto.SalaryRange,
            Status = dto.Status
        };

        var id = await _repository.AddAsync(entity);
        return CreatedAtAction(nameof(GetById), new { id = id }, entity);
    }

    // --- NEW: The Update Endpoint ---
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, CreateJobApplicationDto dto)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing == null) return NotFound();

        // Update fields
        existing.CompanyName = dto.CompanyName;
        existing.JobTitle = dto.JobTitle;
        existing.JobUrl = dto.JobUrl;
        existing.Location = dto.Location;
        existing.SalaryRange = dto.SalaryRange;
        existing.Status = dto.Status;

        await _repository.UpdateAsync(existing);
        return NoContent(); // 204 Success (No Content to return)
    }
    // --------------------------------

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _repository.DeleteAsync(id);
        return NoContent();
    }
}