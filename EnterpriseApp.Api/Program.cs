using EnterpriseApp.Infrastructure;
using EnterpriseApp.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. Add Services (The "Backpack")
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// --- DATABASE CONNECTION ---
// This reads the "DefaultConnection" string from Azure Settings
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// --- ALLOW FRONTEND ACCESS (CORS) ---
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()   // Allow localhost, Azure, anyone
              .AllowAnyMethod()   // Allow GET, POST, PUT, DELETE
              .AllowAnyHeader();  // Allow any security headers
    });
});

var app = builder.Build();

// --- START: Auto-Create Database Tables ---
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.Migrate();
}
// --- END: Auto-Create Database Tables ---

// 2. Configure the Pipeline (The "Door Security")

// --- IMPORTANT: CORS MUST BE HERE ---
// This applies the "AllowAll" policy we defined above
app.UseCors("AllowAll");

// Enable Swagger in ALL environments (including Azure)
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

// This opens the API endpoints
app.MapControllers();

app.Run();