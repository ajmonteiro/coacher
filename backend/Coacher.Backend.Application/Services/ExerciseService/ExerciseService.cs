using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Data;
using Coacher.Backend.Domain.Entities;
using Coacher.Backend.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Backend.Application.Services.ExerciseService;

public class ExerciseService : IExerciseService
{
    private readonly CoacherContext _context;

    public ExerciseService(CoacherContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<ExerciseDto>> GetAllAsync(int page = 1, int perPage = 10)
    {
        var query = _context.Exercises.AsNoTracking();
        
        var totalItems = await query.CountAsync();
        var items = await query
            .Skip((page - 1) * perPage)
            .Take(perPage)
            .ToListAsync();

        var exercises = items.Select(u => new ExerciseDto
        {
            Id = u.Id,
            Name = u.Name,
            Description = u.Description,
            Video = u.Video,
            ExerciseType = (int)u.ExerciseType
        });

        return new PagedResult<ExerciseDto>
        {
            Page = page,
            PerPage = perPage,
            TotalItems = totalItems,
            Data = exercises,
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
    
    public async Task<ExerciseDto?> GetByIdAsync(Guid id)
    {
        var exercise = await _context.Exercises
                .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id);

        if (exercise == null)
        {
            throw new KeyNotFoundException();
        }

        return new ExerciseDto 
        {
            Id = exercise.Id,
            Name = exercise.Name,
            Description = exercise.Description,
            Video = exercise.Video,
            ExerciseType = (int)exercise.ExerciseType
        };
    }

    public async Task<ExerciseDto> CreateAsync(ExerciseDto exercise)
    {
        var newExercise = new Exercise
        {
            Id = Guid.NewGuid(),
            Name = exercise.Name,
            Description = exercise.Description,
            Video = exercise.Video,
            ExerciseType = (ExerciseType)exercise.ExerciseType!
        };
        
        _context.Add(newExercise);
        await _context.SaveChangesAsync();
        return new ExerciseDto
        {
            Id = newExercise.Id,
            Name = newExercise.Name,
            Description = newExercise.Description,
            Video = newExercise.Video,
            ExerciseType = (int)newExercise.ExerciseType
        };
    }

    public async Task<ExerciseDto> UpdateAsync(ExerciseDto exercise)
    {
        var existingExercise = await _context.Exercises.FindAsync(exercise.Id);

        if (existingExercise == null)
            throw new KeyNotFoundException();
        
        existingExercise.Name = exercise.Name;
        existingExercise.Description = exercise.Description;
        existingExercise.Video = exercise.Video;
        existingExercise.ExerciseType = (ExerciseType)exercise.ExerciseType!;
        
        await _context.SaveChangesAsync();
        return new ExerciseDto
        {
            Id = existingExercise.Id,
            Name = existingExercise.Name,
            Description = existingExercise.Description,
            Video = existingExercise.Video,
            ExerciseType = (int)existingExercise.ExerciseType
        };
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