using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Data;
using Coacher.Backend.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Backend.Application.Services.ExerciseService;

public class ExerciseService : IExerciseService
{
    private readonly AppDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ExerciseService(AppDbContext context, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<PagedResult<Exercise>> GetAllAsync(int page = 1, int pageSize = 10)
    {
        var query = _context.Exercises.AsNoTracking();
        
        var totalItems = await query.CountAsync();
        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedResult<Exercise>
        {
            Page = page,
            PageSize = pageSize,
            TotalItems = totalItems,
            Data = items,
        };
    }
    
    public async Task<IEnumerable<SelectItemDto>> GetOptionsAsync()
    {
        var query = _context.Exercises
            .AsNoTracking()
            .Select(u => new SelectItemDto
            {
                label = u.Name,
                value = u.Id
            });

        return await query.ToListAsync();
    }
    
    public async Task<Exercise?> GetByIdAsync(Guid id)
    {
        return await _context.Exercises
                .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<Exercise> CreateAsync(ExerciseDto exercise)
    {
        var newExercise = new Exercise
        {
            Id = Guid.NewGuid(),
            Name = exercise.Name,
            Description = exercise.Description,
            Video = exercise.Video,
        };
        
        _context.Add(newExercise);
        await _context.SaveChangesAsync();
        return newExercise;
    }

    public async Task<Exercise> UpdateAsync(ExerciseDto exercise)
    {
        var existingExercise = await _context.Exercises.FindAsync(exercise.Id);

        if (existingExercise == null)
            throw new KeyNotFoundException();
        
        existingExercise.Name = exercise.Name;
        existingExercise.Description = exercise.Description;
        existingExercise.Video = exercise.Video;
        
        await _context.SaveChangesAsync();
        return existingExercise;
    }

    public async Task DeleteAsync(Guid id)
    {
        var exercise = await _context.Exercises.FindAsync(id);

        if (exercise != null)
        {
            _context.Exercises.Remove(exercise);
            await _context.SaveChangesAsync();
        }
    }
}