using System;

namespace EnterpriseApp.Domain.Entities;

public class Note
{
    public Guid Id { get; set; } = Guid.NewGuid(); // Unique ID
    public string Text { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Foreign Key
    public Guid JobApplicationId { get; set; } 
    
    // Navigation Property (needed for EF Core relationships)
    public JobApplication? JobApplication { get; set; }
}