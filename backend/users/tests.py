from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from accounts.models import Caretaker, Student


class UsersProfileTests(TestCase):
	def setUp(self):
		self.User = get_user_model()
		self.client = APIClient()

	def _create_user(self, email='user@example.com', password='pass1234', sex='M', age=21, username='u'):
		return self.User.objects.create_user(email=email, password=password, sex=sex, age=age, username=username)

	def test_me_get_user(self):
		user = self._create_user()
		self.client.force_authenticate(user=user)
		resp = self.client.get('/users/me/')
		self.assertEqual(resp.status_code, 200)
		self.assertIn('email', resp.data)
		self.assertEqual(resp.data['email'], user.email)

	def test_change_password(self):
		user = self._create_user(password='oldpass')
		self.client.force_authenticate(user=user)

		# wrong old password
		resp = self.client.post('/users/me/change-password/', {'old_password': 'bad', 'new_password': 'newpass', 'new_password2': 'newpass'})
		self.assertEqual(resp.status_code, 400)

		# correct old password
		resp = self.client.post('/users/me/change-password/', {'old_password': 'oldpass', 'new_password': 'newpass', 'new_password2': 'newpass'})
		self.assertEqual(resp.status_code, 200)

		user.refresh_from_db()
		self.assertTrue(user.check_password('newpass'))

	def test_caretaker_profile_get_and_update(self):
		user = self._create_user(email='care@example.com')
		caretaker = Caretaker.objects.create(user=user, first_name='Ana', last_name='Ivić', about_me='Hi', specialisation='CBT', tel_num='0123456789')
		self.client.force_authenticate(user=user)

		resp = self.client.get('/users/me/caretaker/')
		self.assertEqual(resp.status_code, 200)
		self.assertEqual(resp.data['first_name'], 'Ana')

		resp = self.client.patch('/users/me/caretaker/', {'about_me': 'Updated bio'}, format='json')
		self.assertEqual(resp.status_code, 200)
		caretaker.refresh_from_db()
		self.assertEqual(caretaker.about_me, 'Updated bio')

	def test_student_profile_get_and_update(self):
		user = self._create_user(email='stud@example.com')
		student = Student.objects.create(user=user, studying_at='Faculty X', year_of_study=2)
		self.client.force_authenticate(user=user)

		resp = self.client.get('/users/me/student/')
		self.assertEqual(resp.status_code, 200)
		self.assertEqual(resp.data['studying_at'], 'Faculty X')

		resp = self.client.patch('/users/me/student/', {'about_me': 'should be ignored'}, format='json')
		# PATCH with invalid field should be ignored/400 depending on serializer; ensure no server error
		self.assertIn(resp.status_code, (200, 400))

		resp = self.client.patch('/users/me/student/', {'studying_at': 'New Faculty', 'year_of_study': 3}, format='json')
		self.assertEqual(resp.status_code, 200)
		student.refresh_from_db()
		self.assertEqual(student.studying_at, 'New Faculty')
		self.assertEqual(student.year_of_study, 3)

	def test_student_bio(self):
		user = self._create_user(email='stud_bio@example.com')
		student = Student.objects.create(user=user, studying_at='Faculty Y', year_of_study=1, about_me='')
		self.client.force_authenticate(user=user)

		# GET student profile and check about_me field exists
		resp = self.client.get('/users/me/student/')
		self.assertEqual(resp.status_code, 200)
		self.assertIn('about_me', resp.data)
		self.assertEqual(resp.data['about_me'], '')

		# PATCH to update about_me
		new_bio = 'Hello, I am a student interested in psychology!'
		resp = self.client.patch('/users/me/student/', {'about_me': new_bio}, format='json')
		self.assertEqual(resp.status_code, 200)
		self.assertEqual(resp.data['about_me'], new_bio)

		student.refresh_from_db()
		self.assertEqual(student.about_me, new_bio)

