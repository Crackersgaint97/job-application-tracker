using System.ComponentModel.DataAnnotations;
using EnterpriseApp.Domain.Enums;

namespace EnterpriseApp.Application.DTOs;

public class CreateJobApplicationDto
{
    // DataAnnotations handle validation automatically!
    [Required]
    [MaxLength(100)]
    public string CompanyName { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string JobTitle { get; set; } = string.Empty;

    public string? JobUrl { get; set; }
    public string? Location { get; set; }
    
    [Range(0, 1000000)]
    public decimal? SalaryRange { get; set; }
    
    public ApplicationStatus Status { get; set; } = ApplicationStatus.Applied;
}