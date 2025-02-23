using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;
using Microsoft.OpenApi.Models;
using backend.Services.AuthService;
using backend.Services.UserService;
using backend.Services.WorkoutPlanService;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    ));
    
builder.Services.AddControllers().AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddHttpClient();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});



builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});

builder.Services.AddLogging(logging =>
{
    logging.ClearProviders();
    logging.AddConsole();
});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Coacher API", Version = "v1" });
    c.SchemaFilter(<EmptySchemaFilter>);
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Coacher API", Version = "v1" });
    c.MapType<DietDto>(() => new OpenApiSchema { Type = "object", Title = "DietDto" });
    c.MapType<MealDto>(() => new OpenApiSchema { Type = "object", Title = "MealDto" });
    c.MapType<FoodDto>(() => new OpenApiSchema { Type = "object", Title = "FoodDto" });
    c.MapType<ExerciseDto>(() => new OpenApiSchema { Type = "object", Title = "ExerciseDto" });
    c.MapType<WorkoutPlanDto>(() => new OpenApiSchema { Type = "object", Title = "WorkoutPlanDto" });
    c.MapType<WorkoutDto>(() => new OpenApiSchema { Type = "object", Title = "WorkoutDto" });
    c.MapType<UserDto>(() => new OpenApiSchema { Type = "object", Title = "UserDto" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer 12345abcdef\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });

});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidIssuer = builder.Configuration["AppSettings:Issuer"],
            ValidAudience = builder.Configuration["AppSettings:Audience"],
               IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:Token"]!)),
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("ReadDashboard", policy =>
        policy.RequireAuthenticatedUser()
            .RequireAssertion(context => 
            {
                return context.User.IsInRole("User") || context.User.IsInRole("Coach") || 
                       context.User.HasClaim(c => c.Type == "Permission" && c.Value == "ReadDashboard");
            }));

    foreach (var permission in Enum.GetValues<Permission>())
    {
        if (permission != Permission.ReadDashboard)
        {
            options.AddPolicy(permission.ToString(), policy =>
                policy.RequireAuthenticatedUser()
                    .RequireAssertion(context =>
                    {
                        return context.User.IsInRole("Coach") || 
                               context.User.HasClaim(c => c.Type == "Permission" && c.Value == permission.ToString());
                    }));
        }
    }
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.WriteIndented = true;
    });

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IWorkoutPlanService, WorkoutPlanService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("FrontendPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
