using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using server_saas.Models;

namespace server_saas.Data
{
    public class ApplicationDBContext : IdentityDbContext<User>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ImageLike>()
                .HasKey(p => new { p.UserId, p.GeneratedImageId });

            builder.Entity<GeneratedImage>()
                .HasOne(g => g.User) 
                .WithMany() 
                .HasForeignKey(g => g.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Id = "a18be9c0-aa65-4af8-bd17-00bd9344e576",
                    Name = "User",
                    NormalizedName = "USER"
                }
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }

        public DbSet<Article> Articles { get; set; }
        public DbSet<ImageLike> ImageLikes { get; set; }
        public DbSet<GeneratedImage> GeneratedImages { get; set; }
    }
}
