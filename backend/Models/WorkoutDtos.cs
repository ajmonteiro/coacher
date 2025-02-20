using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class WorkoutPlanDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid UserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public ICollection<WorkoutDto> Workouts { get; set; }
    }

    public class WorkoutPlanCreateDto
    {
        [Required(ErrorMessage = "Name is required")]
        [StringLength(64, ErrorMessage = "Name cannot be longer than 64 characters")]
        public string Name { get; set; }
        
        [Required(ErrorMessage = "User ID is required")]
        public Guid UserId { get; set; }
        
        [Required(ErrorMessage = "Start date is required")]
        public DateTime StartDate { get; set; }
        
        [Required(ErrorMessage = "End date is required")]
        public DateTime EndDate { get; set; }
        
        public ICollection<WorkoutCreateDto> Workouts { get; set; }
    }

    public class WorkoutPlanUpdateDto
    {
        [Required(ErrorMessage = "ID is required")]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(64, ErrorMessage = "Name cannot be longer than 64 characters")]
        public string Name { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "User ID is required")]
        public Guid UserId { get; set; }
        
        [Required(ErrorMessage = "Start date is required")]
        public DateTime StartDate { get; set; }
        
        [Required(ErrorMessage = "End date is required")]
        public DateTime EndDate { get; set; }
        
        public ICollection<WorkoutUpdateDto> Workouts { get; set; } = new List<WorkoutUpdateDto>();
    }
    
    public class ExerciseInWorkoutDto
    {
        public Guid ExerciseId { get; set; }
        public string Name { get; set; } = string.Empty;
        public virtual List<SetDto> Sets { get; set; } = new List<SetDto>();
    }

    public class ExerciseInWorkoutCreateDto
    {
        public Guid ExerciseId { get; set; }
        public virtual List<SetCreateDto> Sets { get; set; } = new List<SetCreateDto>();
    }

    public class ExerciseInWorkoutUpdateDto
    {
        public Guid Id { get; set; }
        public Guid ExerciseId { get; set; }
        public virtual List<SetUpdateDto> Sets { get; set; } = new List<SetUpdateDto>();
    }

    public class WorkoutDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string WeekDay { get; set; } = string.Empty;
        public Guid UserId { get; set; }
        public virtual ICollection<ExerciseInWorkoutDto> Exercises { get; set; } = new List<ExerciseInWorkoutDto>();
    }

    public class WorkoutCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Guid UserId { get; set; }
        public string WeekDay { get; set; } = string.Empty;
        public virtual ICollection<ExerciseInWorkoutCreateDto> Exercises { get; set; } = new List<ExerciseInWorkoutCreateDto>();
    }

    public class WorkoutUpdateDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string WeekDay { get; set; } = string.Empty;
        public virtual ICollection<ExerciseInWorkoutUpdateDto> Exercises { get; set; } = new List<ExerciseInWorkoutUpdateDto>();
    }

    public class SetDto
    {
        public Guid Id { get; set; }
        public int Reps { get; set; }
    }

    public class SetCreateDto
    {
        public int Reps { get; set; }
    }

    public class SetUpdateDto
    {
        public Guid Id { get; set; }
        public int Reps { get; set; }
    }
}