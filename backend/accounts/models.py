from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.core.validators import MaxValueValidator
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

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser mora biti staff")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser mora biti superuser")
        
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    MAX_USER_AGE = 100

    first_name = models.CharField(max_length=150, blank=False, null=False)
    last_name = models.CharField(max_length=150, blank=False, null=False)
    email = models.EmailField(unique=True, max_length=200)
    username = models.CharField(max_length=200, null=True, blank=True)

    SEX_CHOICES = [
        ("M", "MALE"),
        ("F", "FEMALE"),
        ("O", "OTHER"),
    ]

    sex = models.CharField(max_length=10, choices=SEX_CHOICES, blank=False, null=False)
    age = models.PositiveIntegerField(validators=[MaxValueValidator(MAX_USER_AGE)])

    datum_registracije = models.DateTimeField(auto_now_add=True)

    ROLE_CHOICES = (
        ("caretaker", "Caretaker"),
        ("student", "Student"),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)


    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    
    pass


class Student(models.Model):
    MAX_YEAR_OF_STUDY = 12

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        primary_key=True,
        on_delete=models.CASCADE,
        related_name='student'
    )
    studying_at = models.CharField(max_length=150, blank=True, null=True)
    year_of_study = models.PositiveIntegerField(validators=[MaxValueValidator(MAX_YEAR_OF_STUDY)], blank=True, null=True)
    is_anonymous = models.BooleanField(default=True, help_text="If True, only the student's sex and age will be shown to the caretaker.")

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"


class Caretaker(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        primary_key=True,
        on_delete=models.CASCADE,
        related_name='caretaker'
    )

    about_me = models.TextField(blank=True, max_length=800)
    specialisation = models.CharField(max_length=50)
    working_since = models.PositiveIntegerField(blank=True, null=True, help_text="The year in which the person began working as a psychologist.")
    tel_num = models.CharField(max_length=15, blank=True, null=True)
    office_address = models.TextField(max_length=150, blank=True, null=True)
    academic_title = models.CharField(max_length=10, blank=True, null=True, help_text="Professional (academic) title.")
    user_image_url = models.CharField(blank=True, null=True)

    help_categories = models.ManyToManyField(
        'HelpCategory', related_name='caretakers', blank=True
    )

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}, {self.academic_title}"


class HelpCategory(models.Model):
    label = models.CharField(max_length=50, unique=True)
    description = models.TextField(max_length=200, blank=True, null=True)

    def __str__(self):
        return f"{self.label}"
