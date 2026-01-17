using EnterpriseApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EnterpriseApp.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<JobApplication> JobApplications { get; set; }
    public DbSet<Note> Notes { get; set; }



    protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    // This fixes the 'SalaryRange' warning
    modelBuilder.Entity<JobApplication>()
        .Property(j => j.SalaryRange)
        .HasPrecision(18, 2); 
}
}