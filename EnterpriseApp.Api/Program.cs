using EnterpriseApp.Infrastructure.Persistence;
using EnterpriseApp.Infrastructure.Repositories;
using EnterpriseApp.Application.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. Add Services (The "Toolbox")
builder.Services.AddControllers();

// --- SWAGGER GENERATORS (These were missing/inactive) ---
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// --------------------------------------------------------

// Database Connection (SQLite)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(connectionString));

// Register Repositories
builder.Services.AddScoped<IJobApplicationRepository, JobApplicationRepository>();

var app = builder.Build();

// 2. Configure the HTTP Request Pipeline (The "Traffic Control")

// --- ENABLE SWAGGER UI ---
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// -------------------------

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();