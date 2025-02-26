using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Coacher.Backend.WebAPI.Filters;

public class DtoFilter : IDocumentFilter
{
    public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
    {
        var dtos = context.SchemaRepository.Schemas
            .Where(s => s.Key.EndsWith("Dto"))
            .ToDictionary(k => k.Key, v => v.Value);

        context.SchemaRepository.Schemas.Clear();
        
        foreach (var dto in dtos)
        {
            context.SchemaRepository.Schemas.Add(dto.Key, dto.Value);
        }
    }
}
