from django.shortcuts import render
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from django.utils import timezone
import uuid
from datetime import timedelta
from typing import Any
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenViewBase


from .models import UserProfile, PublicVacationDestination, PrivateVacationDestination
from .serializer import PublicVacationDestinationSerializer, PrivateVacationDestinationSerializer, UserProfileSerializer, \
    UserProfileDetailSerializer, MyTokenObtainPairSerializer
# Create your views here.


class PrivateVacationDestinationListCreateView(generics.ListCreateAPIView):
    serializer_class = PrivateVacationDestinationSerializer

    def get_queryset(self):
        queryset = PrivateVacationDestination.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        serializer = PrivateVacationDestinationSerializer(data=data, depth=0)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class PrivateVacationDestinationInfo(APIView):

    serializer_class = PrivateVacationDestinationSerializer

    def get(self, request, id):
        try:
            obj = PrivateVacationDestination.objects.get(id=id)
        except PrivateVacationDestination.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = PrivateVacationDestinationSerializer(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        try:
            obj = PrivateVacationDestination.objects.get(id=id)
        except PrivateVacationDestination.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = PrivateVacationDestinationSerializer(obj, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        try:
            obj = PrivateVacationDestination.objects.get(id=id)

        except PrivateVacationDestination.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = PrivateVacationDestinationSerializer(obj, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            obj = PrivateVacationDestination.objects.get(id=id)

        except PrivateVacationDestination.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        obj.delete()
        return Response({"msg": "DELETED"}, status=status.HTTP_204_NO_CONTENT)


class PublicVacationDestinationListCreateView(generics.ListCreateAPIView):
    serializer_class = PublicVacationDestinationSerializer

    def get_queryset(self):
        queryset = PublicVacationDestination.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        serializer = PublicVacationDestinationSerializer(data=data, depth=0)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class PublicVacationDestinationInfo(APIView):

    serializer_class = PublicVacationDestinationSerializer

    def get(self, request, id):
        try:
            obj = PublicVacationDestination.objects.get(id=id)
        except PublicVacationDestination.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = PublicVacationDestinationSerializer(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        try:
            obj = PublicVacationDestination.objects.get(id=id)
        except PublicVacationDestination.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = PublicVacationDestinationSerializer(obj, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        try:
            obj = PublicVacationDestination.objects.get(id=id)

        except PublicVacationDestination.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = PublicVacationDestinationSerializer(obj, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            obj = PublicVacationDestination.objects.get(id=id)

        except PublicVacationDestination.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        obj.delete()
        return Response({"msg": "DELETED"}, status=status.HTTP_204_NO_CONTENT)


class UserRegistrationView(generics.CreateAPIView):
    """
    View to register a new user.
    """

    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        activation_expiry_date = str(timezone.now() + timedelta(minutes=10))
        activation_code = str(uuid.uuid4())
        data = request.data.copy()
        data["activation_code"] = activation_code
        data["activation_expiry_date"] = activation_expiry_date
        data["active"] = False

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {"activation_code": activation_code},
            status=status.HTTP_201_CREATED,
            headers=headers,
        )


class UserActivationView(generics.UpdateAPIView):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()

    def update(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        activation_code = request.data.get("activation_code")
        try:
            user_profile: UserProfile = UserProfile.objects.get(
                activation_code=activation_code
            )
        except UserProfile.DoesNotExist:
            return Response(
                {"error": "Activation code not found"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.objects.get(username = user_profile.user.username)

        if user_profile.activation_expiry_date < timezone.now():
            user_profile.delete()
            user.delete()
            return Response(
                {"error": "Activation code expired"}, status=status.HTTP_400_BAD_REQUEST
            )

        if user_profile.active:
            return Response(
                {"success": "Account already active"}, status=status.HTTP_200_OK
            )

        user.is_active = True
        user_profile.active = True
        user_profile.save()
        user.save()
        return Response(
            {"success": "User profile activated"}, status=status.HTTP_200_OK
        )


class UserDetail(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileDetailSerializer
    lookup_field = "id"


class LoginView(TokenViewBase):
    serializer_class = MyTokenObtainPairSerializer