using EnterpriseApp.Infrastructure.Persistence;
using EnterpriseApp.Infrastructure.Repositories;
using EnterpriseApp.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// 1. Add Services (The "Toolbox")
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // This allows the backend to understand "Applied" instead of "0"
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// --- SWAGGER GENERATORS (These were missing/inactive) ---
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// --------------------------------------------------------

// Database Connection (SQLite)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

if (builder.Environment.IsDevelopment())
{
    // Local Laptop: Use SQLite
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlite(connectionString));
}
else
{
    // Cloud (Production): Use SQL Server
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(connectionString));
}
// Register Repositories
builder.Services.AddScoped<IJobApplicationRepository, JobApplicationRepository>();

// Allow React App (CORS)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

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
app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

app.Run();