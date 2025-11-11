from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
# Create your models here.

class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            return ValueError("Korisnik mora imati e-mail adresu!")
        if not extra_fields.get("sex"):
            return ValueError("Korisnik mora ispuniti polje spol")
        if not extra_fields.get("age"):
            return ValueError("Korisnik mora ispuniti polje godine")
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("sex", "M")
        extra_fields.setdefault("age", 21)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser mora biti staff")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser mora biti superuser")
        
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    email = models.EmailField(unique=True, max_length=200)
    username = models.CharField(max_length=200, null=True, blank=True)

    sex = models.CharField(max_length=10, blank=True, null=True)
    age = models.PositiveIntegerField(blank=True, null=True)

    datum_registracije = models.DateTimeField(auto_now_add=True)


    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    
    pass


class Student(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        primary_key=True,
        on_delete=models.CASCADE,
        related_name='student'
    )
    studying_at = models.CharField(max_length=100)
    year_of_study = models.IntegerField()
    about_me = models.TextField(blank=True, max_length=800)


class Caretaker(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        primary_key=True,
        on_delete=models.CASCADE,
        related_name='caretaker'
    )
    first_name = models.CharField(max_length=50, db_index=True, blank=True, null=True)
    last_name = models.CharField(max_length=50, db_index=True, blank=True, null=True)
    about_me = models.TextField(blank=True, max_length=800)
    specialisation = models.CharField(max_length=50)
    tel_num = models.CharField(max_length=10, blank=True, null=True)
    help_categories = models.ManyToManyField(
        'HelpCategory', related_name='caretakers', blank=True
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name}, {self.specialisation}"


class HelpCategory(models.Model):
    label = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True, max_length=200, null=True)

    def __str__(self):
        return f"{self.label}"




