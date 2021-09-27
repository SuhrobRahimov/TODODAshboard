from django.db import models


# Create your models here.


class Project(models.Model):
    name = models.CharField(max_length=64)
    url = models.URLField()
    users = models.ManyToManyField('user.User')

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'app_project'
        verbose_name = "project"
        verbose_name_plural = "projects"
        ordering = ['id']


class Note(models.Model):
    # Имя "ТУДУ"  у модели не совсем отображает суть, назвал тем чем она является "Заметкой"
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user_created = models.ForeignKey('user.User', on_delete=models.CASCADE)
    is_closed = models.BooleanField(default=False)

    class Meta:
        db_table = 'app_note'
        verbose_name = "note"
        verbose_name_plural = "notes"
        ordering = ['id']

