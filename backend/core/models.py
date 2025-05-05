from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    content = models.CharField(max_length=280)
    image = models.ImageField(upload_to='post_images/', null=True, blank=True)  # <- Adicionado
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.content
    
class Follow(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following')
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')

    class Meta:
        unique_together = ('user', 'follower')

    def __str__(self):
        return f"{self.follower.username} follows {self.user.username}"
