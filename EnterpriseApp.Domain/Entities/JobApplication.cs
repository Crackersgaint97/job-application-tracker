using System;
using System.Collections.Generic;
using EnterpriseApp.Domain.Enums;

namespace EnterpriseApp.Domain.Entities;

public class JobApplication
{
    public Guid Id { get; set; } = Guid.NewGuid();
    
    public string CompanyName { get; set; } = string.Empty;
    public string JobTitle { get; set; } = string.Empty;
    public string? JobUrl { get; set; } // The '?' means it can be empty (nullable)
    public string? Location { get; set; } // e.g., "Remote" or "Berlin"
    
    public decimal? SalaryRange { get; set; }
    
    public ApplicationStatus Status { get; set; } = ApplicationStatus.Applied;
    
    public DateTime AppliedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    // Relationship: One Application has Many Notes
    public ICollection<Note> Notes { get; set; } = new List<Note>();
}