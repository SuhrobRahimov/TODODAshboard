"""
Отдельный слой для бизнес логики
"""
from django.db import models
from rest_framework.generics import get_object_or_404


def change_note_closed_status(queryset: dict, pk: int) -> models.Model:
    """Меняем статус заметки на Закрыто"""
    obj = get_object_or_404(queryset, pk=pk)
    obj.is_closed = True
    obj.save()
    return obj
