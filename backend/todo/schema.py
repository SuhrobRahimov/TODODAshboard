from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType
from django.shortcuts import get_object_or_404
import graphene
from .models import Project, Note


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class NoteType(DjangoObjectType):
    class Meta:
        model = Note
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_notes = graphene.List(NoteType)
    all_users = graphene.List(UserType)

    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    project_by_name = graphene.Field(ProjectType, name=graphene.String(required=True))
    projects_by_user_id = graphene.List(ProjectType, user_id=graphene.Int(required=True))

    note_by_id = graphene.Field(NoteType, id=graphene.Int(required=True))
    notes_is_closed = graphene.List(NoteType)


    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_notes(root, info):
        return Note.objects.all()

    def resolve_all_users(root, info):
        return get_user_model().objects.all()

    def resolve_project_by_id(root, info, id):
        try:
            return Project.objects.get(pk=id)
        except Project.DoesNotExist:
            return

    def resolve_project_by_name(root, info, name):
        try:
            return Project.objects.get(name=name)
        except Project.DoesNotExist:
            return

    def resolve_projects_by_user_id(root, info, user_id):
        try:
            return Project.objects.filter(users=user_id)
        except Project.DoesNotExist:
            return

    def resolve_note_by_id(root, info, id):
        try:
            return Note.objects.get(pk=id)
        except Note.DoesNotExist:
            return

    def resolve_notes_is_closed(root, info):
        try:
            return Note.objects.filter(is_closed=True)
        except Note.DoesNotExist:
            return


schema = graphene.Schema(query=Query)
