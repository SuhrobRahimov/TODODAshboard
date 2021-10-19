from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models


# Create your models here.


class Project(models.Model):
    name = models.CharField(max_length=64)
    url = models.URLField()
    users = models.ManyToManyField(get_user_model())

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
    user_created = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    is_closed = models.BooleanField(default=False)

    class Meta:
        db_table = 'app_note'
        verbose_name = "note"
        verbose_name_plural = "notes"
        ordering = ['id']

